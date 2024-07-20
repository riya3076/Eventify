/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import nodemailer from "nodemailer";

var smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "dalhours@gmail.com",
    pass: "zgcm ogkn tkvq seuy",
  },
});

export const sendEmail = async (email: any, subject: any, body: any) => {
  const mailOptions = {
    from: "dalhours@gmail.com",
    to: email,
    subject: subject,
    html: body,
  };

  return await smtpTransport.sendMail(mailOptions);
};
