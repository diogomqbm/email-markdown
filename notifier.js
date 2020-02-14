require("dotenv").config();
const nodemailer = require("nodemailer");
const showdown = require("showdown");
const { readFileSync } = require("fs");

function getContent() {
  const converter = new showdown.Converter();
  const text = readFileSync("./CHANGELOG.md", "utf8");
  return converter.makeHtml(text);
}

async function main() {

  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASS // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "T10 lab <it@t10lab.com>",
    to: "diogomqbm13@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: getContent() // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);