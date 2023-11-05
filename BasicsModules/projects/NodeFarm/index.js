const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require("./replaceTemplate");


//Reading the overview template file
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
//Reading the cards template file
const templateCards = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
//Reading the products template file
const templateProducts = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
//Reading the data from the json file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const objData = JSON.parse(data);
//Using slugiy to make the url more  accurate

const slugs = objData.map(e => slugify(e.productName, { lower: true }));
console.log(slugs);


// --------------- SERVER--------------------

const server = http.createServer((req, res) => {

    // const pathName = req.url;
    const { query, pathname } = url.parse(req.url, true); //Here we are storing query and pathname using url.parse()
    // console.log(url.parse(req.url)); 

    //Overview

    if (pathname === '/' || pathname === '/overview') {

        res.writeHead(200, { 'Content-type': 'text/html' })

        const cardsHtml = objData.map(el => replaceTemplate(templateCards, el)).join('');
        //Replacing all the place holder with reading data from the json file and rendering it dynamically
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }

    //Products

    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = objData[query.id]; //catching the id from the overview page to render the respective card

        //Replacing and rendering the required data from the json folder
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