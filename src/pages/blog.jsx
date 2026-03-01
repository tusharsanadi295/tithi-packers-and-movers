import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
/* ================= BLOG CARD ================= */
const BlogCard = ({ blog }) => (
  <Link to={`/blog/${blog.slug}`} className="group block no-underline">
    <div className="cursor-pointer">

      <div className="relative overflow-hidden rounded-3xl mb-4 h-64 bg-slate-200">
        <div className="absolute inset-0 bg-sky-600/10 group-hover:bg-sky-600/0 transition-all duration-300 z-10" />

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 left-4 z-20">
          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-sky-600 uppercase tracking-widest shadow-sm">
            {blog.category}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
          <span>{new Date(blog.createdAt).toDateString()}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>{blog.readTime || "5 min"} read</span>
        </div>

        <h3 className="no-underline text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
          {blog.title}
        </h3>

        <p className="no-underline text-slate-500 line-clamp-2 text-sm leading-relaxed">
          {blog.description}
        </p>
      </div>

    </div>
  </Link>
);


/* ================= BLOG PAGE ================= */
export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== FETCH BLOGS FROM API ===== */
  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white min-h-screen">

      {/* ================= HERO ================= */}
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-sky-600 font-black uppercase tracking-widest text-sm mb-4">
              Moving Insights
            </h2>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1]">
              Expert advice for a{" "}
              <span className="text-sky-600">stress-free</span> move.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              From packing hacks to choosing the right insurance, we share
              everything we've learned in 10+ years of moving India.
            </p>
          </div>
        </div>
      </div>

      {/* ================= BLOG GRID ================= */}
      <div className="max-w-7xl mx-auto px-4 py-24">

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              Recent Stories
            </h2>
            <p className="text-slate-400 font-medium">
              Browse our latest packing and moving guides.
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20 font-bold text-slate-400">
            Loading blogs...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-20 font-bold text-slate-400">
            No blogs published yet.
          </div>
        )}

        {/* BLOG LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {blogs.map((blog) => (
  <BlogCard key={blog._id} blog={blog} />
))}

        </div>

      </div>

      {/* ================= CTA ================= */}
      
    </div>
  );
}
