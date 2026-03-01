import React from 'react';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Link } from "react-router-dom";

const BlogSection = ({ blogs }) => {
  const recentBlogs = blogs?.slice(0, 3) || [];
  if (recentBlogs.length === 0) return null;

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -right-[5%] w-96 h-96 bg-sky-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[5%] w-72 h-72 bg-blue-100 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-12 bg-sky-600 rounded-full" />
              <span className="text-sky-600 font-black uppercase tracking-[0.3em] text-xs">Expert Insights</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1]">
              Moving Made <span className=" bg-clip-text bg-gradient-to-r text-sky-600 to-blue-500">Simple.</span>
            </h2>
          </div>
          <Link to="/blog" className="group no-underline">
            <div className="flex items-center gap-4 bg-white border border-slate-200 pl-6 pr-2 py-2 rounded-full shadow-sm group-hover:shadow-md group-hover:border-sky-200 transition-all duration-300">
              <span className="text-slate-900 font-black text-xs uppercase tracking-widest">Explore All</span>
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:bg-sky-600 transition-colors">
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FEATURED CARD (LEFT) */}
          <div className="lg:col-span-7 group">
            <Link to={`/blog/${recentBlogs[0].slug}`} className="no-underline block h-full">
              <div className="relative h-full min-h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-sky-900/10 border-4 border-white transition-all duration-500 group-hover:shadow-sky-200/50">
                <img 
                  src={recentBlogs[0].image} 
                  alt={recentBlogs[0].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                />
                
                {/* ADVANCED OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                
                {/* CONTENT BOX */}
                <div className="absolute bottom-0 p-8 md:p-14 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-sky-500/30">
                    <Sparkles size={12} /> {recentBlogs[0].category}
                  </div>
                  <h4 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-sky-200 transition-colors">
                    {recentBlogs[0].title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-6 text-slate-300">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                      <Calendar size={14} className="text-sky-400"/> 
                      <span className="text-xs font-bold uppercase tracking-tighter">{new Date(recentBlogs[0].createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                      <Clock size={14} className="text-sky-400"/> 
                      <span className="text-xs font-bold uppercase tracking-tighter">{recentBlogs[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* SIDE CARDS (RIGHT) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {recentBlogs.slice(1, 3).map((blog) => (
              <Link to={`/blog/${blog.slug}`} key={blog._id} className="block group no-underline">
                <div className="bg-white/70 backdrop-blur-md p-6 rounded-[2.8rem] flex gap-6 items-center border border-white shadow-sm hover:bg-white hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-md">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" 
                    />
                  </div>
                  <div className="flex-1 pr-2">
                    <span className="text-sky-600 font-black text-[10px] uppercase tracking-[0.25em] mb-2 block">
                      {blog.category}
                    </span>
                    <h4 className="text-lg md:text-xl font-black text-slate-900 line-clamp-2 leading-tight group-hover:text-sky-600 transition-colors">
                      {blog.title}
                    </h4>
                    <div className="mt-4 w-fit bg-slate-100 group-hover:bg-sky-50 px-3 py-1 rounded-lg transition-colors">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-sky-600 italic">
                         Read Insight →
                       </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* CALL TO ACTION CARD */}
            <div className="relative mt-auto bg-slate-950 rounded-[3rem] p-10 text-white overflow-hidden shadow-2xl group/cta">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="bg-sky-500/20 text-sky-400 w-fit p-2 rounded-xl mb-4 group-hover/cta:scale-110 transition-transform">
                    <BookOpen size={24} />
                  </div>
                  <h4 className="text-2xl font-black mb-3 leading-tight">Master your move with our <span className="text-sky-400">Library</span>.</h4>
                  <p className="text-slate-400 text-sm font-medium mb-8">Dozens of guides written by relocation experts in Surat.</p>
                </div>
                <Link to="/blog" className="no-underline inline-flex items-center justify-center gap-3 bg-sky-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg shadow-sky-600/20 hover:shadow-white/20">
                  VIEW ALL POSTS <ArrowRight size={18} />
                </Link>
              </div>
              
              {/* DECORATIVE MESH */}
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none group-hover/cta:opacity-20 transition-opacity">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-sky-600/30 rounded-full blur-[60px] group-hover/cta:bg-sky-400/40 transition-colors" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSection;