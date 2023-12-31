// El archivo utils.js funciona como una libreria propia del proyecto
import {fileURLToPath} from 'url'; // Importamos el metodo que levanta la url en la que estamos trababajando
import { dirname } from 'path'; // Importamos el metodo que muestra la ruta del archivo como direccion url
import bcrypt from 'bcrypt';

export const createHash = (password) => 
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
    bcrypt.compareSync (password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default __dirname;