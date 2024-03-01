import {transport, twilioClient} from "..//utils/utils.js";
import {emailConfig, smsConfig} from "../config/notification.config.js";
import userModel from "../dao/models/user.model.js";
import jwt from 'jsonwebtoken';

export const sendEmail = async (req, res) => {
  console.log('Se hizo click en "Enviar"');
  try {
    const { email } = req.body;
    
    // Generar y firmar el token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Guardar el token asociado al usuario en la base de datos
    await userModel.findOneAndUpdate({ email }, { resetPassToken: token });
    
    const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword?token=${token}`;
    
    const html = `
      <html>
        <div>
          <p>Hola,</p>
          <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
          <a href="${resetUrl}">Restablecer contraseña</a>
        </div>
      </html>
    `;
    
    const mailOptions = {
      from: emailConfig.emailUser,
      to: email,
      subject: 'Restablecer contraseña',
      html,
    };
    
    const result = await transport.sendMail(mailOptions);
    res.json({ message: 'Correo electrónico enviado correctamente', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const sendSMS = async (req, res) => {

  try {
    const { to, name, message } = req.body;
    const body = `Hola ${name},  ${message} `;

    const result = await twilioClient.messages.create({
      from: smsConfig.smsNumber,
      to,
      body,
    });

    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};