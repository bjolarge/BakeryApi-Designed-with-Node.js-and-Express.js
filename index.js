const mongoose = require('mongoose');
const Joi = require('joi');
const breads = require('./routes/breads');
const express = require('express');
const app = express();

// Fill line 8 up with your connection parameter
mongoose.connect('mongodb://localhost/vidbuns')
.then(()=>console.log('Connecting'))
.catch(err=>console.error('Currently not Loading'));

app.use(express.json());
app.use('/api/breads', breads);

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}..`));