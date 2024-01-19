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

async function warningNewCocktail(cocktailAuthorEmail, cocktailAuthorName) {
    try {
        // On envoie un mail pour prévenir qu'il y a un nouveau cocktail
        const newCocktailAlert = {
            from: "drink.geniusofficial@gmail.com",
            to: "stephane.andre85@gmail.com", 
            subject: "Nouvelle Création",
            text: `Bonjour, Vous avez un nouveau cocktail à valider, proposé par ${cocktailAuthorName} (${cocktailAuthorEmail})`,
        };

        await transporter.sendMail(newCocktailAlert);
    } catch (error) {
        console.error(error);
    }
}

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
            from: "drink.geniusofficial@gmail.com",
            to: `${email}`,
            subject: "Confirmation d'inscription",
            text: `Bonjour ${firstname}, Cliquez sur ce lien (valable pendant une heure) pour profiter de notre application "Drink Genius" : ${url} \n L'équipe de Drink Genius`,
        };

        await transporter.sendMail(mailConfirmation);
    } catch (err) {
        console.log(err);
    }
};
module.exports = { warningNewCocktail, sendConfirmationMail };
