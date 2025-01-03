import { Alert, Button, Container, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { callUser } from '../../utils/apis/user/authUser'
import { useState } from "react"

interface ResponseUser {
    dataQuery: user,
    message: string,
    statusCode: number,
    success: boolean
}

type user = {
    correo_electronico: string,
    id: number,
    rol: number
}


export const Login = () => {
    const [alert, setAlert] = useState(false)

    const { handleSubmit, register } = useForm()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        const responseUser: ResponseUser = await callUser(data)
        if (!responseUser.success) return setAlert(true)
        console.log(responseUser)
        setAlert(false)
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
                        height: '100vh'
                    }}
                >
                    <h1 style={{ fontSize: '60px', marginTop: '150px' }}>Iniciar Sesión</h1>

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