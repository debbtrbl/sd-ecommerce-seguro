const fs = require("fs");


// função para registrar logs
function saveLog(message) {

  // data e hora atual
  const date = new Date().toLocaleString();


  // formato do log
  const log = `[${date}] ${message}\n`;


  // dalva no arquivo security.log
  fs.appendFileSync(
    "src/logs/security.log",
    log
  );

}

module.exports = saveLog;