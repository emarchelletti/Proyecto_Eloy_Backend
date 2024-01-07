import passport from "passport";
import jwt from "passport-jwt";
import "dotenv/config.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) { //Si existe el req y existe la cookie entonces el token asume su valor
    token = req.cookies["access_token"]; // Hay que saber el nombre de la cookie para asignarla
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), // esta funcion extrae el jwt desde la cookie del navegador
        secretOrKey: process.env.KEYSECRET,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
