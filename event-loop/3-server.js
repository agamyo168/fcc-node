const http = require("http");
const server = http.createServer((req, res) => {
  console.log("New Request arrived"); // a callback that is received every time a request is made.
  res.end("Hello world!");
});

//listen is asynchronous, event-loop waits for requests.
server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
