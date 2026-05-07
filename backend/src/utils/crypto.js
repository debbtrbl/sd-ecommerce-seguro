const CryptoJS = require("crypto-js");


// função para criptografar dados
function encryptData(data) {

  return CryptoJS.AES.encrypt(

    data,
    process.env.AES_SECRET

  ).toString();

}


// função para descriptografar dados
function decryptData(data) {

  const bytes = CryptoJS.AES.decrypt(
    data,
    process.env.AES_SECRET
  );

  return bytes.toString(CryptoJS.enc.Utf8);

}

module.exports = {
  encryptData,
  decryptData
};