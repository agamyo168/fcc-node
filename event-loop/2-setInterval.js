//Event-loop offloads setInterval and gets a callback every 2 seconds.
setInterval(() => {
  console.log("I'm always dead last");
}, 2000);
console.log(`I will run first`);
console.log(`I will run second`);
console.log(`I will run third`);
console.log(`I will run fourth`);
console.log(`I will run ??????????th`);
