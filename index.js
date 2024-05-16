const http = require("http");
const fs = require("fs");
const url = require("url");

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%product_name%}/g, product.productName);
  output = output.replace(/{%image%}/g, product.image);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%from%}/g, product.from);
  output = output.replace(/{%nutrients%}/g, product.nutrients);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%description%}/g, product.description);
  output = output.replace(/{%id%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%not_organic%}/g, "not-organic");
  }

  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%product_card%}", cardsHtml);

    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = dataObj[query.id];

    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dataObj));
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-content-type": "Hello Hasan",
    });
    res.end("<h1>This page was not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening for requests on port 8000");
});
