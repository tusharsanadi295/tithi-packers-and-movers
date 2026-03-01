import { useParams, useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center">Not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* 1. DESKTOP/MOBILE HEADER (Clean & Minimal) */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20 text-center lg:text-left">
           <button 
             onClick={() => navigate('/blog')}
             className="hidden lg:flex items-center gap-2 text-sky-600 font-bold mb-6 hover:translate-x-[-5px] transition-transform"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
             Back to Blog
           </button>
           
           <span className="inline-block bg-sky-100 text-sky-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
             {blog.category}
           </span>
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight max-w-4xl">
             {blog.title}
           </h1>
           
           <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-slate-500">
             <img src="https://ui-avatars.com/api/?name=Tithi+Packers" className="w-10 h-10 rounded-full" />
             <div className="text-left text-sm">
               <p className="font-bold text-slate-900">By Tithi Experts</p>
               <p>{new Date(blog.createdAt).toDateString()} • {blog.readTime || '5 min'} read</p>
             </div>
           </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT (Grid for Desktop) */}
      <div className="max-w-7xl mx-auto px-4 mt-8 lg:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: MAIN CONTENT (8 Units) */}
          <article className="lg:col-span-8 bg-white rounded-[2rem] p-6 md:p-12 shadow-sm border border-slate-100">
            <div className="rounded-2xl overflow-hidden mb-10 h-64 md:h-[450px]">
              <img src={blog.image} className="w-full h-full object-cover" alt={blog.title} />
            </div>

            <div 
              className="prose prose-lg md:prose-xl max-w-none 
              prose-headings:text-slate-900 prose-headings:font-black
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-strong:text-sky-600 prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* RIGHT COLUMN: SIDEBAR (4 Units - Hidden on Mobile) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-8">
            
            {/* STICKY SIDEBAR BOX */}
            <div className="sticky top-8 space-y-8">
              
              {/* CALL TO ACTION BOX */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 leading-tight">Moving to a new home soon?</h3>
                  <p className="text-slate-400 mb-6 text-sm">
                    Get an instant price estimate from Tithi Packers and Movers.
                  </p>
                  <Link 
              to="/booking" 
              className="w-full bg-sky-600 hover:bg-sky-500 py-4 rounded-xl font-black transition-all shadow-lg shadow-sky-600/30"
            >
              GET FREE QUOTE
            </Link>
                  
                  <a href="tel:+918160081145" className="block text-center mt-4 text-xs font-bold text-slate-400 hover:text-white transition-colors">
                    Or Call: +91 8160081145
                  </a>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-600/20 rounded-full blur-3xl"></div>
              </div>

              {/* NEWSLETTER/SUBSCRIBE */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100">
                <h4 className="font-black text-slate-900 mb-2">Subscribe to our newsletter</h4>
                <p className="text-slate-500 text-sm mb-4">Get the latest packing hacks and moving checklists directly in your inbox.</p>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl mb-3 outline-none focus:border-sky-500"
                />
                <button className="w-full border-2 border-slate-900 py-3 rounded-xl font-black hover:bg-slate-900 hover:text-white transition-all">
                  Join Now
                </button>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}