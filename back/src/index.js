import express from 'express'
import { routesUser } from './routes/user.js'
import { userModel } from './model/user.js'


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000


const users = async ({ userModel }) => {
    app.use('/user', await routesUser(userModel))
}

users({ userModel })


app.listen(PORT, () => {
    console.log('LISTEN IN PORT', PORT)
})