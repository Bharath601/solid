// /utils/emailService.js
import nodemailer from 'nodemailer';
import  config  from 'config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get("gmail"),
    pass: config.get("password") // For Gmail, you might need to set up an App Password
  }
});


export const sendVerificationEmail = async (userEmail, verificationToken) => {
  const mailOptions = {
    from: config.get("gmail"),
    to: userEmail,
    subject: 'Verify Your Email',
    text: `Please click on the following link to verify your email: http://192.168.0.198:3000/verify-email?token=${verificationToken}`
  };
console.log(verificationToken)
  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};
