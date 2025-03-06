import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  qty: number;
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
