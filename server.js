const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs


// const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const apiRoutes = require('./api');
app.use('/api', apiRoutes);

// mongoose.connect('mongodb://localhost:27017/node-api-mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err));
