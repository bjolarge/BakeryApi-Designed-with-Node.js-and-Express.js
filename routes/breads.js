const mongoose = require('mongoose');
const { Schema } = mongoose;
const express = require('express');
//const Schema = mongoose.Schema;
const Joi = require('joi');
const { string } = require('joi');
const router = express.Router();

const breadSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength:3,
    maxlength:50
  }
});

const Bread = mongoose.model('Bread', breadSchema);

router.get('/',async(req,res)=>{
const bread = await Bread.find().sort('name');
res.send(bread);
});

router.post('/',async(req,res)=>{
   // const{error} = validateBread(req.body);
   // if(error)return res.status(400).send(error.details[0].message);

    let bread = new Bread({name:req.body.name});
    bread = await bread.save();
    res.send(bread);
});

router.put('/:id', async(req,res)=>{
//const{error} = validateBread(req.body);
//if(error)return res.status(400).send(error.details[0].message);
const bread = await Bread.findByIdAndUpdate(req.params.id, {name:req.body.name},{new:true})
if(!bread) return res.status(404).send('The Genre with the Given Id was not found');

res.send(bread);
});

router.delete('/:id',async(req,res)=>{
const bread = await Bread.findByIdAndRemove(req.params.id);
if(!bread) return res.status(404).send('The Bread loaf with the Given Id was not found');
res.send(bread);
});

router.get('/:id',async(req,res)=>{
const bread = await Bread.findById(req.params.id);
if(!bread) return res.status(404).send('The Bread loaf with the Given Id was not found');
res.send(bread);
});

// function validateBread(bread){
// const schema = Joi.object({ name: Joi.string() .min(6) .required(),
// email: Joi.string() .min(6) .required() .email(),
// password: Joi.string() .min(6) .required() });

// const validation = schema.validate(req.body);
// res.send(validation);
// }
module.exports = router;