
// Import events module
var events = require('events');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Bind an event and handler as follows
//eventEmitter.On('eventName', eventHandler);

// Fire the event
//eventEmitter.emit('eventName');



var connectEventHandler = function connected(){
    console.log('Connection Sucessful');

    // Fire the data_recieved event
    eventEmitter.emit('data_recieved');
}

// Bind 'connection' event with connectEventHandler
eventEmitter.on('connection', connectEventHandler);

// Bind the 'data_recieved' event with the anonymous function
eventEmitter.on('data_recieved', function(){
    console.log('data recieved successfully.');
})

//Fire connection event.
eventEmitter.emit('connection');

console.log("Program Ended.")