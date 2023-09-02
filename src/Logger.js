
const fs = require("fs");
const { logging_directory, general_log, request_log, error_log} = require("./settings")

if(!fs.existsSync(logging_directory)) 
    fs.mkdirSync(logging_directory,{recursive:true})

const Log = async (line) => { 
//   console.log(line)
  line = `${Date.now().toString()} ${line}`;

  fs.writeFileSync(general_log, line + "\n", {
    encoding: "utf-8",
    flag: "a+",
  });
  console.log(line);
  return line;
};

const ErrorLog = (line) => {
  Log(line.stack ? line.stack : line).then(async (line) => {
    fs.writeFileSync(error_log, line + "\n", {
      encoding: "utf-8",
      flag: "a+",
    });
  });
};
const RequestLog = (line) => {
    // console.log(line)
  return Log(line).then(async (line) => {
    fs.writeFileSync(request_log, line + "\n", {
      encoding: "utf-8",
      flag: "a+",
    });
  });
};


module.exports = {
  ErrorLog,
  RequestLog,
  Log,
};
