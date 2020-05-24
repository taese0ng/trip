import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import passport from 'passport'

import './passport.js'
import globalRouter from './routers/globalRouter.js'


const app = express()

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(passport.initialize())

app.use('/' , globalRouter)



export default app;