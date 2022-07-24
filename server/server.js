// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/connectDB'
import { appRouter, authRouter, userRouter, postRouter, commentRouter, bonusUserRouter } from './src/routes'
dotenv.config()

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
app.use('/api/bonus-info-user', bonusUserRouter)

connectDB()
const PORT = process.env.PORT || 8888
app.listen(PORT, () => { console.log(`Server is running on the ${PORT}`) })