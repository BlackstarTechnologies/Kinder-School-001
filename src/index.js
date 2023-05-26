const fs = require("fs");
const path = require("path");

const express = require("express");
const { RequestLog } = require("./process.handlers");
const { files, getExt } = require("./utils");

const { files_list } = require("./utils/dictionaryFiles");
const router = express.Router();

// router.all("*", (req, res) => res.send({ response: "hello world" }));
router.all("*", (req, res, callNext) => {
  const { originalUrl, method, ip } = req;

  res.on("close", () => {
    RequestLog(`${res.statusCode} ${method} ${ip} ${originalUrl}`);
  });

  callNext();
});

router.get("/*", (req, res, callNext) => {
  const { originalUrl } = req;
  const { last, ext, split } = getExt(originalUrl);
  if (!last.includes("html") && !last.includes("index") && files[ext]) {
    let pFile = files[ext]
      .filter((v) => v.endsWith(last) && v.includes("assets"))
      .pop();
    if (fs.existsSync(pFile)) {
      res.sendFile(path.resolve(pFile));
      return;
    }
    console.log(pFile);
  }

  let n = 0;
  for (let it of split) {
    switch (it) {
      case "About" || "Home":
        n++;
    }
  }
  if (n > 1)
    res.redirect(split.map((v, i) => (i < n - 1 ? ".." : v)).join("/"));

  callNext();
});

module.exports = router;
