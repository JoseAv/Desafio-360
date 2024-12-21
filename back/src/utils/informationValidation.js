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
        console.log(message)
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

}


