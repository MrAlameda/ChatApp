
import configure from "../config"
import { getUserById } from "../users/user.controller";
import JwtStrategy from "passport-jwt"
import ExtractJwt from "passport-jwt" 


export default (passport:any) => {
    const options={
        jwtFromRequest:ExtractJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey:configure.JWTsecret
    }
    passport.use(
        new JwtStrategy.Strategy(options,async (decode:any,done:any) => {
            try {
                const result=await getUserById(decode.id)
                if(!result){
                    return done(null,false)
                }
                return done(null,decode)
            } catch (error) {
                return done(error,false)
            }
        })
    )
}
