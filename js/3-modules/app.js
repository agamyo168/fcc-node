// Node uses CommonJS for modules.
// every file is a module (by default)
// Modules => Encapsulated code.

const {john, peter} = require('./names');
const sayHi = require("./util");

sayHi(john);
sayHi(peter);