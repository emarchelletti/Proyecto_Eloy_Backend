import {fileURLToPath} from 'url'; // Importamos el metodo que levanta la url en la que estamos trababajando
import { dirname } from 'path'; // Importamos el metodo que muestra la ruta del archivo como direccion url
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import passport from "passport";
import bcrypt from "bcrypt";

const PRIVATE_KEY = process.env.KEYSECRET;
const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1d" });
  return token;
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages?.info, messages: info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};
