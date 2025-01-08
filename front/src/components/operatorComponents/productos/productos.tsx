import { Alert, Button, Container, FormControl, InputLabel, MenuItem, Select, styled, TextField } from "@mui/material"
import React, { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { CategoryForm, typeProductsApi } from "../../../types/operator"
import { useNavigate } from "react-router-dom"
import { apiProductsText } from "../../../utils/apis/shared/productos"

interface typeFormProductos {
    isEdit: boolean
    productos?: typeProductsApi
    categorias: CategoryForm[]
}

export const FormProductos: React.FC<typeFormProductos> = ({ isEdit = false, productos, categorias }) => {
    const Navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
        watch
    } = useForm<typeProductsApi>()

    const selectedCategorias = watch('id_categorias')

    useEffect(() => {
        if (isEdit && productos) {
            reset(productos);
        }
    }, [isEdit, productos, reset]);

    const onSubmit: SubmitHandler<typeProductsApi> = async (data) => {
        data.precio = Math.round(Number(data.precio))
        data.stock = Number(Number(data.stock))

        if (isNaN(data.precio) || isNaN(data.stock)) {
            return <Alert>Ingrese valores numericos</Alert>
        }

        const obj = {
            data: { acction: isEdit ? 'U' : 'C', data: data },
            foto: data.foto
        }
        console.log(obj)

        const responseValidation = await apiProductsText(obj)
        if (!responseValidation.success) {
            return
        }
        reset()
        return Navigate("/operator/productos")

    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{ display: 'flex', alignItems: "center", flexDirection: 'column', gap: '40px', marginTop: '10px' }}>
                    <h1>{isEdit ? 'Edicion de Producto' : 'Nuevo Producto'}</h1>


                    <TextField id="nombre"
                        label="Nombre del Producto"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("nombre", { required: true })} />

                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCategorias || ""}
                            {...register("id_categorias", { required: true })}
                        >
                            {categorias.map((ele: CategoryForm) => (
                                <MenuItem key={ele.id} value={ele.id}>
                                    {ele.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            {...register("foto")}
                            multiple
                        />
                    </Button>

                    <TextField id="marca"
                        label="Nombre de la Marca"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("marca", { required: true })} />

                    <TextField id="codigo"
                        label="Codigo"
                        variant="filled"
                        sx={{ width: '400px' }}
                        {...register("codigo", { required: true })} />

                    <TextField id="Precio"
                        label="Precio"
                        variant="filled"
                        type="number"
                        sx={{ width: '400px' }}
                        {...register("precio", { required: true })} />

                    <TextField id="Precio"
                        label="Stock Inicial"
                        variant="filled"
                        type="number"
                        sx={{ width: '400px' }}
                        {...register("stock", { required: true })} />


                    <Button type="submit" variant="contained" sx={{ width: '400px' }}>
                        {isEdit ? 'Editar cliente' : 'Crear cliente'}
                    </Button>

                </Container>
            </form >

        </>
    )



}