const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/send-picture', upload.single('homePicture'), (req, res) => {
    const clientEmail = req.body.clientEmail;
    const homePicture = req.file;

    // Configure your email service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: clientEmail,
        subject: 'Your Home Picture',
        text: 'Here is the picture of your home.',
        attachments: [
            {
                filename: homePicture.originalname,
                path: homePicture.path
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Picture sent successfully!');
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
