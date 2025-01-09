import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/loginContext";
import { callAcctionUser } from "../../utils/apis/opUser/acctionUser";
import { typeUserApi } from "../../types/operator";
import { Button, Container, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../utils/styles/stylesTable";
import { useNavigate } from "react-router-dom";
import NavBarOperator from "../../components/common/navigateOperator";
import AddSharpIcon from '@mui/icons-material/AddSharp';

export const PagesUserHome = () => {
    const [userData, setUserData] = useState<typeUserApi[] | null>(null)
    const context = useContext(loginContext)
    const Navigate = useNavigate()

    useEffect(() => {
        async function callUsers() {
            try {
                const obj = { "acction": "V" }
                const newUser = await callAcctionUser(obj)
                if (newUser && newUser.success) {
                    console.log(newUser)
                    setUserData(newUser.dataQuery)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        callUsers()
    }, [])


    if (!context) return <h1>Error: Contexto no disponible</h1>;
    const { user, loading } = context
    if (loading) return <h1>Cargando...</h1>
    if (!user) return <h1>No Permitido</h1>


    if (!userData) return <h1>No hay Usuarios</h1>

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
            const newResponse = await callAcctionUser(obj)
            console.log(newResponse)
            if (newResponse.success) {
                setUserData(prevData => {
                    if (!prevData) return prevData
                    const indexPrev = prevData?.findIndex((o: typeUserApi) => o.id === id)
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




    return (
        <>
            <NavBarOperator />
            <Container sx={{ marginTop: "30px", width: "100%" }}>
                <Container sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <h1>Usuarios</h1>
                    <Button variant="contained" size="small" onClick={() => Navigate('/operator/usuarios/crear')}><AddSharpIcon /></Button>
                </Container>
                <TableContainer component={Paper}>
                    <Table sx={{ width: "1100px" }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Nombre Completo </StyledTableCell>
                                <StyledTableCell align="center">Correo electronico</StyledTableCell>
                                <StyledTableCell align="center">Telefono</StyledTableCell>
                                <StyledTableCell align="center">Cliente Asignado</StyledTableCell>
                                <StyledTableCell align="center">Razon Social</StyledTableCell>
                                <StyledTableCell align="center">Estado</StyledTableCell>
                                <StyledTableCell align="center">Actualizar</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <p className="textTable">{row.nombre_completo}</p>
                                    </StyledTableCell>
                                    <StyledTableCell align="center"><p className="textTable">{row.correo_electronico}</p></StyledTableCell>
                                    <StyledTableCell align="center"><p className="textTable">{row.telefono}</p></StyledTableCell>
                                    <StyledTableCell align="center"><p className="textTable">{row.nombre_comercial}</p></StyledTableCell>
                                    <StyledTableCell align="center"><p className="textTable">{row.razon_social}</p></StyledTableCell>
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