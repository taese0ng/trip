import express from 'express'
import passport from 'passport'
import routes from '../router.js'
import { postRegisterItinerary, getDetailItinerary } from '../controllers/itineraryController.js'

const itineraryRouter = express.Router()

// C
itineraryRouter.post(routes.uploadItinerary, 
    passport.authenticate('jwt', { session: false}), 
    postRegisterItinerary)

// R
itineraryRouter.get(routes.itineraryDetail(), getDetailItinerary)

// U
itineraryRouter.put(routes.editItinerary(), 
    passport.authenticate('jwt', { session: false}),
    getDetailItinerary)

// D

export default itineraryRouter