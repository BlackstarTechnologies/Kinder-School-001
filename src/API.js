const express = require("express");
const router = express.Router();
const fs = require("fs");

const multer = require("multer"); // Require multer */
router.use(multer().any());

router.get("/helloworld", (req, res) => res.send({ response: "Hello World!" }));

// console.log(files)
const { files, getExt } = require("./utils/dictionaryFiles");

// "/api/contact-us"
router.post("*", (req, res) => {
  const { originalUrl } = req;

  res.send({ success: true });
  () => console.log(originalUrl);
});

router.get("/get-images-list", (req, res) => {
  const { galleryImages } = files;
  res.send({ images: galleryImages });
});

module.exports = router;
