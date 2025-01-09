import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React, { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { typeClienteUser, typeRol, typeUserForm } from "../../../types/operator"
import { useNavigate } from "react-router-dom"
import { callAcctionUser } from "../../../utils/apis/opUser/acctionUser"

interface typeFormClientes {
    isEdit: boolean
    usuarios?: typeUserForm
    client: typeClienteUser[]
    rol: typeRol[]
}

export const FormUsuarios: React.FC<typeFormClientes> = ({ isEdit = false, usuarios, client, rol }) => {
    const Navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
        watch
    } = useForm<typeUserForm>()
    const selectedRol = watch("id_rol")
    const selectedCliente = watch("id_clientes")

    useEffect(() => {
        if (isEdit && usuarios) {
            reset(usuarios);
        }
    }, [isEdit, usuarios, reset]);

    const onSubmit: SubmitHandler<typeUserForm> = async (data) => {
        const obj = {
            acction: isEdit ? 'U' : 'C',
            data: data
        }
        const responseValidation = await callAcctionUser(obj)
        console.log('Respuesta', responseValidation)
        if (!responseValidation.success) {
            return
        }
        reset()
        return Navigate("/operator/usuarios")

    }

    if (!rol) return <h1>No se puede sin rol</h1>

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{ display: 'flex', alignItems: "center", flexDirection: 'column', gap: '40px', marginTop: '90px' }}>
                    <h1>{isEdit ? 'Edicion de Usuario' : 'Nueva Usuario'}</h1>


                    <TextField id="nombre"
                        label="Nombre Completo"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("nombre_completo", { required: true })} />

                    <Container sx={{ display: 'flex', justifyContent: 'Center', alignItems: 'center', gap: '40px' }}>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-simple-select-label-Rol">Rol</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-Rol"
                                id="demo-simple-select-label-Rol"
                                value={selectedRol || ""}
                                {...register("id_rol", { required: true })}
                            >
                                {rol.map((ele: typeRol) => (
                                    <MenuItem key={ele.id} value={ele.id}>
                                        {ele.nombre.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedCliente || ""}
                                {...register("id_clientes", { required: true })}
                            >
                                {client.map((ele: typeClienteUser) => (
                                    <MenuItem key={ele.id} value={ele.id}>
                                        {ele.nombre_comercial}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Container>


                    <TextField id="email"
                        label="Correo Electronico"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("correo_electronico", { required: true })} />

                    <TextField id="password"
                        label="Contraseña"
                        variant="filled"
                        sx={{ width: '400px' }}
                        type="password"
                        {...register("password", { required: !isEdit })} />


                    <TextField id="telefono"
                        label="Telefono"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("telefono", { required: true })} />


                    <Button type="submit" variant="contained" sx={{ width: '400px' }}>
                        {isEdit ? 'Editar cliente' : 'Crear cliente'}
                    </Button>

                </Container>
            </form >

        </>
    )



}