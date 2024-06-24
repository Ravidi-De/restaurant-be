import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const restaurantModel = mongoose.model("Restaurant", restaurantSchema);
export { restaurantModel as Restaurant };
