const fs = require('fs');
const express = require('express');
const tourRouter = require('./routes/toursRoute');
const userRouter = require('./routes/usersRoute');
const app = express();


//----------------------------------------------------------------------------------

//Middleware

app.use(express.json()); //This is a middleware. It adds the data to the request body. Middleware are functions that are in the middle of the server and the client.

app.use((req, res, next) => {
    console.log("Hello from the middleware");
    next();
})

//Middleware to refactor routes properly

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//---------------------------------------------------------------------------------





//--------------------------------------------------------------------------------



//----------------------------------------------------------------------------------

//Using express to create a get request route setup and using postman to test the endpoint
// app.get('/api/v1/tours', getAllTours);
//---------------------------------------------------------------------------------

//Creating a route using which we can get a specific tour using the tour id
// app.get('/api/v1/tours/:id', getTour)
//----------------------------------------------------------------------------------

//Using express to create a post route setupp and using postman to test the endpoint
// app.post('/api/v1/tours', addNewTour);
//----------------------------------------------------------------------------------

//Creating a patch route to let users edit the data of theri tours
// app.patch('/api/v1/tours/:id', editTour);

//----------------------------------------------------------------------------------

//Creating a delete route to let users edit the data of theri tours
// app.delete('/api/v1/tours/:id', deleteTour);

//----------------------------------------------------------------------------------





//-----------------------------------------------------------------------------------

//This code is to setup the server to listen to any requests on port 3000 and then respond to the requests as directed . 
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port} .....`);
});