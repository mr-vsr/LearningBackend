const express = require('express');
const tourController = require('../controllers/toursController');

const router = express.Router();




//Using this we can refactor our routes  to make all the routes of similar types chained together

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.addNewTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.editTour)
    .delete(tourController.deleteTour);


module.exports = router;