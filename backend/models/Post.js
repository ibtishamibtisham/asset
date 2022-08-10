var mongoose = require("mongoose");

var postSchema = mongoose.Schema(
  {
    // @AssetPlus: Describe schema here
    title: { type: String },
    // desc: { type: String, required: true },
    // image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
