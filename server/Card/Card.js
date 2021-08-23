import mongoose from "mongoose";

const Card = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  number: { type: String },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: "RUB" },
  total: { type: Boolean, default: true },
});

export default mongoose.model("Card", Card);
