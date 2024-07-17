const express = require('express');
const router = express.Router();
const { getItem, updateItem, deleteItem, getData, postData } = require('./itemController');

// Define routes
router.get('/items', getData);
router.post('/items', postData);
router.get('/items/:id', getItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;
