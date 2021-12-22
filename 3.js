const fs = require("fs");
const superagent = require("superagent");
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFilePro = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(`error in write ${err.message}`);
      resolve("File written successfully");
    });
  });
};

readFilePro("resource/complete-node-bootcamp/3-asynchronous-JS/starter/dog.txt")
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro(
      "resource/complete-node-bootcamp/3-asynchronous-JS/starter/dog-img.txt",
      res.body.message
    );
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.message);
  });
