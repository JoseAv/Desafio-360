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
import { apiClient } from "../../../utils/apis/operator/clientes";
import { Inputs } from "../../../types/operator";
import { useNavigate } from "react-router-dom";
import NavBarOperator from "../../../components/common/navigateOperator";
import AddSharpIcon from '@mui/icons-material/AddSharp';

export const PagesClienteHome = () => {
    const Navigate = useNavigate()
    const [clientes, setCliente] = useState<Inputs[] | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function callNewOrder() {
            try {
                const response = await apiClient({ "acction": "V" })
                if (response && response.success && !clientes) {
                    setCliente(response.dataQuery)
                    console.log(response.dataQuery)
                }
            } catch (error) {
                console.log(error)
            }
        }
        callNewOrder()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const changeState = async (id: number, id_estados: number) => {
        if (id === -1) return
        console.log(id)
        const obj = {
            "acction": "U",
            "data": {
                "id": id,
                "id_estados": id_estados,
            }
        }
        try {
            const newResponse = await apiClient(obj)
            console.log(newResponse)
            if (newResponse.success) {
                setCliente(prevData => {
                    if (!prevData) return prevData
                    const indexPrev = prevData?.findIndex((o: Inputs) => o.id === id)
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
    if (!clientes) return <h1>No hay clientes</h1>

    return (
        <>
            <NavBarOperator />
            <Container sx={{ marginTop: "120px", width: "100%" }}>
                <Container sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <h1>Clientes</h1>
                    <Button variant="contained" size="small" onClick={() => navigate('/operator/clientes/crear')}><AddSharpIcon /></Button>
                </Container>
                <TableContainer component={Paper}>
                    <Table sx={{ width: "1100px" }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Razon social </StyledTableCell>
                                <StyledTableCell align="center">Nombre comercial</StyledTableCell>
                                <StyledTableCell align="center">Direccion de entrega</StyledTableCell>
                                <StyledTableCell align="center">Telefono</StyledTableCell>
                                <StyledTableCell align="center">Correo Electronico</StyledTableCell>
                                <StyledTableCell align="center">Estado</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <p className="textTable">{row.razon_social}</p>
                                    </StyledTableCell>
                                    <StyledTableCell align="center"><p className="textTable">{row.nombre_comercial}</p></StyledTableCell>
                                    <StyledTableCell align="center"><p className="textTable">{row.dirrecion_entrega}</p></StyledTableCell>
                                    <StyledTableCell align="center"><p className="textTable">{row.telefono}</p></StyledTableCell>
                                    <StyledTableCell align="center"><p className="textTable">{row.email}</p></StyledTableCell>
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
        </>


    )




}