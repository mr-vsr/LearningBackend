const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./replaceTemplate');



const templateOverview= fs.readFileSync(`${__dirname}/../templates/template-overview.html`, 'utf-8');
const templateCards = fs.readFileSync(`${__dirname}/../templates/template-card.html`, 'utf-8');
const templateProducts = fs.readFileSync(`${__dirname}/../templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/../dev-data/data.json`, 'utf-8');
const objData = JSON.parse(data);



// --------------- SERVER--------------------
const server = http.createServer((req, res) => {

    // const pathName = req.url;
   const { query, pathname } = url.parse(req.url, true);
    // console.log(url.parse(req.url)); 

    //Overview

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        
        const cardsHtml = objData.map(el => replaceTemplate(templateCards, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }

    //Products
    
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = objData[query.id];
        const output = replaceTemplate(templateProducts, product);
        // console.log(query);
         
        res.end(output);
    }
    
        
        //Not Found

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