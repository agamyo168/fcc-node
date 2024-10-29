const http = require("http");

const server = http.createServer((req, res) => {
  //writeHead(statusCode, {'content-type':xx }) -> this the header
  //xx could be -> text/html, text/plain, ... -> media type/mime types
  const { url, method } = req;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<h1>Home Page</h1>`);
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<h1>About page</h1>`);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h1>page not found </h1>`);
    res.end();
  }
});

server.listen(5000);
