import express from 'express';
import * as viewsController from "../../controllers/views.controller.js";
import {adminUserView} from '../../controllers/users.controller.js';
import { isUser, isAdmin } from '../../middlewares/auth.middleware.js';

const homeRouter = express.Router();
const indexRouter = express.Router();
const loginRouter = express.Router();
const profileRouter = express.Router();
const registerRouter = express.Router();
const chatRouter = express.Router();
const productsViewRouter = express.Router();
const cartViewRouter = express.Router();
const passwordRecoveryRouter = express.Router();
const passwordResetRouter = express.Router();
const adminUserViewRouter = express.Router();

// Ruta para manejar la vista admin index
indexRouter.get('/', (req, res) => {
  res.render('index');
});

// Ruta para manejar la vista de la página de inicio
homeRouter.get('/', viewsController.homeShowProducts);

// Ruta para manejar la vista de detalle de un producto
productsViewRouter.get('/:productId', viewsController.productDetailView);

//Ruta para mostrar el listado de productos en la db
productsViewRouter.get('/', viewsController.showProducts);

// Ruta para manejar el login
loginRouter.get("/", (req, res) => {
  let data = {
    actionLogin: "/api/sessions/login/",
  };
  res.render("login", data);
});

// Ruta para manejar el Registro
registerRouter.get("/", (req, res) => {
  let data = {
    title_register: "Registro",
    actionRegister: "/api/users/register/",
  };
  res.render("register", data);
});
// Ruta para recuperar la contraseña
passwordRecoveryRouter.get("/", (req, res) => {
  res.render("passwordRecovery");
});





// Ruta para mostrar carrito del usuario logueado
cartViewRouter.get('/', viewsController.showCart);







// Ruta para administrar usuarios
adminUserViewRouter.get("/", isAdmin, adminUserView);

// Ruta para restablecer la contraseña
passwordResetRouter.get("/", (req, res) => {
  const token = req.query.token;
  res.render("passwordReset", { token });
});

// Ruta para manejar el profile
profileRouter.get("/", (req, res) => {
  let data = {
    user: req.session.user,
    title: "Perfil del usuario",
    actionLogin: "/api/sessions/logout/",
  };
  res.render("profile", data);
});

// Ruta para manejar la solicitud de la página /chat
chatRouter.get('/', isUser, (req, res) => {
  res.render('chat');
});

export { indexRouter, homeRouter, loginRouter, profileRouter, registerRouter, chatRouter, productsViewRouter, cartViewRouter, passwordRecoveryRouter, passwordResetRouter, adminUserViewRouter};
