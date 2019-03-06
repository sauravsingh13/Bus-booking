const passport = require('passport');
const userCOLL = require('../Schemas/userSchema');
const GOOGLE_STRATEGY = require('passport-google-oauth20');
const keys = require('./keys');

passport.serializeUser( (user, done) => {
    done(null, user.id);
})

passport.deserializeUser( (id, done) => {
    userCOLL.findById(id).then( (user) => {
        done(null, user);
    })    
})

passport.use(
    new GOOGLE_STRATEGY({
    // options for google strategy
    callbackURL: 'http://localhost:8080/login/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},function(accessToken, refreshToken, profile, done){
    userCOLL.findOne({googleId: profile.id}).then((alreadyExisitsUser) => {
        if(alreadyExisitsUser){
            // Already have this user
            done(null, alreadyExisitsUser);
        }else{
            new userCOLL({
                "firstname": profile.name.givenName,
                "lastname": profile.name.familyName,
                "username": profile.displayName,
                "email": profile.emails[0].value,
                "googleId": profile.id
            }).save().then((newUser) =>{
                done(null, newUser);
            })
        }
    })
}))