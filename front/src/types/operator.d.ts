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

