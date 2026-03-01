import React from 'react';

const PolicyBlock = ({ title, children }) => (
  <div className="mb-10">
    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
      <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
      {title}
    </h3>
    <div className="text-slate-600 leading-relaxed space-y-3 pl-4 border-l border-slate-100">
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON (Optional) */}
       

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden">
          
          {/* HERO SECTION */}
          <div className="bg-sky-600 p-12 text-center">
            <h1 className="text-4xl font-sky text-white mb-4">Privacy Policy</h1>
            <p className="text-slate-400 max-w-xl mx-auto text-white">
              At Tithi Packers & Movers, we respect your privacy. This policy explains how we handle your data when you book a shift with us.
            </p>
          </div>

          <div className="p-8 sm:p-16">
            
            <PolicyBlock title="1. Information We Collect">
              <p>To provide accurate moving quotes and logistics services, we collect:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li><strong>Identity Info:</strong> Name and contact details.</li>
                <li><strong>Location Data:</strong> Pickup and drop-off addresses.</li>
                <li><strong>Inventory Details:</strong> List of items to be moved and photos (if provided).</li>
              </ul>
            </PolicyBlock>

            <PolicyBlock title="2. How We Use Your Data">
              <p>We do not sell your data to third-party telemarketers. Your information is used strictly for:</p>
              <p>• Generating invoices and moving estimates.</p>
              <p>• Coordinating with our drivers and packing teams.</p>
              <p>• Sending SMS/WhatsApp updates regarding your transit status.</p>
              <p>• Legal compliance and insurance processing.</p>
            </PolicyBlock>

            <PolicyBlock title="3. Data Security">
              <p>
                Your data is stored on secure servers. Access to your personal information is restricted to authorized employees who need the data to perform the relocation service.
              </p>
            </PolicyBlock>

            <PolicyBlock title="4. Third-Party Sharing">
              <p>
                We only share your information with third parties in the following cases:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li><strong>Insurance Companies:</strong> If you opt for transit insurance.</li>
                <li><strong>Legal Authorities:</strong> When required by law or for toll/check-post documentation.</li>
              </ul>
            </PolicyBlock>

            <PolicyBlock title="5. Your Rights">
              <p>
                You have the right to request the deletion of your contact details from our database once your move is completed and all payments are cleared. You can do this by emailing us at <strong>info@tithipackers.in</strong>.
              </p>
            </PolicyBlock>

            {/* CONTACT BOX */}
            <div className="mt-16 p-8 bg-sky-50 rounded-3xl border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-sky-900 font-black text-xl">Privacy Concerns?</h4>
                <p className="text-sky-700/70">Reach out to our Data Privacy Officer.</p>
              </div>
              <a 
                href="mailto:info@tithipackers.in" 
                className="no-underline bg-sky-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200"
              >
                Contact Privacy Team
              </a>
            </div>

            <div className="mt-12 text-center text-slate-400 text-sm font-medium">
              &copy; 2026 Tithi Packers & Movers. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;