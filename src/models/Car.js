const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carModel: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  images: [{ type: Object }],
});

module.exports = mongoose.model("Car", carSchema);
