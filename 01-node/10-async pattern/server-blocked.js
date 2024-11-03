const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Hey a new request");
  const { url } = req;
  if (url === "/") {
    res.end("Home Page");
    return;
  }
  if (url === "/about") {
    //BLOCKING OPERATION
    for (let i = 0; i < 1000; ++i)
      for (let j = 0; j < 1000; ++j) console.log(`${i}  ${j}`);
    //This blocking operation will block all other users from accessing the site too so that's why it should be offloaded.
    res.end("About page");
    return;
  }
  res.end("Error Page");
});

server.listen(5000, () => {
  console.log("The server is ready my liege.");
});
