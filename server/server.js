import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/connectDB'
import passport from 'passport'
dotenv.config()
import appRoute from './appRoute'
require('./passport')

const app = express()
app.use(cors({
    origin: process.env.REACT_APP_URL
}))
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(passport.initialize())

appRoute(app)
connectDB()
const PORT = process.env.PORT || 8888
app.listen(PORT, () => { console.log(`Server is running on the ${PORT}`) })