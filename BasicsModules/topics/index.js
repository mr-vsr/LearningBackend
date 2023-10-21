const fs = require('fs');
const http = require('http');

// -----Synchronous JavaScript---------------------------------------------

const textIn = fs.readFileSync('./text/input.text', 'utf-8');
console.log(textIn);

// const textOut = `This is what we know about avocado ${textIn}.\nCreated on  ${Date.now()}`;

// fs.writeFileSync('./text/output.text', textOut);

// console.log("File Written!");


// --------Asynchronours JavaScript----------------------------------------

// fs.readFile('./text/start.text', 'utf-8', (err, data1) => {

//     // Error handling
//     if (err) return console.log('ERROR! 💥');

    //Reading a file which is written in data1

//     fs.readFile(`./text/${data1}.text`, 'utf-8', (err, data2) => {
//         console.log(data2);

//         //Reading a file name append in stored text
//         fs.readFile(`./text/append.text`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             // writting a file in final file which will be created in text folder

//             fs.writeFile('./text/final.text', `${data2}\n${data3}`, 'utf-8', err => {

//                 console.log("Your file have been written!");

//             })
//         });
//     });
// });
// console.log("Will read file!");

// ---------------SERVER--------------------

const server = http.createServer((req, res )=> {
    res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to requests on port 8000");
});




