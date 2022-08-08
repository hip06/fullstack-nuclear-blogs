import passport from 'passport';
import db from './src/models'
import { v4 as uuidv4 } from 'uuid';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config()

// GOOGLE
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
},
    async function (accessToken, refreshToken, profile, done) {
        let tokenLogin = uuidv4()
        profile.tokenLogin = tokenLogin
        if (profile?.id) {
            let response = await db.User.findOrCreate({
                where: { id: profile.id },
                defaults: {
                    id: profile.id,
                    email: profile.emails[0]?.value || null,
                    firstName: profile.name?.givenName || null,
                    lastName: profile.name?.familyName || null,
                    typeLogin: 'google',
                    avatarUrl: profile.photos[0]?.value,
                    tokenLogin
                }
            })

            if (!response[1]) {
                await db.User.update({ tokenLogin }, { where: { id: profile?.id } })
            }
        }
        done(null, profile)
    }
));
// FACEBOOK ?
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'name', 'email', 'photos']
},
    async function (accessToken, refreshToken, profile, cb) {
        let tokenLogin = uuidv4()
        profile.tokenLogin = tokenLogin
        if (profile?.id) {
            await db.User.findOrCreate({
                where: { id: profile.id },
                defaults: {
                    id: profile.id,
                    email: profile.emails[0]?.value || null,
                    lastName: profile.name?.familyName || null,
                    firstName: profile.name?.givenName || null,
                    typeLogin: 'facebook',
                    avatarUrl: profile.photos[0]?.value,
                    tokenLogin
                }
            })
            if (!response[1]) {
                await db.User.update({ tokenLogin }, { where: { id: profile?.id } })
            }
        }
        return cb(null, profile);
    }
));

