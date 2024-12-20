export class ValidationResponse {

    static Accepted({ message, dataQuery = null, statusCode = 200 }) {
        console.log('Mensaje', message)
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

    static dataEmpty = (campo) => {
        return `Debe de ingresar un ${campo}`
    }

    static dataExisting = (campo) => {
        return `${campo} ya existe`

    }

    static dataNotExisting = (campo) => {
        return `${campo} no existe registro en la base de datos`

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


