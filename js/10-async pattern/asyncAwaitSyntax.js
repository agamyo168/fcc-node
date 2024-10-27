const { readFile, writeFile } = require("fs").promises;

const noneBlockingOperation = async () => {
  try {
    const first = await readFile("./content/first.txt", "utf8");
    const second = await readFile("./content/second.txt", "utf8");
    await writeFile(
      "./content/result.txt",
      `----START----\nThis is the two files first.txt and second.txt each on a newline:\n${first}\n${second}\n\n---END---\n\n`
    );
    console.log(first, second);
  } catch (err) {
    console.log(err);
  }
};

noneBlockingOperation();
