import React from 'react';

const HelpCard = ({ icon, title, description, linkText, href }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/5 transition-all group">
    <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 mb-6 leading-relaxed">
      {description}
    </p>
    <a href={href} className="text-sky-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
      {linkText} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
    </a>
  </div>
);

const HelpCenter = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* HERO SEARCH SECTION */}
      <div className="bg-slate-900 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">How can we help you?</h1>
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Search for moving tips, tracking, or policies..." 
            className="w-full px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:bg-white focus:text-slate-900 focus:outline-none focus:ring-4 focus:ring-sky-500/20 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-sky-600 p-2 rounded-xl text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <span className="text-slate-400">Popular:</span>
          <button className="text-sky-400 hover:underline">Track Order</button>
          <button className="text-sky-400 hover:underline">Damage Policy</button>
          <button className="text-sky-400 hover:underline">Pricing</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <HelpCard 
            title="Moving Guides"
            description="Tips on how to pack fragile items, prepare for move day, and checklist for new homeowners."
            linkText="Read Guides"
            href="/blog"
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>}
          />

          <HelpCard 
            title="Policy & Safety"
            description="Detailed information about our terms of service, insurance coverage, and privacy."
            linkText="View Policies"
            href="/terms"
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
          />

          <HelpCard 
            title="Pricing & Billing"
            description="Questions about hidden charges, GST, toll taxes, and how to pay your invoice."
            linkText="See Pricing FAQ"
            href="/faq"
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />

        </div>

        {/* DIRECT SUPPORT SECTION */}
        <div className="mt-20">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-sm border border-slate-100">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Can't find what you're looking for?</h2>
              <p className="text-slate-500 text-lg mb-8 italic">"Hamari team hamesha aapki madad ke liye taiyar hai."</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.893-1.997 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.319 1.592 5.548 0 10.061-4.512 10.064-10.062 0-2.696-1.048-5.232-2.956-7.141-1.908-1.913-4.443-2.96-7.141-2.96-5.545 0-10.06 4.514-10.064 10.064-.001 2.12.573 4.102 1.664 5.896l-1.081 3.951 4.115-1.08zm11.724-7.51c-.244-.122-1.44-.711-1.664-.792-.224-.082-.387-.122-.55.122-.163.245-.632.792-.774.954-.142.163-.284.183-.528.061-.244-.122-1.028-.379-1.958-1.208-.724-.647-1.213-1.446-1.355-1.69-.142-.245-.015-.377.107-.499.11-.11.244-.285.366-.427.122-.142.163-.245.244-.408.082-.163.041-.306-.02-.428-.061-.122-.55-1.325-.754-1.815-.198-.479-.4-.414-.55-.421-.142-.007-.306-.008-.469-.008-.163 0-.427.061-.651.306-.224.245-.855.835-.855 2.036 0 1.2.875 2.361 1.157 2.738.281.376 1.723 2.631 4.171 3.693.583.252 1.036.403 1.391.516.585.186 1.119.16 1.541.098.471-.069 1.44-.588 1.643-1.157.204-.57.204-1.059.143-1.157-.06-.101-.223-.162-.468-.284z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Fast Response</p>
                    <p className="text-xl font-black text-slate-800">+91 8160081145</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full flex flex-col gap-4">
              <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all">
                Chat on WhatsApp
              </button>
              <button className="w-full bg-sky-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-sky-200 hover:bg-sky-700 transition-all">
                Send an Email
              </button>
              <button className="w-full border-2 border-slate-200 text-slate-600 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">
                Request a Callback
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpCenter;