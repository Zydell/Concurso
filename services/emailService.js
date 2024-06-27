const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '321343197859-iongugc7a5j0c6mdoh19v89uftiab1fp.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';
const REFRESH_TOKEN = '1//05vdC-gvR2-k5CgYIARAAGAUSNwF-L9IrO1ZGvelTymmRC8ykyJBljqzj69rSuvkypoRvZennkBARgpc4YnCG7iamfgvaGkAgibk';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function enviarCorreo(destinatario, asunto, texto) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'laboratoriosgestion@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'laboratoriosgestion@gmail.com',
      to: destinatario,
      subject: asunto,
      text: texto,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error enviando el correo:', error);
    throw error;
  }
}

module.exports = enviarCorreo;
