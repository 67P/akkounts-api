"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: process.env.SMTP_USE_TLS === 'true',
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});
exports.sendMail = (object) => {
    const message = {
        from: 'accounts@kosmos.org',
        to: object.recipient,
        subject: object.subject,
        text: object.content
    };
    return transporter.sendMail(message);
};
//# sourceMappingURL=nodemailer.js.map