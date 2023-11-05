const fs = require('fs');
const http = require('http');
const url = require('url');


// We're using the synchronous approach beacause this will get executed only once and hence will not block the execution of below codes as the server is the one with callbacks

const data = fs.readFileSync(`${__dirname}/../dev-data/data.json`, 'utf-8');
const objData = JSON.parse(data); 


// --------------- SERVER--------------------
const server = http.createServer((req, res) => {

    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the Overview');
    }
    else if (pathName === '/product') {
        res.end('This is the Product');
    }
    else if (pathName === '/api') {
        
        // This is inefficient method of  reading and sending data to the server because each time someone  requests this route  it's reading the file again and again

        // fs.readFile(`${__dirname}/../dev-data/data.json`, 'utf-8', (err, data) => {
        //     const productData = JSON.parse(data);
        //     res.writeHead(200, {
        //         'Content-type': 'application/json'
        //     });
        //     res.end(data);
        // });

            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(data);

    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });  
        res.end('<h1>Page Not Found!</h1> ');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to requests on port 8000");
});