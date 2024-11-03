    const { readFileSync, writeFileSync } = require('fs');

    const firstContent = readFileSync('./content/first.txt');
    console.log(firstContent); //<Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64 21>

    const firstContentEnc = readFileSync('./content/first.txt','utf-8'); 
    console.log(firstContentEnc); //Hello world!
    
    writeFileSync('./content/result.txt',`Here is the result: ${firstContent}`); // this wrote Hello world.
    //To append to an already existing file use the flag 'a'
    writeFileSync('./content/result.txt', `\nAppend this text`, {flag: 'a'});
    //without the flag writeFile overwrites the file.