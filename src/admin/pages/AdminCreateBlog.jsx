import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const emptyBlog = {
    title: "",
    category: "",
    description: "",
    image: "",
    content: "",
    readTime: "",
    status: "PUBLISHED",
  };

  const [blogForm, setBlogForm] = useState(emptyBlog);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api/blogs");
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  /* ================= SAVE / UPDATE ================= */
  const saveBlog = async () => {
    const token = localStorage.getItem("token");

    const url = editingBlog
      ? `http://localhost:5000/api/blogs/${editingBlog._id}`
      : "http://localhost:5000/api/blogs";

    const method = editingBlog ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogForm),
    });

    setShowModal(false);
    setEditingBlog(null);
    setBlogForm(emptyBlog);
    fetchBlogs();
  };

  /* ================= DELETE ================= */
  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-slate-800">
          Blog Management
        </h1>

        <button
          onClick={() => {
            setBlogForm(emptyBlog);
            setEditingBlog(null);
            setShowModal(true);
          }}
          className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl font-black flex items-center gap-2"
        >
          <Plus size={16} /> Add New Blog
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="grid grid-cols-6 bg-slate-100 px-4 py-3 text-xs font-black uppercase text-slate-500">
          <div>Title</div>
          <div>Category</div>
          <div>Status</div>
          <div>Date</div>
          <div>Read Time</div>
          <div>Actions</div>
        </div>

        {loading && (
          <div className="text-center py-10 font-bold text-slate-400">
            Loading blogs...
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-10 font-bold text-slate-400">
            No blogs found
          </div>
        )}

        {blogs.map((b) => (
          <div
            key={b._id}
            className="grid grid-cols-6 px-4 py-4 border-t items-center text-sm"
          >
            <div className="font-bold text-slate-800 line-clamp-1">
              {b.title}
            </div>

            <div className="text-sky-600 font-bold">
              {b.category}
            </div>

            <div>
              <span className={`px-3 py-1 rounded-full text-xs font-black
                ${b.status === "PUBLISHED"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"}
              `}>
                {b.status}
              </span>
            </div>

            <div className="text-slate-500">
              {new Date(b.createdAt).toLocaleDateString()}
            </div>

            <div className="font-bold">
              {b.readTime || "—"}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingBlog(b);
                  setBlogForm(b);
                  setShowModal(true);
                }}
                className="text-sky-600 hover:text-sky-800"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => deleteBlog(b._id)}
                className="text-rose-600 hover:text-rose-800"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
    {showModal && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl flex flex-col overflow-hidden max-h-[95vh] border border-slate-200">
      
      {/* HEADER */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-slate-100 bg-white">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            {editingBlog ? "Refine Article" : "Draft New Article"}
          </h2>
          <p className="text-sm text-slate-500">Share your moving expertise with the world.</p>
        </div>
        <button 
          onClick={() => setShowModal(false)}
          className="p-2 hover:bg-rose-50 rounded-full transition-colors text-slate-400 hover:text-rose-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      {/* BODY - SCROLLABLE */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MAIN CONTENT AREA (2/3 Width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Headline</label>
              <input
                className="w-full px-0 text-3xl font-black placeholder:text-slate-200 border-none focus:ring-0 outline-none"
                placeholder="Enter a catchy title..."
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Article Content</label>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/10 transition-all">
                 <textarea
                  className="w-full p-5 h-[400px] bg-transparent border-none focus:ring-0 outline-none font-serif text-lg leading-relaxed text-slate-700"
                  placeholder="Tell your story... (HTML tags are supported for styling)"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* SIDEBAR SETTINGS (1/3 Width) */}
          <div className="space-y-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            
            {/* IMAGE PREVIEW */}
            <div className="space-y-3">
               <label className="text-xs font-black uppercase tracking-widest text-slate-400">Cover Media</label>
               <div className="relative aspect-video rounded-2xl bg-slate-200 overflow-hidden border-2 border-dashed border-slate-300">
                  {blogForm.image ? (
                    <img src={blogForm.image} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-[10px] font-bold">No Image Linked</span>
                    </div>
                  )}
               </div>
               <input
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="Paste Image URL here..."
                value={blogForm.image}
                onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Category</label>
              <input
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-sky-500"
                placeholder="e.g. Moving Tips"
                value={blogForm.category}
                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Read Time</label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-sky-500"
                  placeholder="e.g. 5 min"
                  value={blogForm.readTime}
                  onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                />
                <svg className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Excerpt</label>
              <textarea
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-sky-500 h-24 resize-none"
                placeholder="Write a short summary for social media..."
                value={blogForm.description}
                onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-8 py-6 border-t bg-slate-50 flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
          * Ensure all images have Alt tags for SEO.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-8 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-all"
          >
            Save Draft
          </button>
          <button
            onClick={saveBlog}
            className="bg-sky-600 hover:bg-sky-700 text-white px-10 py-3 rounded-xl font-black shadow-lg shadow-sky-200 transition-all active:scale-95"
          >
            {editingBlog ? "Update & Sync" : "Launch Article"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
