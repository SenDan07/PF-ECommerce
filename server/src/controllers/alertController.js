const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const HttpError = require("../errors/http-error");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  REDIRECT_URI
} = process.env;

const alertController = {
  sendEmail: async (req, res, next) => {
    const { emails, subject, content } = req.body;
    try {
      const oAuthsClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
      oAuthsClient.setCredentials({ refresh_token: REFRESH_TOKEN });
      const accessToken = await oAuthsClient.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "sigl.system@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      let htmlContent = `
        <h1>Informe de envío</h1>
        <p>${content}</p>
      `;
      const mailDetails = {
        from: "'e-Commerce PF-G8' <sigl.system@gmail.com>",
        to: emails,
        subject,
        html: htmlContent,
      };
      const info = await transporter.sendMail(mailDetails);
      res.status(201).send(info);
    } catch (error) {
      if (!(error instanceof HttpError)) {
        error = new HttpError("Error de credenciales o token expirado", 400);
      }
      return next(error);
    }
  },
};

module.exports = alertController;
