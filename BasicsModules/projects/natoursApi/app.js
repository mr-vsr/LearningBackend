const fs = require('fs');
const express = require('express');
const app = express();


//----------------------------------------------------------------------------------


app.use(express.json()); //This is a middleware. It adds the data to the request body. Middleware are functions that are in the middle of the server and the client.

//---------------------------------------------------------------------------------

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)); //reading the file containing the data using fs module and  the  converting it into json type

//----------------------------------------------------------------------------------

//Using express to create a get request route setup and using postman to test the endpoint
app.get('/api/v1/tours', (req, res) => {
    //The format in which we are sending our data is known as JSend 
    //By default the status code is 200 but we can specify it anyways
    res.status(200).json({
        status: 'success',
        data: {
            tours //here we are not required to write the key value pairs because the name of both the key and value are same therefore we can write once and it will understand
        }
    })
});
//---------------------------------------------------------------------------------

//Creating a route using which we can get a specific tour using the tour id
app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1; //we're using this to convert the string which we're getting in id in req params to integer
    //Base on the id let's fetch the tour
    const tour = tours.find(el => el.id === id); //This find function use a callback function that loops throughtout the array and finds any tour with the specified tour id and returns a response
    
    //if(id>tours.id)
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "invalid Tour id"
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    });
})
//----------------------------------------------------------------------------------

//Using express to create a post route setupp and using postman to test the endpoint
app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;//Assigning ids to the new tours added to our database. Here we're doing it manually because we'rnt using any database ,in case of database ids are automatically generated.
    const newTour = Object.assign({ id: newId }, req.body); //Here we are making the new tours that we have created in object form
    tours.push(newTour);//Now we're pushing the newly created tours into the original tours array.
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        }); //This is the response users will be getting once we create a new tour.
    });//This is the code where we write the data into our database in this case a file where we're storing all the data. Also we are converting the json data into string type using stringfy method.
    // res.send('done');
});
//----------------------------------------------------------------------------------

//Creating a patch route to let users edit the data of theri tours
app.patch('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Id does'nt exist"
        });
    }
    res.status(200).json({
        status: "successs",
        data: "<updated tour data here...>"
    });
});

//----------------------------------------------------------------------------------

//Creating a delete route to let users edit the data of theri tours
app.delete('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Id does'nt exist"
        });
    }
    res.status(204).json({
        status: "successs",
        data: null
    });
});

//----------------------------------------------------------------------------------


//This code is to setup the server to listen to any requests on port 3000 and then respond to the requests as directed . 
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port} .....`);
});