import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: String, required: true },
    description: String,
    content: String,        // full article (HTML / markdown)
    image: String,          // cover image URL
    readTime: String,
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
