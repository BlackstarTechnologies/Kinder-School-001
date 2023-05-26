require("./src/process.handlers");

const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/", require("./src"));
app.get("*", express.static("views"));

app.get("/", (req, res) => res.redirect("/Home/"));

app.use("*", (req, res) => {
  const { method } = req;
  if (method == "get" || method == "GET") {
    res.redirect("/404/");
    return;
  }
  res.send({ error: "action not allowed" });
});

app.listen(port, () => {
  console.log("listening on %d", port);
});
