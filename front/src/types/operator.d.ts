// Ordenes

export interface typeProducts {
    id: number,
    id_usuario: number,
    id_estados: number,
    fecha_creacion: string,
    nombre_completo: string,
    direccion: string,
    telefono: string,
    correo_electronico: string,
    fecha_entrega: string,
    total_orden: number
}

// Clientes

type Inputs = {
    id?: number
    razon_social: string,
    nombre_comercial: string,
    dirrecion_entrega: string,
    telefono: string,
    email: string
    id_estados: number
}

type typesObjectCliente = {
    acction: string,
    data: Inputs
}

interface typeClienteUser {
    id: number
    nombre_comercial: string
}

// Categorias 

type typesObjectCliente = {
    acction: string,
    data: Category
}

type Category = {
    id: number,
    id_usuario: number,
    nombre: string,
    id_estados: number,
    fecha_creacion: string
}

type CategoryForm = {
    id?: number
    nombre: string
}


// Usuarios manejo Operador

interface typeUserApi {
    id?: number
    correo_electronico: string
    nombre_completo: string
    telefono: string
    id_estados?: number
    nombre_comercial?: string
    razon_social?: string

}

interface typeUserForm {
    id?: number
    id_rol: number
    id_estados: number
    id_clientes: number
    correo_electronico: string
    nombre_completo: string
    password: string
    telefono: string
    fecha_nacimiento: string
}

interface typeRol {
    id: number
    nombre: string
}

// Productos


interface typeProductsApi {
    id?: number
    id_categorias: number
    id_usuarios?: number
    id_estados?: number
    nombre: string
    marca: number
    codigo: string
    precio: number
    fecha_creacion: string
    stock: number
    foto: string
    cantidad?: number
    total?: number

}

