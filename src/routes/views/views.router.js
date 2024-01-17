import express from 'express';
import { readFile } from 'fs/promises';
import Product from '../../dao/models/product.model.js';
import Cart from '../../dao/models/cart.model.js';

const indexRouter = express.Router();
const loginRouter = express.Router();
const profileRouter = express.Router();
const registerRouter = express.Router();
const homeRouter = express.Router();
const realTimeProducts = express.Router();
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

// Ruta para manejar la solicitud de la página /home
homeRouter.get('/', async (req, res) => {
  try {
    // Lee los productos desde products.json de manera asíncrona
    const data = await readFile('./src/dao/data/products.json', 'utf8');
    const products = JSON.parse(data);

    // Renderiza la vista home.handlebars y pasa los productos
    res.render('home', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar los productos.');
  }
});

// Ruta para manejar la solicitud de la página /realtimeproducts
realTimeProducts.get('/', async (req, res) => {
    try {
        const data = await readFile('./src/dao/data/products.json', 'utf8');
        const products = JSON.parse(data);

        res.render('realTimeProducts', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar los productos.');
    }
});

// Ruta para manejar la solicitud de la página /chat
chatRouter.get('/', (req, res) => {
  res.render('chat');
});

//Ruta para mostrar el listado de productos en la db
productsViewRouter.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // Cantidad de productos por página

  try {
    const result = await Product.paginate({}, { page, limit, lean:true });
    console.log(result);
    const totalPages = result.totalPages;
    const currentPage = result.page;

    res.render('products', {
      products: result.docs,
      totalPages,
      currentPage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// Ruta para mostrar un carrito específico
cartViewRouter.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await Cart.findById(cartId).populate('products.product').lean();
    console.log(cart);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.render('cart', { cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

export { indexRouter, loginRouter, profileRouter, registerRouter, homeRouter, realTimeProducts, chatRouter, productsViewRouter, cartViewRouter};
