import { useContext, useEffect, useState } from "react"
import { loginContext } from "../../context/loginContext"
import { callOrders } from "../../utils/apis/operator/orders"
import { typeProducts } from "../../types/operator";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../utils/styles/stylesTable";

export const Operator = () => {

    const [order, setOrder] = useState<typeProducts[] | null>(null)


    useEffect(() => {
        async function callNewOrder() {
            try {
                const newOrder = await callOrders()
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


    const changeState = async (id: number) => {
        console.log(id)
        try {

            const response = await fetch('http://localhost:3000/orden', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({
                    "acction": "U",
                    "data": {
                        "id": id,
                        "id_estados": 2,
                    }
                }),
                credentials: 'include'
            })

            const newResponse = await response.json()
            if (newResponse.success) {
                setOrder(prevData => {
                    if (!prevData) return prevData
                    const indexPrev = prevData?.findIndex((o: typeProducts) => o.id === id)
                    if (indexPrev === -1) return prevData
                    const newData = [...prevData]
                    newData[indexPrev] = {
                        ...newData[indexPrev], id_estados: 2
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

    if (!order) return <h1>Sin Ordenes</h1>

    return (

        <Container sx={{ marginTop: "120px", width: "100%" }}>
            <h1>Ordenes</h1>
            <TableContainer component={Paper}>
                <Table sx={{ width: "1000px" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nombre Completo</StyledTableCell>
                            <StyledTableCell align="center">Direccion</StyledTableCell>
                            <StyledTableCell align="center">Telefono</StyledTableCell>
                            <StyledTableCell align="center">Correo Electronico</StyledTableCell>
                            <StyledTableCell align="center">Estado</StyledTableCell>
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
                                        <Button color="secondary" onClick={() => { changeState(row.id) }}>Pendiente</Button>
                                        : <Button color="success" >Entregado</Button>}
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>

    )




}