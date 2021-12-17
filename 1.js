const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

const data = fs.readFileSync(
  "resource/complete-node-bootcamp/1-node-farm/starter/dev-data/data.json",
  "utf-8"
);
const productData = JSON.parse(data);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%PRODUCTCOST%}/g, product.price);
  output = output.replace(/{%PRODUCTNUTRI%}/g, product.nutrients);
  output = output.replace(/{%PRODUCTQUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCTCOUNTRY%}/g, product.from);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

const tempOverview = fs.readFileSync(
  "resource/complete-node-bootcamp/1-node-farm/starter/templates/overview.html",
  "utf-8"
);
const tempProduct = fs.readFileSync(
  "resource/complete-node-bootcamp/1-node-farm/starter/templates/product.html",
  "utf-8"
);
const tempCard = fs.readFileSync(
  "resource/complete-node-bootcamp/1-node-farm/starter/templates/card.html",
  "utf-8"
);

const slugs = productData.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  const requestUrl = url.parse(req.url).pathname;
  const pathName = req.url;
  res.on("error", (error) => console.log(error));
  try {
    switch (requestUrl) {
      case "/":
        const cardsHtml = productData
          .map((el) => replaceTemplate(tempCard, el))
          .join("");
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(output);
        break;

      case "/api":
        res.writeHead(200, { "Content-Type": "application/json" });
        // res.end("api");
        res.end(data);
        break;
      case "/product":
        console.log(query);
        res.writeHead(200, { "Content-Type": "text/html" });
        const product = productData[query.id];
        const out = replaceTemplate(tempProduct, product);
        res.end(out);
        break;
      default:
        res.writeHead(404, {
          "Content-type": "text/html",
          "my-own-header": "hello world",
        });
        res.end("Page not found");
    }
  } catch (error) {
    console.log(error);
  }
  // TODO:
  // FIXME:
  // BUG:

  // if(  pathName ==="/overview" || pathName ==="/"){

  // }else if(pathName==="/product"){
  //     res.end("this is the Product");
  // }else if(pathName==="/api"){

  //     res.writeHead(200,{"Content-Type":"application/json"});
  //     res.end(data);
  // }else{
  //     res.writeHead(404,{
  //         "Content-type":"text/html",
  //         "my-own-header":"hello world"
  //     });
  //     res.end("Page not found");
  // }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request at 8000");
});
