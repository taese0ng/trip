import express from 'express'
import passport from 'passport'
import routes from '../router.js'
import { postRegisterItinerary, getDetailItinerary, postEditItinerary, getDeleteItinerary } from '../controllers/itineraryController.js'

const itineraryRouter = express.Router()

// C
itineraryRouter.post(routes.uploadItinerary, 
    passport.authenticate('jwt', { session: false }), 
    postRegisterItinerary)

// R
itineraryRouter.get(routes.itineraryDetail(), getDetailItinerary)

// U
itineraryRouter.post(routes.editItinerary(), 
    passport.authenticate('jwt', { session: false}),
    postEditItinerary)

// D
itineraryRouter.get(routes.deleteItinerary(), 
    passport.authenticate('jwt', { session: false}),
    getDeleteItinerary)

export default itineraryRouter