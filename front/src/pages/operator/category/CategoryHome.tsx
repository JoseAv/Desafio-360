import { useContext, useEffect, useState } from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from "@mui/material";
import { loginContext } from "../../../context/loginContext";
import { StyledTableCell, StyledTableRow } from "../../../utils/styles/stylesTable";
import { useNavigate } from "react-router-dom";
import { apiCategory } from "../../../utils/apis/operator/category";
import { Category } from "../../../types/operator";


export const PagesCategoryHome = () => {
    const Navigate = useNavigate()
    const [category, setCategory] = useState<Category[] | null>(null)

    useEffect(() => {
        async function callCategorys() {
            try {
                const response = await apiCategory({ "acction": "V" })
                if (response && response.success && !category) {
                    setCategory(response.dataQuery)
                    console.log(response.dataQuery)
                }
            } catch (error) {
                console.log(error)
            }
        }
        callCategorys()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const changeState = async (id: number, id_estados: number) => {
        if (id === -1) return
        const obj = {
            "acction": "U",
            "data": {
                "id": id,
                "id_estados": id_estados,
            }
        }
        try {
            const newResponse = await apiCategory(obj)
            console.log(newResponse)
            if (newResponse.success) {
                setCategory(prevData => {
                    if (!prevData) return prevData
                    const indexPrev = prevData?.findIndex((o: Category) => o.id === id)
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


    const context = useContext(loginContext)
    if (!context) return <h1>Error: Contexto no disponible</h1>;
    const { user, loading } = context
    if (loading) return <h1>Cargando...</h1>;
    if (!user) return <h1>No Permitido</h1>;
    if (!category) return <h1>No hay clientes</h1>

    return (

        <Container sx={{ marginTop: "120px", width: "100%" }}>
            <h1>Categorias </h1>
            <TableContainer component={Paper}>
                <Table sx={{ width: "1000px" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nombre Categoria </StyledTableCell>
                            <StyledTableCell align="center">Estados</StyledTableCell>
                            <StyledTableCell align="center">Actualizar</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {category.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    <p className="textTable">{row.nombre}</p>
                                </StyledTableCell>
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