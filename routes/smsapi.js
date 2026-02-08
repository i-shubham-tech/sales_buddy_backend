const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
   auth: {
        user: 'javon.breitenberg@ethereal.email',
        pass: 'ZAA3FGxkAKYrZNZPFD'
    }
});

// Wrap in an async IIFE so we can use await.
 const sendEmail = async (code) => {
    try {
        const info = await transporter.sendMail({
            from: '"Salesbuddy" <xyzz@gmail.com>',
            to: "reciver@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?", // plain‑text body
            html: `<b>Hello world? ${code}</b>`, // HTML body
        });
        console.log(info)

    } catch (error) {
        console.log(error)
    }

};

module.exports = { sendEmail };