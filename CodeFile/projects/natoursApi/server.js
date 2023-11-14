const app = require('./app');


//This code is to setup the server to listen to any requests on port 3000 and then respond to the requests as directed .

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port} .....`);
});