// El archivo utils.js funciona como una libreria propia del proyecto
import { fileURLToPath } from "url"; // Importamos el metodo que levanta la url en la que estamos trababajando
import { dirname } from "path"; // Importamos el metodo que muestra la ruta del archivo como direccion url
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import twilio from "twilio";
import { fakerES } from "@faker-js/faker";
import { emailConfig, smsConfig } from "../config/notification.config.js";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const generateUniqueCode = () => {
  return uuidv4();
};

export const transport = nodemailer.createTransport({
  service: emailConfig.serviceMail,
  port: emailConfig.serviceMailPort,
  auth: {
    user: emailConfig.emailUser,
    pass: emailConfig.emailPassword,
  },
});

export const twilioClient = twilio(smsConfig.smsAccount, smsConfig.smsToken);

export const generateMockProducts = () => {
  return {
    _id: fakerES.database.mongodbObjectId(),
    title: fakerES.commerce.productName(),
    description: fakerES.commerce.productDescription(),
    price: fakerES.commerce.price(),
    stock: fakerES.number.int({ min: 0, max: 200 }),
    category: fakerES.commerce.productAdjective(),
    thumbnail: fakerES.image.url(),
    visible: true,
  };
};

// Función para verificar si el usuario ha cargado todos los documentos requeridos
export const checkRequiredDocuments = (userDocuments) => {
  const requiredDocuments = ["DNI", "DOMICILIO", "CBU"];
  for (const document of requiredDocuments) {
    if (!userDocuments.some((doc) => doc.name === document)) {
      return false; 
    }
  }
  return true;
}; 

export const __dirname = dirname(fileURLToPath(import.meta.url));
