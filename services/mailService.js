const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
require("dotenv").config();

//informations SMTP
const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"drink.geniusofficial@gmail.com",
        pass: process.env.GMAIL_PASSWORD
    },
});

async function sendConfirmationMail (email, firstname, id) {

    try {
        // Token de validation
        const emailToken = jwt.sign({ id }, process.env.MAIL_SECRET,
            {
                expiresIn: '1h',
            },
        );

        const url = `http://localhost:3000/confirmation/${emailToken}`;

        // On envoie le mail de confirmation
        const mailConfirmation = {
            from: "drink.genius@gmail.com",
            to: `${email}`,
            subject: "Confirmation d'inscription",
            text: `Bonjour ${firstname}, Cliquez sur ce lien (valable pendant une heure) pour profiter de notre application "Drink Genius" : ${url} \n L'équipe de Drink Genius`,
        };

        await transporter.sendMail(mailConfirmation);
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendConfirmationMail
