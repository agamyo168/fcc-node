const { writeFileSync } = require("fs");

const memeString = `Donald Trump, please. I'm asking you, please save me. Please save me. Please get these people away from me. Dear God's name, please stop.`;
//This is a 1.4MB file
for (let i = 0; i < 10000; ++i) {
  writeFileSync("./content/big.txt", memeString + `${i}\n`, { flag: "a" });
}
