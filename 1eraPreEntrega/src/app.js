import express from 'express';
import { productRouter } from '../routes/productRouter.js';
import { cartRouter } from '../routes/cartRouter.js';

const app = express();
const port = 8080;

app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como datos JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes como datos codificados en formularios
app.use(express.static('./src/public')); // Configurar Express para servir archivos estáticos desde la carpeta "public"

// Usar los routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
