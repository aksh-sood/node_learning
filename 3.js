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

const getDogPic = async () => {
  try {
    const data = await readFilePro(
      "resource/complete-node-bootcamp/3-asynchronous-JS/starter/dog.txt"
    );
    console.log(`Breed: ${data}`);
    const res = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise().all([res, res1, res2]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro(
      "resource/complete-node-bootcamp/3-asynchronous-JS/starter/dog-img.txt",
      imgs.join("\n")
    );
    console.log("File Saved");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2:READY";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("ERROR 💥");
  }
})();

// getDogPic().then((x) => {
//   console.log(x);
//   console.log("3: Done getting done");
// });
// readFilePro("resource/complete-node-bootcamp/3-asynchronous-JS/starter/dog.txt")
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro(
//       "resource/complete-node-bootcamp/3-asynchronous-JS/starter/dog-img.txt",
//       res.body.message
//     );
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
