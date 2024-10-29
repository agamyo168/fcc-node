const http = require("http");

const server = http.createServer((req, res) => {
  //writeHead(statusCode, {'content-type':xx }) -> this the header
  //xx could be -> text/html, text/plain, ... -> media type/mime types
  res.writeHead(200, { "content-type": "text/html" });
  res.write(`<h1>Home Page</h1>`);
  res.end();
});

server.listen(5000);
