const http = require("http");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("This is the overview page");
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("This is the product page");
  } else if (pathName === "/api") {
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
