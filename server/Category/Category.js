import mongoose from 'mongoose';

const Category = new mongoose.Schema({
    title: {type: String, required: true},
    color: {type: String,required: true},
    budget: {type: Number},
})

export default mongoose.model('Category', Category)
