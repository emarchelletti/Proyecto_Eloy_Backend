import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import userModel from "../dao/models/user.model.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { first_name, last_name, age,} = req.body;

        try {
          let user = await userModel.findOne({ email });
          if (user) {
            console.log("Usuario ya existe");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
          };
          let result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener usuario" + error);
        }
      }
    )
  );

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

          if (!isValidPassword(user, password)) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  console.log(user._id);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id);
  done(null, user);
});

export default initializePassport;
