import express from 'express'
import * as authController from '../controllers/authController'
import passport from 'passport'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/login-success', authController.loginSucess)

// OAUTH
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'], session: false }))
router.get('/google/callback', function (req, res, next) {
    passport.authenticate('google', function (err, user) {
        if (err) { return next(err) }
        if (!user) { return res.redirect('/login') }
        req.user = user
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.REACT_APP_URL}/login-success/${req.user.id}`);
})

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }))
router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user) {
        if (err) { return next(err) }
        if (!user) { return res.redirect('/login') }
        req.user = user
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.REACT_APP_URL}/login-success/${req.user.id}`);
})


export default router