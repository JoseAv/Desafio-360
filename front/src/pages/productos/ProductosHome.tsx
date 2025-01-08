import { useContext } from "react";
import { loginContext } from "../../context/loginContext";
import { apiProducts, useProducts } from "../../utils/apis/shared/productos";
import { Button, Container, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../utils/styles/stylesTable";
import { useNavigate } from "react-router-dom";
import { typeProductsApi } from "../../types/operator";


export const PagesProductosHome = () => {

    const context = useContext(loginContext)
    const Navigate = useNavigate()

    const obj = {
        "acction": "V"
    }

    const { products, errorProducts, loadingProducts, setProducts } = useProducts(obj)


    if (!context) return <h1>Error: Contexto no disponible</h1>;
    const { user, loading } = context
    if (loading) return <h1>Cargando...</h1>;
    if (!user) return <h1>No Permitido</h1>
    if (!products) return <h1>Sin Productos</h1>
    if (loadingProducts) return <h1>Cargando Productos</h1>
    if (errorProducts) return <h1>Ah ocurrido un error</h1>
    const changeState = async (id: number, id_estados: number) => {
        if (id === -1) return
        console.log(id)
        const obj = {
            "acction": "UU",
            "data": {
                "id": id,
                "id_estados": id_estados,
            }
        }
        try {
            const newResponse = await apiProducts(obj)
            if (newResponse.success) {
                setProducts(prevData => {
                    if (!prevData) return prevData
                    const indexPrev = prevData?.findIndex((o: typeProductsApi) => o.id === id)
                    if (indexPrev === -1) return prevData
                    const newData = [...prevData]
                    newData[indexPrev] = {
                        ...newData[indexPrev], id_estados: id_estados
                    }
                    return newData
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(products)

    return (

        <Container sx={{ marginTop: "120px", width: "100%" }}>
            <h1>Productos</h1>
            <TableContainer component={Paper}>
                <Table sx={{ width: "1100px" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nombre </StyledTableCell>
                            <StyledTableCell align="center">Marca</StyledTableCell>
                            <StyledTableCell align="center">Precio Q</StyledTableCell>
                            <StyledTableCell align="center">Stock</StyledTableCell>
                            <StyledTableCell align="center">Foto</StyledTableCell>
                            <StyledTableCell align="center">Estado</StyledTableCell>
                            <StyledTableCell align="center">Actualizar</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row" align="center"> <p className="textTable">{row.nombre}</p></StyledTableCell>
                                <StyledTableCell align="center"><p className="textTable">{row.marca}</p></StyledTableCell>
                                <StyledTableCell align="center"><p className="textTable">{row.precio}</p></StyledTableCell>
                                <StyledTableCell align="center"><p className="textTable">{row.stock}</p></StyledTableCell>
                                <StyledTableCell align="center"><img src={`${row.foto}`} width={100} height={100} alt="Imagen de los productos" /></StyledTableCell>
                                <StyledTableCell align="center">{
                                    row.id_estados === 1 ?
                                        <Button color="success" onClick={() => { changeState(row.id ?? -1, 2) }}>Activo</Button>
                                        :
                                        <Button color="error" onClick={() => { changeState(row.id ?? -1, 1) }} >Inactivo</Button>
                                }

                                </StyledTableCell>
                                <StyledTableCell align="center"><Button onClick={() => Navigate(`editar/${row.id}`)} color="secondary" >Actualizar</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>

    )


}