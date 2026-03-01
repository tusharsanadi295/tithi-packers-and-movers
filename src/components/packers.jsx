            import React, { useState } from "react";
            import { 
            Package, ShieldCheck, Droplets, Shirt, 
            Armchair, Monitor, Star, CheckCircle2, ArrowRight ,Truck
            } from "lucide-react";

            const PACKING_CATEGORIES = [
            {
                id: "household",
                title: "Household",
                icon: <Package className="w-6 h-6" />,
                price: 1499,
                description: "Daily use items & kitchen essentials.",
                includes: ["Kitchen items", "Clothes", "Books", "Basic wrapping"]
            },
            {
                id: "fragile",
                title: "Fragile",
                icon: <ShieldCheck className="w-6 h-6" />,
                price: 799,
                description: "Double protection for delicate items.",
                includes: ["Glassware", "Crockery", "Mirrors", "Bubble Wrap"]
            },
            {
                id: "liquid",
                title: "Leak-Proof",
                icon: <Droplets className="w-6 h-6" />,
                price: 499,
                description: "Secure sealing for liquid items.",
                includes: ["Oil bottles", "Sauces", "Cleaning liquids", "Plastic Lining"]
            },
            {
                id: "fabric",
                title: "Vacuum/Fabric",
                icon: <Shirt className="w-6 h-6" />,
                price: 699,
                description: "Soft goods & volume reduction.",
                includes: ["Curtains", "Blankets", "Vacuum Bags"]
            },
            {
                id: "furniture",
                title: "Furniture",
                icon: <Armchair className="w-6 h-6" />,
                price: 999,
                description: "Large furniture safety gear.",
                includes: ["Bed wrapping", "Wardrobes", "Corner guards"]
            },
            {
                id: "electronics",
                title: "Electronics",
                icon: <Monitor className="w-6 h-6" />,
                price: 899,
                description: "Anti-shock tech protection.",
                includes: ["TV packing", "Laptops", "Screen safety foam"]
            },
            {
                id: "special",
                title: "Premium",
                icon: <Star className="w-6 h-6" />,
                price: 1299,
                description: "High-value specialty items.",
                includes: ["Instruments", "Gym Gear", "Antiques"]
            },
            { id: "vehicle", title: "Vehicle Transit", icon: <Truck />, price: 2499, description: "Specialized bike & car protection.", includes: ["Scratch-proof wrap", "Mirror foam", "Secure tie-down"] },
            ];

            export default function CategorizedPacking() {
            const [selected, setSelected] = useState([]);

            const toggleCategory = (id) => {
                setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
            };

            const totalPrice = PACKING_CATEGORIES
                .filter((cat) => selected.includes(cat.id))
                .reduce((sum, cat) => sum + cat.price, 0);

            return (
                <section className="min-h-screen bg-[#F8FAFC] py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 mb-4">
                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-sky-700">Tithi Premium Packing</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Protection <span className="text-sky-600">Categories</span>
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
                        Customize your safety plan. Select the categories that match your inventory for a damage-free moving experience.
                    </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {PACKING_CATEGORIES.map((cat) => {
                        const isSelected = selected.includes(cat.id);

                        return (
                        <div
                            key={cat.id}
                            onClick={() => toggleCategory(cat.id)}
                            className={`group relative bg-white rounded-[2rem] p-6 cursor-pointer transition-all duration-300 border-2
                            ${isSelected 
                                ? "border-sky-500 shadow-xl shadow-sky-100 scale-[1.02]" 
                                : "border-slate-100 hover:border-sky-200 hover:shadow-lg"
                            }`}
                        >
                            {/* Header: Icon & Selection */}
                            <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-2xl transition-colors duration-300 ${isSelected ? 'bg-sky-500 text-white' : 'bg-slate-50 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600'}`}>
                                {cat.icon}
                            </div>
                            {isSelected && (
                                <div className="bg-sky-500 text-white rounded-full p-1 animate-in zoom-in duration-300">
                                <CheckCircle2 className="w-5 h-5" />
                                </div>
                            )}
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-1">{cat.title}</h3>
                            <div className="flex items-baseline gap-1 mb-3">
                            <span className="text-2xl font-black text-slate-900">₹{cat.price}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">/ Category</span>
                            </div>
                            
                            <p className="text-xs text-slate-500 leading-relaxed mb-6 h-8 line-clamp-2">
                            {cat.description}
                            </p>

                            {/* Features (Mini List) */}
                            <div className="space-y-2 mb-6">
                            {cat.includes.slice(0, 3).map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                                <div className="w-1 h-1 rounded-full bg-sky-400"></div>
                                {item}
                                </div>
                            ))}
                            </div>

                            <button className={`w-full py-3 rounded-xl text-xs font-bold transition-all
                            ${isSelected ? "bg-sky-600 text-white" : "bg-slate-50 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-700"}`}
                            >
                            {isSelected ? "Selected" : "Add to Plan"}
                            </button>
                        </div>
                        );
                    })}
                    </div>

                    {/* Floating Checkout Bar */}
                    {selected.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl z-50">
                        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 md:p-5 flex justify-between items-center shadow-2xl border border-white/10">
                        <div className="flex items-center gap-4 md:gap-8">
                            <div className="hidden md:block">
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Selection</p>
                            <p className="text-white font-bold">{selected.length} Categories</p>
                            </div>
                            <div className="h-8 w-[1px] bg-slate-700 hidden md:block"></div>
                            <div>
                            <p className="text-[10px] uppercase font-bold text-sky-400 tracking-widest">Estimated Total</p>
                            <p className="text-xl md:text-2xl font-black text-white">₹{totalPrice.toLocaleString()}</p>
                            </div>
                        </div>

                        <button className="bg-sky-500 hover:bg-sky-400 text-white px-6 md:px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 text-sm">
                            Proceed <ArrowRight className="w-4 h-4" />
                        </button>
                        </div>
                    </div>
                    )}
                </div>
                </section>
            );
            }