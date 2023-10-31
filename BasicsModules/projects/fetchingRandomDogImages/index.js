const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/../../text/dog.txt`, 'utf-8', (err, data) => {
// console.log(`Breed : ${data}`);

//using superagent to fetch some data from an api 
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
//         if (err) return console.log(err.message);

// console.log(res.body.message);
//         fs.writeFile("../../text/dog-image.txt", res.body.message, err => {
//             if (err) return console.log(err.message);
//             console.log(`Random dog image from breed ${data} saved`);
//         })
//     });
// });

//This type of  asynchronous code where callback inside callback inside callback type coding is done is known as callback hell and needs to be avoided and therefore we use async await to prevent call back hell.

//----------------------------------------------------------------------------------
//Let's learn to consume a promise using then() and catch() methods

//.then method consumes a fullfilled promise and has no mechanism to know any error or rejected promises that is  why we use .catch() method after the then method to handle the error (rejected promises are handled by catch()).
//The starting state of a promise is pending promise in which it tries to do the assigned task in background and let's know when completed
//When a promise is fullfilled then that state is known as resolved state.

// fs.readFile(`${__dirname}/../../text/dog.txt`, 'utf-8', (err, data) => {
//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .then(res => {
//             // console.log(res.body.message);
//             fs.writeFile("../../text/dog-image.txt", res.body.message, err => {
//                 if (err) return console.log(err.message);
//                 console.log(`Random dog image from breed ${data} saved`);
//             });
//         })
//         .catch(err => {
//             console.log(err.message);
//         });
// });

//----------------------------------------------------------------------------------

//creating a promise


//A function that returns a promise
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject("Couldn't find that file");
            resolve(data);
        });
    })
}

//Another function that returns a promise
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject("Couldn't write the data");
            resolve("Successfull");
        });
    });
}

//Chaining all the three promises together

readFilePro(`${__dirname} /../../ text / dog.txt`) // Returns a promise so we can use the .then( ) method on it
    //This is the first promise which is returned by the readFilePro method and using that data we are calling the api using superagent modulue.
    .then(data => {
        console.log(`Breed : ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // Returns a promise.
    })
    //This is the second promise returned by the .get() method which on resolving the promise returns a random dog image
    .then(res => {
        console.log(res.body.message);
        writeFilePro("../../text/dog-image.txt", res.body.message);//Returns a promise therefore .then() method can be used.
    })
    //This is the third promise which is returned by the writeFilePro method which on resolving successfully doesn't return any data as such 
    .then(() => {
        console.log("Random dog image saved!");
    }) //No promise is returned here marking the end of the promise chain

    //A single catch method can be used to handle all the errors present at different levels.
    .catch(err => {
        console.log(err);
    });

//----------------------------------------------------------------------------------
//Using async await to create and resolve promises
