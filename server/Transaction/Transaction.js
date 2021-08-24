import mongoose from "mongoose";

const Transaction = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: {
    title: { type: String, required: true },
    budget: { type: Number },
  },
  card: {
    name: { type: String, required: true },
    color: { type: String, required: true },
    currency: { type: String, default: "RUB" },
    balance: { type: Number, default: 0 },
  },
});

export default mongoose.model("Transaction", Transaction);
