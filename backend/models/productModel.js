const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, default: 0, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    countInStock: {type: Number, default: 0, required: true},
    // description: {type: String, required: true},
    rating: {type: Number, default: 0, required: true},
    numReviews: {type: Number, default: 0, required: true},
}, 
{
    timestamps: true,
}
);


const Product = mongoose.model("Product", productSchema);

// mongoose.set('buffer-commands', false)
module.exports = Product;