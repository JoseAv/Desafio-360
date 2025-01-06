import { Button, Container, TextField } from "@mui/material"
import React, { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Inputs } from "../../../types/operator"
import { apiClient } from "../../../utils/apis/operator/clientes"
import { useNavigate } from "react-router-dom"



interface typeFormClientes {
    isEdit: boolean
    cliente?: Inputs;
}


export const FormClientes: React.FC<typeFormClientes> = ({ isEdit = false, cliente }) => {
    const Navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
    } = useForm<Inputs>()


    useEffect(() => {
        if (isEdit && cliente) {
            reset(cliente);
        }
    }, [isEdit, cliente, reset]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const obj = {
            acction: isEdit ? 'U' : 'C',
            data: data
        }
        const responseValidation = await apiClient(obj)
        if (!responseValidation.success) {
            return
        }
        reset()
        return Navigate("/operator/clientes")

    }



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{ display: 'flex', alignItems: "center", flexDirection: 'column', gap: '40px', marginTop: '90px' }}>
                    <h1>{isEdit ? 'Edicion de Cliente' : 'Nuevo Cliente'}</h1>


                    <TextField id="razon_social"
                        label="Razon social"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("razon_social", { required: true })} />

                    <TextField id="nombre_comercial"
                        label="Nombre comercial"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("nombre_comercial", { required: true })} />

                    <TextField id="dirrecion_entrega"
                        label="Dirrecion entrega" variant="filled"
                        sx={{ width: '400px' }}
                        {...register("dirrecion_entrega", { required: true })} />

                    <TextField id="telefono"
                        label="Telefono" variant="filled"
                        sx={{ width: '400px' }}
                        {...register("telefono", { required: true })} />

                    <TextField id="email" label="Email"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("email", { required: true })}
                    />

                    <Button type="submit" variant="contained" sx={{ width: '400px' }}>
                        {isEdit ? 'Editar cliente' : 'Crear cliente'}
                    </Button>

                </Container>
            </form >

        </>
    )



}