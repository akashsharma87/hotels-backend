const passport = require('passport');
// initializing passport
const LocalStrategy = require('passport-local').Strategy;
const person = require('./person');

passport.use(new LocalStrategy(async (username, password, done) => {
   
    try {
        //console.log('Recieved credentials:', username, password);
        const user = await person.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user)
        }else{
            return done(null,false,{message:'Incorrect password'});
        }
    } catch (error) {
        return done(error);

    }
}));

module.exports = passport; // exporting configured passport
