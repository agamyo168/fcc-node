const EventEmitter = require("events"); //This name is a common practice.

const customEmitter = new EventEmitter();
/*
event.on -> listen for specific event
event.emit -> emit that event

.on('nameOfTheEvent', callbackFn)
we can listen to the same event and do as many callbacks as we want.
 */

customEmitter.on("response", (name, id) => {
  console.log(`data received user ${name} with id:${id}`);
});

customEmitter.on("response", () => {
  console.log(`some other logic here `);
});

//Listening comes first then emitting the event.
/*
.emit('nameOfTheEvent', param1, param2,...)
*/
customEmitter.emit("response", "john", 34); //make sure the the name is the same.
