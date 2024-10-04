const mongoose = require('mongoose')
const { Schema } = mongoose;
const ProductSchema = new Schema({
    category: {type:String, required: true},
    name: {type:String, required: true},
    description: {type:String, required: true},
    img: {type:String, required: true}, 
    options:{type:  Array}
});
module.exports = mongoose.model('product', ProductSchema)