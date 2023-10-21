const fs = require('fs');
const http = require('http');
const url = require('url');



// --------------- SERVER--------------------
const server = http.createServer((req, res) => {

    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the Overview');
    }
    else if (pathName === '/product') {
        res.end('This is the Product');
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'My-own-Header': 'Hello-World'
        });  //Using the writeHead property we can send status code along with some piece of information using various options or by creating our own headers. All this will be available in the Headers/Response Headers in the network section
        res.end('<h1>Page Not Found!</h1> ');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to requests on port 8000");
});