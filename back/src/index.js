import express from 'express'
import { routesUser } from './routes/user.js'
import { ModelUsers } from './model/user.js'
import cors from 'cors'


const app = express()

const PORT = process.env.PORT ?? 3000


const main = async ({ ModelUsers }) => {
    app.use(express.json())
    app.use(cors())
    app.use('/user', routesUser({ ModelUsers }))


    app.listen(PORT, () => {
        console.log('LISTEN IN PORT', PORT)
    })

}

main({ ModelUsers })


