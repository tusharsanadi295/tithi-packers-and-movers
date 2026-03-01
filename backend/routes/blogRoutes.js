import express from "express";
import Blog from "../models/blog.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ADMIN – CREATE BLOG */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      slug: req.body.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ADMIN – UPDATE BLOG */
router.put("/:id", authMiddleware, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
});

/* ADMIN – DELETE */
router.delete("/:id", authMiddleware, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* PUBLIC – GET ALL PUBLISHED BLOGS */
router.get("/", async (req, res) => {
  const blogs = await Blog.find({ status: "PUBLISHED" }).sort({ createdAt: -1 });
  res.json(blogs);
});

/* PUBLIC – SINGLE BLOG */
router.get("/:slug", async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  res.json(blog);
});

router.get("/:slug", async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  if (!blog) {
    return res.status(404).json(null);
  }

  res.json(blog);
});


export default router;
