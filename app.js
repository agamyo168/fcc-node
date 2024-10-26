const http = require("http");

console.log("Creating server");
const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.end("Welcome to our home page!");
    return;
    // res.write("Welcome to our home page!");
    // res.end();
  }
  if (req.url === "/about") {
    res.end("Here is our short history");
    return;
  }
  //a route that doesn't exist
  res.end(`<h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back to home page</a>`);
});
console.log("Starting Server!");
server.listen(5000);
