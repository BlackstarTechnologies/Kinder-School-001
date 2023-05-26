const fs = require("fs");
const path = require("path");

let show = 0;
if (process.argv.filter((v) => v.match(/(dev)/)).length) {
  show++;
}

const getExt = (k = "/") => {
  let split = k.split("/");
  let last = Array.from(split).pop();
  let ext = last.split(".").pop();

  return {
    split,
    last,
    ext,
  };
};

const walk_ = (p = ".") => {
  return fs.readdirSync(p, { withFileTypes: true });
};

const walk = (p = ".") => {
  let store = {
    dirs: [p],
    files: [""],
  };

  const add_Dirs = (p) => {
    let j = walk_(p);
    store.files = [
      ...store.files,
      ...j.filter((v) => !v.isDirectory()).map((v) => `${p}/${v.name}`),
    ];
    store.dirs = [
      ...store.dirs,
      ...j
        .filter((v) => v.isDirectory() && !v.name.includes("node_modules"))
        .map((v) => `${p}/${v.name}`),
    ];
    return store;
  };
  store = add_Dirs(p);
  let checked = [""];
  for (let i = 0, l = store.dirs.length; i < l; i++, l = store.dirs.length) {
    let dir = store.dirs[i];
    if (checked.includes(dir)) continue;
    store = add_Dirs(dir);
    checked.push(dir);
  }
  return store;
};

let allFiles = walk();

if (show) console.log(allFiles);

const getAllExtensions = (files) => {
  let extensions = [""];
  for (let file of files) {
    let ext = file.split("/").pop().split(".").pop();
    if (!extensions.includes(ext)) extensions.push(ext);
  }
  return extensions;
};
// allFiles.files
const extensions = getAllExtensions(allFiles.files);

if (show) console.log(extensions);

let files = {
  env: [""],
  tmp: [""],
  js: [""],
  bat: [""],
  json: [""],
  css: [""],
  html: [""],
  ico: [""],
  txt: [""],
  mp4: [""],
  woff2: [""],
  jpeg: [""],
  png: [""],
  jpg: [""],
  JPG: [""],
};

for (let k of allFiles.files) {
  if (!k.includes("views")) continue;
  let ext = k.split("/").pop().split(".").pop();
  if (files[ext] && !files[ext].includes(k)) {
    files[ext].push(k);
  }
}
if (show) console.log(files);

files.galleryImages = [
  ...files.JPG.filter((v) => v.includes("swappable")),
  ...files.png.filter((v) => v.includes("swappable")),
  ...files.jpg.filter((v) => v.includes("swappable")),
];

module.exports = {
  getExt,
  files,
  files_list: allFiles.files,
  getAllExtensions,
};
