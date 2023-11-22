import express from 'express';
import { readFile } from 'fs/promises';

const viewsRouter = express.Router();
const homeRouter = express.Router();
const realTimeProducts = express.Router();
const chatRouter = express.Router();

// Ruta para manejar la solicitud de la página de inicio
viewsRouter.get('/', (req, res) => {
  res.render('index');
});

// Ruta para manejar la solicitud de la página /home
homeRouter.get('/', async (req, res) => {
  try {
    // Lee los productos desde products.json de manera asíncrona
    const data = await readFile('./src/data/products.json', 'utf8');
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
        const data = await readFile('./src/data/products.json', 'utf8');
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

export { viewsRouter, homeRouter, realTimeProducts, chatRouter};
