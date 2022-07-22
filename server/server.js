// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/connectDB'
dotenv.config()
// ROUTES
import authRouter from './src/routes/authRouter'
import userRouter from './src/routes/userRouter'
import appRouter from './src/routes/appRouter'
import postRouter from './src/routes/postRouter'
import commentRouter from './src/routes/commentRouter'

const app = express()
app.use(cors({
    origin: process.env.REACT_APP_URL
}))
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/app', appRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

connectDB()
const PORT = process.env.PORT || 8888
app.listen(PORT, () => { console.log(`Server is running on the ${PORT}`) })