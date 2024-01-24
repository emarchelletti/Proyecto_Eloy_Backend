import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils.js";
import userModel from "../dao/models/user.model.js";
import "dotenv/config.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  // Logica para el registro de usuario con passport
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;

        try {
          let user = await userModel.findOne({ email });
          if (user) {
            console.log("Usuario ya existe");
            return done(null, false);
          }

          const isAdmin = email.toLowerCase() === 'admin@coder.com';

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role: isAdmin ? "admin" : "user",
          };
          let result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener usuario" + error);
        }
      }
    )
  );
  // Logica para el inicio de sesion con passport
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          let user = await userModel.findOne({ email: username });
          if (!user) {
            console.log("Usuario no existe ");
            return done(null, false);
          }

          if (!isValidPassword(user, password)) {
            console.log("Contraseña incorrecta");
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
    //Logica para el inicio de sesion con GitHub
    passport.use(
      "github",
      new GitHubStrategy(
        {
          clientID: process.env.gitClientId,
          clientSecret: process.env.gitClientSecret,
          callbackURL: process.env.gitClientCallback,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            console.log(profile);
            let user = await userModel.findOne({ email: profile._json.email });
            if (!user) {
              let newUser = {
                first_name: profile._json.name,
                last_name: "",
                age: "",
                email: profile._json.email,
                password: "",
              };
              let result = await userModel.create(newUser);
              done(null, result);
            } else {
              console.log("El usuario ya existe");
              done(null, user);
            }
          } catch (error) {
            done(error);
          }
        }
      )
    );

  passport.serializeUser((user, done) => {
    console.log(user._id);
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
