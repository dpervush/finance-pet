import mongoose from 'mongoose';

const Transaction = new mongoose.Schema({
    title: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    card_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true},
})

export default mongoose.model('Transaction', Transaction)
