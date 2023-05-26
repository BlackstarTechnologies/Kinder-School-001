const { getExt, files } = require("./dictionaryFiles");

const { v4, validate: uuidValidate, version: uuidVersion } = require("uuid");
const { removeDuplicates } = require("./001");
// const NAMESPACE = "dbfed39a-b5d8-4946-bcc7-667ee06a46aa";

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}
const uuidV4 = () => v4();

const wait = async (n = 0) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("waited");
    }, n * 1000);
  });
};

module.exports = {
  getExt,
  files,
  wait,
  uuidValidateV4,
  uuidV4,
  removeDuplicates,
};
