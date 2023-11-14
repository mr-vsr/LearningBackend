const express = require('express')

const router = express.Router();

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'User route not defined'
    });
}
const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'User route not defined'
    });
}
const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'User route not defined'
    });
}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'User route not defined'
    });
}
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'User route not defined'
    });
}


router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
