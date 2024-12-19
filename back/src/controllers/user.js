

export class ControllersUser {
    constructor({ ModelUsers }) {
        this.userModelDb = ModelUsers
    }

    userAccion = async (req, res) => {
        const { acction, data } = req.body
        let responseData;

        if (!acction) return res.status(500).json({ message: 'Debe de enviar una accion' })

        if (acction === 'R') {
            responseData = await this.userModelDb.userRead()
            console.log(responseData)
            res.send('Complete Orden')
        }

        if (acction === 'C') {
            res.json(await userCreate())
        }
    }







}

