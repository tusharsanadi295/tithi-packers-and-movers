import React from 'react';

const TermSection = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
      <span className="w-1.5 h-6 bg-sky-600 rounded-full"></span>
      {title}
    </h2>
    <div className="text-slate-600 leading-relaxed space-y-2 ml-4">
      {children}
    </div>
  </section>
);

const TermsAndConditions = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-sky-600 p-10 text-center text-white">
          <h1 className="text-3xl font-black mb-2">Terms & Conditions</h1>
          <p className="opacity-90 font-medium">Last Updated: January 2026</p>
        </div>

        <div className="p-8 sm:p-12">
          <p className="text-slate-500 italic mb-10 border-l-4 border-slate-200 pl-4">
            Please read these terms carefully before booking our services. By hiring Tithi Packers & Movers, you agree to be bound by the following policies.
          </p>

          {/* 1. Payment Terms */}
          <TermSection title="Payment Policy">
            <p>• A minimum booking amount of 20% is required to confirm the shifting date.</p>
            <p>• 50% of the total estimate must be paid after packing is completed at the source.</p>
            <p>• The remaining balance must be cleared before the unloading process starts at the destination.</p>
            <p>• We accept Cash, UPI, and Bank Transfers. Cheques are not accepted on the day of moving.</p>
          </TermSection>

          {/* 2. Hidden Charges */}
          <TermSection title="Tolls, Taxes & Extra Charges">
            <p>• Quoted prices exclude GST (18%), Toll Taxes, Octroi, and Green Tax unless mentioned in the quote.</p>
            <p>• Extra charges apply for using stairs above the 2nd floor if a service lift is not available or not working.</p>
            <p>• Long carry charges apply if the truck cannot reach within 50 feet of the house entrance.</p>
          </TermSection>

          {/* 3. Restricted Items */}
          <TermSection title="Excluded & Restricted Items">
            <p>• <strong>Valuables:</strong> Jewelry, Cash, Original Documents, and Watches must be carried by the customer. Tithi Packers will not be responsible for these.</p>
            <p>• <strong>Hazardous Goods:</strong> We do not transport Gas Cylinders, Petrol, Kerosene, Acids, or Crackers.</p>
            <p>• <strong>Perishables:</strong> We are not responsible for the death of plants or the spoilage of food items during transit.</p>
          </TermSection>

          {/* 4. Claims & Damages */}
          <TermSection title="Claims & Liability">
            <p>• Any damage must be reported in writing to the supervisor at the time of unloading.</p>
            <p>• Claims for internal damage to electronic items (TVs, Fridges) will not be entertained unless there is visible external damage to the packing.</p>
            <p>• Our liability for any damaged item is limited to the declared value of that specific item only.</p>
          </TermSection>

          {/* 5. Rescheduling & Cancellation */}
          <TermSection title="Cancellation Policy">
            <p>• Cancellation made 48 hours before the move: 100% refund of booking amount.</p>
            <p>• Cancellation made 24 hours before the move: 50% refund.</p>
            <p>• Same-day cancellation: No refund of the booking amount.</p>
          </TermSection>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-sm">
              Tithi Packers & Movers reserves the right to refuse service to anyone for any reason at any time.
            </p>
            <button 
              onClick={() => window.print()}
              className="mt-6 px-6 py-2 border-2 border-sky-600 text-sky-600 font-bold rounded-lg hover:bg-sky-50 transition-colors"
            >
              Print Terms
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;