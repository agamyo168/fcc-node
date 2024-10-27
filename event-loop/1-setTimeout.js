console.log(`I will run first`);
setTimeout(() => {
  console.log("I'm always dead last");
}, 0);
console.log(`I will run second`);
console.log(`I will run third`);
console.log(`I will run fourth`);
console.log(`I will run ??????????th`);
//this prints -> first, third then second.
