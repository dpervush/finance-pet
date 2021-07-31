import express from 'express'
import mongoose from 'mongoose'
import CardRouter from "./Card/CardRouter.js";
import CategoryRouter from "./Category/CategoryRouter.js";
import TransactionRouter from "./Transaction/TransactionRouter.js";



const PORT = 5000;
const DB_URL = `mongodb+srv://user:user@cluster0.abzpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
// app.use(express.static('static'))
app.use('/api', CardRouter)
app.use('/api', CategoryRouter)
app.use('/api', TransactionRouter)


async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()
