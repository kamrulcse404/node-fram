const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview page");
  } else if (pathName === "/product") {
    res.end("This is the product page");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      const productData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
      // res.end(JSON.stringify(productData));
    });
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
