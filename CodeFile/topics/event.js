//This file is demonstrating the use of event listners and emitters to do various tasks
//If we have multiple event listners for a same event all of them work in synchronous one after the other

const EventEmitter = require("events");
const http = require('http');

//Using class to create a new  EventEmitter everytime we create an object of  Sale class
// class Sale extends EventEmitter{
//     constructor() {
//         super();
//     }
// }
// const myEmitter = new Sales();

// myEmitter.on('newSale', () => {
//     console.log("There was a new sale!");
// });

// myEmitter.on('newSale', () => {
//     console.log("Customer Name: Vikas");
// });

// myEmitter.on('newSale', stock => {
//     console.log(`There are ${stock} items left in stock`);
// });

// myEmitter.emit("newSale", 9); //This is actually emitting the event or making it look like new sale is being done

//----------------------------------------------------------------------------------

//Creating server using event loop and http module

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request receieved');
    res.end("Here is the response from the server");
});
server.on('request', (req, res) => {
    console.log('Another Request receieved');
});
server.on('close', (req, res) => {
    console.log("Server closed");
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Waiting for requests.......");
});

