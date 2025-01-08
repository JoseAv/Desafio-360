import { Button, Container, TextField } from "@mui/material"
import React, { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { CategoryForm } from "../../../types/operator"
import { useNavigate } from "react-router-dom"
import { apiCategory } from "../../../utils/apis/operator/category"

interface typeFormClientes {
    isEdit: boolean
    category?: CategoryForm;
}

export const FormCategorias: React.FC<typeFormClientes> = ({ isEdit = false, category }) => {
    const Navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
    } = useForm<CategoryForm>()


    useEffect(() => {
        if (isEdit && category) {
            reset(category);
        }
    }, [isEdit, category, reset]);

    const onSubmit: SubmitHandler<CategoryForm> = async (data) => {

        const obj = {
            acction: isEdit ? 'U' : 'C',
            data: data
        }

        const responseValidation = await apiCategory(obj)
        if (!responseValidation.success) {
            return
        }
        reset()
        return Navigate("/operator/categorias")

    }



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{ display: 'flex', alignItems: "center", flexDirection: 'column', gap: '40px', marginTop: '90px' }}>
                    <h1>{isEdit ? 'Edicion de Categoria' : 'Nueva Categoria'}</h1>


                    <TextField id="nombre"
                        label="Nombre de la categoria"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("nombre", { required: true })} />

                    <Button type="submit" variant="contained" sx={{ width: '400px' }}>
                        {isEdit ? 'Editar cliente' : 'Crear cliente'}
                    </Button>

                </Container>
            </form >

        </>
    )



}