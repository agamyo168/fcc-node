const path = require('path');
console.log(path.sep) // prints / -> on windows this will be \ 
console.log(path.resolve(__dirname,'app','index.js')); //returns an absolute path
//prints /home/jimbo/Desktop/backend/fcc_node_tutorial/node_basics/app/index.js
console.log(path.normalize('./app//src//util/..')); //prints app/src/util
//normalizes any path by removing instances of . turning double slashes into single slash and removing a directory when .. is found
const filePath = path.join('/app','src','util', '..', '/index.js');
console.log(filePath);
//print /app/src/index.js
console.log(path.basename(filePath));
//prints index.js
console.log(path.dirname(require.main.filename)); //This can be called to get the root directory i.e the place where index.js is.
console.log(__dirname); //this will get the current directory where the javascript file resides not the index.js