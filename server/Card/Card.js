import mongoose from 'mongoose';

const Card = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    number: {type: String},
    balance: {type: Number}
})

export default mongoose.model('Card', Card)
