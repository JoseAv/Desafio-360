import { sequelize } from '../db/sequelize.js';
import { MessagePersonalise, ValidationResponse } from '../utils/informationValidation.js'


export class ModelState {


    static statesRead = async () => {
        try {
            await sequelize.authenticate();
        } catch (error) {
        }
        return
    }

    static createStates = async ({ name }) => {
        try {

            const newName = name.toLowerCase()
            const comprobateName = await sequelize.query('Select nombre from estados where nombre = :nombre ', {
                replacements: { nombre: newName },
                type: sequelize.QueryTypes.SELECT
            })

            if (comprobateName.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataExisting('Nombre') })

            await sequelize.query('exec insert_estado :nombre', {
                replacements: { nombre: newName },
                type: sequelize.QueryTypes.SELECT
            })
            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('Estado') })

        } catch (error) {
            return ValidationResponse.Denied({
                message: error,
                error: MessagePersonalise.failPeticion('Estado')
            })
        }
    }


    static updateStates = async ({ name, id }) => {
        try {

            const newName = name.toLowerCase()
            const comprobateName = await sequelize.query('Select nombre from estados where id = :id ', {
                replacements: { id: id },
                type: sequelize.QueryTypes.SELECT
            })
            if (!comprobateName.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('ID') })

            await sequelize.query('EXEC  update_estado :id, :nombre', {
                replacements: { id: id, nombre: newName },
                type: sequelize.QueryTypes.SELECT
            })
            return ValidationResponse.Accepted({ message: MessagePersonalise.dataUpdateSuccessful('Estado') })

        } catch (error) {
            return ValidationResponse.Denied({
                message: error,
                error: MessagePersonalise.failPeticion('Estado')
            })
        }
    }



}