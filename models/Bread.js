const mongoose = require("mongoose");

const BreadSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["سنگک", "بربری", "تافتون"],
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("breads", BreadSchema);
