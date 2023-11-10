import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from "socket.io";

import productRouter  from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/views.router.js';
import realTimeProducts from './routes/realtimeproducts.router.js';
import homeRouter from './routes/homeRouter.js';

const app = express();
const port = 8080;



app.engine('handlebars', handlebars.engine()); // Se establece Handlebars como el motor de plantillas.
app.set('views',`${__dirname}/views`); // Se indica el directorio donde se encuentran las plantillas.
app.set('view engine', 'handlebars'); //Se establece el motor de vista como 'handlebars'.

app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como datos JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes como datos codificados en formularios
app.use(express.static(__dirname + '/public')); // Configurar Express para servir archivos estáticos desde la carpeta "public"

// Usar los routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/home', homeRouter);
app.use('/realtimeproducts', realTimeProducts);

const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
const io = new Server(httpServer)
