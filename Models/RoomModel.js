const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomschema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomschema);
