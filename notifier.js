require("dotenv").config();
const nodemailer = require("nodemailer");
const showdown = require("showdown");
const { readFileSync } = require("fs");
const PROJECT_NAME = "Projeto 1";
const PROJECT_LINK = "http://troflo-sandbox.com.s3-website-sa-east-1.amazonaws.com";

function getContent() {
  const converter = new showdown.Converter();
  const text = readFileSync("./CHANGELOG.md", "utf8");
  const lastestRelease = "###" + text.split("###")[1];
  return converter.makeHtml(lastestRelease);
}

const html = /*html*/
`
  <h1>Nova versão disponível do ${PROJECT_NAME}</h1>
  ${getContent()}
  <a href=${PROJECT_LINK}>Acesse por aqui!</a>
`

async function main() {

  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  let info = await transporter.sendMail({
    from: "T10 lab <it@t10lab.com>",
    to: "diogomqbm13@gmail.com",
    subject: `Nova versão no ar - ${PROJECT_NAME}`,
    html
  });

  console.log("🤘 Message sent: %s", info.messageId);
}

main().catch("😫 Something went wrong" + console.error);