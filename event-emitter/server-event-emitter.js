const http = require("http");

// const server = http.createServer((req, res) => {
//   res.end("welcome");
// });

//Using Event Emitter api
const server = http.createServer();

//Behind the scenes server is an event emitter which can subscribe and emit events.

server.on("request", (req, res) => {
  res.end("Welcome");
});

server.listen(5000);
