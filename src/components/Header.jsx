import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { 
  Phone, 
  MessageCircle, 
  Package, 
  Truck, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  LogIn,
  UserPlus,
  ArrowRight
} from "lucide-react";
import logo from "../assets/logo-removebg-preview.png";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
const lastScrollY = useRef(0);


   const hideOnRoute = [
    "/admin/orders",
    "/admin/dashboard",
    "/admin/schedule",
    "/admin/invoice",
    "/AdminInvoice",
    "/admin/CreateBlog",
    "/calc",
    "/AddItems"
  ];

  

  const hideOnRoutes = ["/booking", "/PackersMoverBooking", "/packermover","/AdminBookings",""];
  useEffect(() => {
  const handleScrollDirection = () => {
    const currentScrollY = window.scrollY;

    // Scroll UP → Show header
    if (currentScrollY < lastScrollY.current) {
      setShowHeader(true);
    }
    // Scroll DOWN → Hide header (thoda scroll ke baad)
    else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
      setShowHeader(false);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScrollDirection);
  return () => window.removeEventListener("scroll", handleScrollDirection);
}, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (hideOnRoute.includes(location.pathname)) {
    return null;
  }
  return (
    <>
      {/* ================= MAIN HEADER ================= */}
      <header
  className={`fixed top-0 left-0 w-full z-[100] border-b transition-all duration-300 ease-in-out
    ${showHeader ? "translate-y-0" : "-translate-y-full"}
    ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-white py-3 border-transparent"}
  `}
>

        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo & Bold Name Section */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="flex flex-col">
              {/* Exact Font Style as per your request */}
              <span className="text-xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-none uppercase">
                Tithi Packers <span className="text-sky-600">And Movers</span>
              </span>
              <span className="text-[10px] md:text-[12px] font-bold text-slate-500 uppercase tracking-tight mt-1">
                Packing Se Unpacking Tak
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
  {["Home", "Services", "About", "ContactUs"].map((item) => (
    <NavLink
      key={item}
      // Check for Home and ContactUs specifically
      to={
        item === "Home" 
          ? "/" 
          : item === "ContactUs" 
            ? "/contact" 
            : `/${item.toLowerCase()}`
            
      }
      className={({ isActive }) => `
        text-[14px] font-bold uppercase no-underline transition-all relative
        ${isActive 
          ? "text-sky-600 after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-sky-600" 
          : "text-slate-600 hover:text-sky-500"}
      `}
    >
      {/* Display name handle (optional: if you want a space like "Contact Us") */}
      {item === "ContactUs" ? "Contact Us" : item}
    </NavLink>
  ))}
</nav>

          {/* Action Buttons & Profile */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:8160081145" 
              className="hidden xl:flex items-center gap-2 bg-slate-100 text-slate-800 px-5 py-2.5 rounded-full font-bold text-xs no-underline hover:bg-slate-200 transition active:scale-95"
            >
              <Phone size={14} className="text-sky-600 fill-sky-600" /> CALL NOW
            </a>

            <Link 
              to="/getquote" 
              className="hidden md:flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-full font-bold text-xs no-underline hover:bg-sky-700 shadow-lg shadow-sky-100 transition active:scale-95"
            >
              GET FREE QUOTE
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 p-2.5 bg-slate-100 rounded-full text-slate-700 hover:bg-sky-100 transition-all active:scale-90"
              >
                <User size={20} />
                <ChevronDown size={14} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute right-0 mt-4 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden origin-top-right transition-all duration-300 ${
                isProfileOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
              }`}>
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Welcome Guest</p>
                </div>
                <Link to="/Login" className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-slate-700 hover:bg-sky-50 no-underline border-b border-slate-50 transition">
                  <LogIn size={18} className="text-sky-600" />Customer Login
                </Link>
                <Link to="/AdminLogin" className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-slate-700 hover:bg-sky-50 no-underline border-b border-slate-50 transition">
                  <LogIn size={18} className="text-sky-600" />Admin Login 
                </Link>
                
                
              </div>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-1.5 text-slate-900 bg-slate-50 rounded-lg">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
   <div className={`fixed inset-0 z-[110] bg-white transition-all duration-500 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
  <div className="p-8 pt-10 flex flex-col h-full relative">
    
    {/* CLOSE BUTTON (X Icon) */}
    <div className="flex justify-between items-center mb-10">
      {/* Brand Name on top in menu */}
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none uppercase">
          Tithi Packers <span className="text-sky-600">And Movers</span>
        </span>
        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-tight">
          Packing Se Unpacking Tak
        </span>
      </div>
      
      {/* The Close Button Icon */}
      <button 
        onClick={() => setIsMenuOpen(false)} 
        className="p-3 bg-slate-50 rounded-full text-slate-900 active:scale-90 transition-all border border-slate-100"
      >
        <X size={28} strokeWidth={2.5} />
      </button>
    </div>

    {/* MENU LINKS */}
    <div className="flex flex-col gap-6">
      {["Home", "Services", "Track", "About", "Contact"].map((item) => (
        <Link 
          key={item} 
          to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
          onClick={() => setIsMenuOpen(false)} 
          className="text-3xl font-extrabold text-slate-900 no-underline flex justify-between items-center tracking-tight hover:text-sky-600 transition-colors active:translate-x-2 transition-transform"
        >
          {item} <ArrowRight size={24} className="text-sky-600" />
        </Link>
      ))}
    </div>
    
    {/* BOTTOM ACTIONS */}
    <div className="mt-auto mb-10 flex flex-col gap-4">
      <a 
        href="tel:8160081145" 
        className="flex items-center justify-center gap-2 py-4 bg-slate-100 rounded-2xl font-bold text-slate-800 no-underline active:scale-95 transition-all"
      >
        <Phone size={20} className="text-sky-600" /> CALL SUPPORT
      </a>
      <Link 
        to="/booking" 
        onClick={() => setIsMenuOpen(false)} 
        className="bg-sky-600 text-white text-center py-4 rounded-2xl font-extrabold no-underline shadow-xl shadow-sky-100 text-lg active:scale-95 transition-all"
      >
        GET A FREE QUOTE
      </Link>
    </div>
  </div>
</div>

      {/* Adjusting Spacer for the bigger header */}
      <div className="h-20 md:h-24" />

      {/* ================= ANIMATED LIGHT MOBILE STICKY BAR ================= */}
    {/* ================= CLEAN PROFESSIONAL MOBILE DOCK ================= */}
{!hideOnRoutes.includes(location.pathname) && (
  <div className={`fixed bottom-6 left-0 right-0 z-[110] md:hidden px-6 transition-all duration-500 ease-in-out
  }`}>
    <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl flex items-center justify-between px-4 py-3">
      
      {/* Home/Track */}
      <Link to="/" className="flex flex-col items-center flex-1 no-underline group">
        <div className={`p-2 rounded-xl transition-colors ${location.pathname === '/' ? 'text-sky-600' : 'text-slate-400'}`}>
          <Truck size={22} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
        </div>
        <span className={`text-[10px] font-semibold ${location.pathname === '/' ? 'text-sky-600' : 'text-slate-500'}`}>Home</span>
      </Link>

      {/* WhatsApp */}
      <a href="https://wa.me/918160081145" className="flex flex-col items-center flex-1 no-underline group">
        <div className="p-2 text-slate-400 group-active:text-green-500 transition-colors">
          <MessageCircle size={22} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-semibold text-slate-500">Chat</span>
      </a>

      {/* Central Professional Quote Button */}
      <Link to="/getquote" className="relative flex flex-col items-center flex-1 -mt-10 no-underline">
        <div className="w-14 h-14 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-200 border-4 border-white active:scale-95 transition-transform">
          <Package size={26} strokeWidth={2.5} />
        </div>
        <span className="text-[10px] font-bold text-sky-600 mt-1 uppercase tracking-tighter">Get Quote</span>
      </Link>

      {/* Call */}
      <a href="tel:8160081145" className="flex flex-col items-center flex-1 no-underline group">
        <div className="p-2 text-slate-400 group-active:text-sky-600 transition-colors">
          <Phone size={22} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-semibold text-slate-500">Call</span>
      </a>

      {/* Profile */}
      <Link to="/Login" className="flex flex-col items-center flex-1 no-underline">
        <div className={`p-2 rounded-xl transition-colors ${location.pathname === '/profile' ? 'text-sky-600' : 'text-slate-400'}`}>
          <User size={22} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
        </div>
        <span className={`text-[10px] font-semibold ${location.pathname === '/profile' ? 'text-sky-600' : 'text-slate-500'}`}>Account</span>
      </Link>

    </div>
  </div>
)}
    </>
  );
}