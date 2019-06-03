import * as nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  secure: process.env.SMTP_USE_TLS === 'true',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
})

interface Message {
  recipient: string
  subject: string
  content: string
}

export const sendMail = (object: Message) => {
  const message = {
    from: 'accounts@kosmos.org',
    to: object.recipient,
    subject: object.subject,
    text: object.content
  }

  return transporter.sendMail(message)
}
