import { Alert, Button, Container, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { callUser } from '../../utils/apis/user/authUser'
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ResponseUser } from "../../types/user"
import { loginContext } from "../../context/loginContext"




export const Login = () => {
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate()
    const { handleSubmit, register, reset } = useForm()

    const context = useContext(loginContext)
    useEffect(() => {

        if (context) {
            context.loginUser()
            if (context.user && context.user.rol) {
                if (context.user.rol === 2) {
                    navigate('/cliente/home')
                }
                if (context.user.rol === 1) {
                    navigate('/operator/home')
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!context) return <h1>Error: Contexto no disponible</h1>

    const onSubmit = async (data: unknown) => {
        const responseUser: ResponseUser = await callUser(data)
        if (!responseUser.success) return setAlert(true)
        setAlert(false)
        if (responseUser.dataQuery.rol === 1) {
            reset()
            return navigate("/operator/home")

        }
        reset()
        return navigate("/cliente/home")
    }

    return (
        <>
            {alert ? <Alert variant="filled" severity="error">
                Contraseña o correo Electrónico incorrectos
            </Alert> : null}


            <form onSubmit={handleSubmit(onSubmit)}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                        alignItems: 'center',
                        height: '100vh',
                        justifyContent: 'center'
                    }}
                >
                    <h1 style={{ fontSize: '60px' }}>Iniciar Sesión</h1>

                    <TextField
                        id="CorreoElectronico"
                        label="Correo Electrónico"
                        variant="outlined"
                        sx={{ width: '400px' }}
                        {...register("correo_electronico", { required: true })}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        sx={{ width: '400px' }}
                        {...register("password", { required: true })}
                    />

                    <Button type="submit" sx={{ width: '400px', height: '50px' }} variant="outlined">Enviar</Button>

                </Container>
            </form >

        </>
    )


}