import { Button, Container, TextField } from "@mui/material"
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Inputs } from "../../../types/operator"
import { apiClient } from "../../../utils/apis/operator/clientes"
import { useNavigate } from "react-router-dom"



interface typeFormClientes {
    isEdit: boolean
}


export const FormClientes: React.FC<typeFormClientes> = ({ isEdit = false }) => {
    const Navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const obj = {
            acction: isEdit ? 'C' : 'U',
            data: data
        }
        const responseValidation = await apiClient(obj)
        if (!responseValidation.success) {
            return
        }
        return Navigate("/operator/home")
        reset()
    }



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{ display: 'flex', alignItems: "center", flexDirection: 'column', gap: '40px', marginTop: '90px' }}>
                    <h1>{isEdit ? 'Nuevo Cliente' : 'Edicion de Cliente'}</h1>


                    <TextField id="razon_social"
                        label="Razon social"
                        variant="outlined"
                        sx={{ width: '400px' }}
                        {...register("razon_social", { required: true })} />

                    <TextField id="nombre_comercial"
                        label="Nombre comercial"
                        variant="outlined"
                        sx={{ width: '400px' }}
                        {...register("nombre_comercial", { required: true })} />

                    <TextField id="dirrecion_entrega"
                        label="Dirrecion entrega" variant="outlined"
                        sx={{ width: '400px' }}
                        {...register("dirrecion_entrega", { required: true })} />

                    <TextField id="telefono"
                        label="Telefono" variant="outlined"
                        sx={{ width: '400px' }}
                        {...register("telefono", { required: true })} />

                    <TextField id="email" label="Email"
                        variant="outlined"
                        sx={{ width: '400px' }}
                        {...register("email", { required: true })}
                    />

                    <Button type="submit" variant="contained" sx={{ width: '400px' }}>Crear Cliente</Button>

                </Container>
            </form >

        </>
    )



}