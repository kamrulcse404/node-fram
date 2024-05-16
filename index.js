const http = require("http");

const server = http.createServer((req, res) => {
  const pathName = req.url;
  
  if (pathName === '/' || pathName === '/overview') {
    res.end("This is the overview page");
  } else if (pathName === '/product') {
    res.end("This is the product page");
  } else {
    res.writeHead(404, {
      'Content-Type': "text/html",
      'my-content-type': "Hello Hasan",
    });
    res.end("This page was not found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening for requests on port 8000");
});
