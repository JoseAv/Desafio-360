import { useContext, useEffect, useState } from "react";
import { typeProducts, typeProductsApi } from "../../types/operator";
import { callOrders } from "../../utils/apis/operator/orders";
import { loginContext } from "../../context/loginContext";
import { Button, Container, List, ListItem, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../utils/styles/stylesTable";
import BarCliente from "../../components/common/navigateCliente";


export const OrdenDetails = () => {

    const [order, setOrder] = useState<typeProducts[] | null>(null)
    const [selected, setSelected] = useState<number | string>('')
    const [products, setProducts] = useState<typeProductsApi[] | null>(null)

    useEffect(() => {
        async function callNewOrder() {
            try {
                const newOrder = await callOrders({ "acction": "VV", "data": {} })
                if (newOrder && !order) {
                    setOrder(newOrder.dataQuery)
                }
            } catch (error) {
                console.log(error)
            }
        }
        callNewOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function callNewOrder() {
            try {
                const newOrder = await callOrders({ "acction": "VV", "data": {} })
                if (newOrder && !order) {
                    setOrder(newOrder.dataQuery)
                }
            } catch (error) {
                console.log(error)
            }
        }
        callNewOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function viewProducts(id: number) {
        try {
            const newOrder = await callOrders({ "acction": "VP", "data": { id: id } })
            console.log(newOrder)
            if (newOrder) {
                setSelected(id)
                setProducts(newOrder.dataQuery)
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

    if (!order) return <h1>Sin Ordenes</h1>
    console.log(order)
    return (

        <>
            <BarCliente />
            <Container sx={{ marginTop: "120px", width: "100%", display: 'flex' }}>
                <Container >
                    <h1>Ordenes Orden # {selected}</h1>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: "1000px" }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Nombre Completo</StyledTableCell>
                                    <StyledTableCell align="center">Direccion</StyledTableCell>
                                    <StyledTableCell align="center">Telefono</StyledTableCell>
                                    <StyledTableCell align="center">Correo Electronico</StyledTableCell>
                                    <StyledTableCell align="center">Estado</StyledTableCell>
                                    <StyledTableCell align="center">Productos</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row">
                                            <p className="textTable">{row.nombre_completo}</p>
                                        </StyledTableCell>
                                        <StyledTableCell align="center"><p className="textTable">{row.direccion}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p className="textTable">{row.telefono}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p className="textTable">{row.correo_electronico}</p></StyledTableCell>
                                        <StyledTableCell align="center">{
                                            row.id_estados === 1 ?
                                                <Button color="secondary" >Pendiente</Button>
                                                : <Button color="success" >Entregado</Button>}
                                        </StyledTableCell>
                                        <StyledTableCell align="center"> <Button color="primary" onClick={() => viewProducts(row.id)}>Productos</Button></StyledTableCell>


                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                {products ?
                    <Container sx={{ gap: '10px', display: 'flex', flexDirection: 'column' }} >
                        <h1>Productos</h1>
                        {products.map((ele) => (
                            <>
                                <List sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper', display: 'flex', gap: "10px" }} key={ele.id}>
                                    <ListItem>

                                        <Typography
                                            variant="subtitle2"
                                            component="div"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            Nombre: {ele.nombre} ---- Cantidad Comprada: {ele.cantidad}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </>

                        ))}

                    </Container>


                    :
                    null
                }
            </Container>
        </>


    )




}