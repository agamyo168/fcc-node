const http = require("http");
const { createReadStream, readFileSync } = require("fs");

const server = http
  .createServer((req, res) => {
    // const text = readFileSync("./content/big.txt");
    // res.end(text);
    const fileStream = createReadStream("./content/big.txt", "utf8");
    fileStream.on("open", (chunk) => {
      fileStream.pipe(res);
    });
  })
  .listen(5000, () => {
    console.log("Server started...");
  });
