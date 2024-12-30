export class ValidationResponse {

    static Accepted({ message, dataQuery = null, statusCode = 200 }) {
        return {
            success: true,
            message,
            dataQuery,
            statusCode,
        };
    }

    static Denied({ message, error = null, statusCode = 400 }) {
        return {
            success: false,
            message,
            error,
            statusCode,
        };
    }
}



export class MessagePersonalise {

    static DataEmpty = (campo) => {
        return `Debe de ingresar un ${campo}`
    }

    static dataExisting = (campo) => {
        return `${campo} ya existe`

    }

    static dataNotExisting = (campo) => {
        return `${campo} no existe `

    }

    static dataSuccessful = (campo) => {
        return `Creado ${campo} con exito`

    }

    static dataUpdateSuccessful = (campo) => {
        return `Actualizado ${campo} con exito`

    }

    static failPeticion = (campo) => {
        return `Ah fallado la peticion llamado a ${campo}`
    }

    static passUSer = () => {
        return `Usuario aceptado`
    }

    static errorPassword = () => {
        return `Correo o contraseña incorrecta`
    }

    static errorSession = () => {
        return `No a iniciado sesion`
    }

    static idProductNotValit = (data) => {
        let newData = data.join(', ')
        console.log(newData)
        return `${newData} No existe  id/s de productos`
    }

    static maxLimit = (data) => {

        let newData = data.map((ele) => ele.nombre).join(', ')
        console.log(newData)
        return `${newData} A/An superado el stock maximo para compra`
    }

}


