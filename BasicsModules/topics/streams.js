//We will be learning about streams which means breaking up data into smaller parts and then doing the intended task .
// For example => Let's say we want to build a video streaming platform then instead of waiting till all of the video arrives we can send videos in smaller chunks and display those till the next chunk arrives in this way we can reduce the wait time and buffering can be minimum
// Streams are of four types=>
//Readable streams =>streams which can only be read main events are data and end main functions are pipe() it is used to plug streams together and read() to read the chunks
//Writable streams => stream which can be written or modified main events are drain and finish main functions are write() and end()
// Duplex streams => stream which can be read as well as modified  net web socket
// Transform streams => stream which are duplex but also can be transformed used mostly while compressing data zlib Gzip creation
// The first three types can only be consumed.

// samle code to understand streams better
//----------------------------------------------------------------------------------


const fs = require('fs');
const server = require('http').createServer();
//----------------------------------------------------------------------------------

//Solution 1
//One way of reading a large file but it is taking a lot of time to render
// server.on('request', (req, res) => {
//     fs.readFile('../text/test-file.txt', (err, data) => {
//         if (err) console.log(err);
//         res.end(data);
//     });
// });

//---------------------------------------------------------------------------------

//Solution 2
//Using stream to read the large file

// server.on('request', (req, res) => {
//     const readable = fs.createReadStream('../text/test-file.txt'); //We are creating a stream using this fs module function

    //This is an event listener which listen to any data event which is ready for streaming and write that chunk
//Problem with this approach is that it is reading data at a much faster rate but not sending it with that rate.
    //Back Pressure :  When response cannot send data as fast as it is receiving file
//     readable.on('data', chunk => {
//         res.write(chunk);
//     });

    //This is an event listner to detect the end of the streaming 
//     readable.on('end', () => {
//         res.end();
//     });

 //This is an event listner to detect any event which may occurr during streaming
//     readable.on('error', err => {
//         res.writeHead(500, {
//             'Content-type': 'text/html'
//         });
//         res.statusCode = 500;
//         console.log(err);
//         res.end('<h1>File Not Found!</h1>');
//     });
// });


//----------------------------------------------------------------------------------

//Solution 3

server.on('request', (req, res) => {
    const readable = fs.createReadStream('../text/test-file.txt'); //creating a readable source
    readable.pipe(res); // Plugging the readable source to a writable destination to maintain the rate using pipe() function
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000......');
})