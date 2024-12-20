const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: { type: String },
  description: { type: String },
  tags: { type: String },
  post: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  author: { type: String },
  state: { type: String, enum: ["draft", "published"], default: "draft" },
  read_count: { type: Number, default: 0 },
  reading_time: { type: String },
}, { timestamps: true });

module.exports = model("Post", postSchema);
