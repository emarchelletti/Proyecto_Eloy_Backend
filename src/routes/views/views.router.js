import express from 'express';
import {showProducts} from '../../controllers/products.controller.js';
import { isUser } from '../../middlewares/auth.middleware.js';

const indexRouter = express.Router();
const loginRouter = express.Router();
const profileRouter = express.Router();
const registerRouter = express.Router();
const chatRouter = express.Router();
const productsViewRouter = express.Router();
const cartViewRouter = express.Router();

// Ruta para manejar la solicitud de la página de inicio
indexRouter.get('/', (req, res) => {
  res.render('index');
});

// Ruta para manejar el login
loginRouter.get("/", (req, res) => {
  let data = {
    title: "Inicio de sesión",
    actionLogin: "/api/sessions/login/",
  };
  res.render("login", data);
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

// Ruta para manejar el Registro
registerRouter.get("/", (req, res) => {
  let data = {
    title_register: "Registro",
    actionRegister: "/api/users/register/",
  };
  res.render("register", data);
});

// Ruta para manejar la solicitud de la página /chat
chatRouter.get('/', isUser, (req, res) => {
  res.render('chat');
});

//Ruta para mostrar el listado de productos en la db
productsViewRouter.get('/', showProducts);

// Ruta para mostrar un carrito específico
cartViewRouter.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await Cart.findById(cartId).populate('products.product').lean();
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.render('cart', { cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

export { indexRouter, loginRouter, profileRouter, registerRouter, chatRouter, productsViewRouter, cartViewRouter};
