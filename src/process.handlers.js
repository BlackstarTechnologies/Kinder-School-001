require("dotenv/config");
const { ErrorLog } = require("./Logger");



process.on("uncaughtExceptionMonitor", (err, origin) => {
  const line = `Caught exception: ${err.message} Exception origin: ${err.stack}`;
  ErrorLog(line);
});
