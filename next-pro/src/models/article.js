// ✅ models/article.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    tags: [String],
    featuredImage: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    slug: { type: String, unique: true },
    viewCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

articleSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^ء-ي\w\s]/gi, "")
      .replace(/\s+/g, "-");
  }
  next();
});

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
