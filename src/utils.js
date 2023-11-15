// El archivo utils.js funciona como una libreria propia del proyecto
import {fileURLToPath} from 'url'; // Importamos el metodo que levanta la url en la que estamos trababajando
import { dirname } from 'path'; // Importamos el metodo que muestra la ruta del archivo como direccion url


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// Configurar la carpeta y el nombre del archivo
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './src/public/img'); // Carpeta donde se guardarán los archivos
//   },
//   filename: (req, file, cb) => {
//     const timestamp = Date.now();
//     const originalname = file.originalname;
//     const filename = `${timestamp}-Coder`;
//     cb(null, filename);
//   },
// });

//export const uploader = multer({ storage });;
export default __dirname;