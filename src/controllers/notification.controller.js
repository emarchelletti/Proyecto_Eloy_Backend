import {transport, twilioClient} from "..//utils/utils.js";
import {emailConfig, smsConfig} from "../config/notification.config.js";

export const sendEmail = async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    const html = `
        <html>
            <div>
                ${message}
            </div>
        </html>
    `;
    const mailOptions = {
      from: emailConfig.emailUser,
      to,
      subject,
      html,
      // attachments: [
      //   {
      //     file: "loro.JPG",
      //     path: process.cwd() + "/src/images/loro.JPG",
      //     cid: "loro",
      //   },
      //   {
      //     filename: "design-patterns-es.pdf",
      //     path: process.cwd() + "/src/files/design-patterns-es.pdf",
      //   },
      // ],
    };
    const result = await transport.sendMail(mailOptions);
    res.json({ messaje: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.message });
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