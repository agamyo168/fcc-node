const { createReadStream } = require("fs");

// by default each chunk holds maximum `65486 bytes -- 64kb`
// to change the chunk size -> add { highWaterMark: x bytes } flag
// to change encoding to read something other than a buffer of bytes add encoding flag {encoding: 'utf8'}

const stream = createReadStream("./content/big.txt", {
  highWaterMark: 90000,
  encoding: "utf8",
});
//subscribing to 'data' event and doing a callback with the received args.

stream.on("data", (chunk) => {
  console.log(chunk);
});
//Error handling
stream.on("error", (err) => {
  console.log(err);
});
