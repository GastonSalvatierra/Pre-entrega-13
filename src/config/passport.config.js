import GitHubStrategy from "passport-github2";
import userModel from "../services/dao/db/models/user.js";
import passport from "passport";


const initializePassport = () => {


//ESTRATEGIA CON GITHUB

passport.use('github', new GitHubStrategy(
    {

    clientID: 'Iv1.4b37d8feacd6c69c',
    clientSecret: '240f9566921637c83d6268aacb2506a3a94d4094',
    callbackUrl: 'http://localhost:8080/api/session/githubcallback'


}, async(accessToken, refreshToken, profile, done)=>{
    console.log("Profile del usuario");
    console.log(profile);

    try {
        const user = await userModel.findOne({email:profile._json.email})
        console.log("Usuario encontrado para login");
        console.log();

        if (!user) {
            console.warn("User doesn't exists with username: " + profile._json.email);
            let newUser = {
                first_name: profile._json.name,
                last_name: '',
                age: 18,
                email: profile._json.email,
                password: '',
                loggedBy: "GitHub"
            }
            const result = await userModel.create(newUser)
            done(null, result)
        }
        else {
            return done(null, user)
        }
    } catch (error) {
        return done(error)
    }   

}))

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        console.error("Error deserializando el usuario: " + error);
    }
});


}

export default initializePassport;