import {
  LayoutDashboard,
  Package,
  Calendar,
  FileText,
  Settings,
  LogOut,
  X,
  UserPlus
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 no-underline ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <>
      {/* BACKDROP (only mobile) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72 bg-[#0f172a] text-white p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* MOBILE CLOSE BUTTON */}
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <h1 className="text-lg font-bold">TITHI ADMIN</h1>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* BRAND (Desktop) */}
        <div className="hidden lg:block mb-10">
          <h1 className="text-lg font-bold">TITHI ADMIN</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            Management Hub
          </p>
        </div>

        {/* MENU */}
        <nav className="">
          <NavLink to="/admin/dashboard" className={navLinkStyle}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>

          <NavLink to="/admin/orders" className={navLinkStyle}>
            <Package size={20} /> Orders
          </NavLink>

          <NavLink to="/admin/schedule" className={navLinkStyle}>
            <Calendar size={20} /> Schedule
          </NavLink>

          <NavLink to="/admin/invoice" className={navLinkStyle}>
            <FileText size={20} /> Invoices
          </NavLink>

          <NavLink to="/admin/CreateBlog" className={navLinkStyle}>
            <FileText size={20} /> Blog
          </NavLink>
        </nav>

        {/* BOTTOM ACTIONS */}
        <div className="mt-auto pt-6 border-t border-slate-800 space-y-1">
          <NavLink to="/AdminRegister" className={navLinkStyle}>
            <UserPlus size={20} /> Register Admin
          </NavLink>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10"
          onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/AdminLogin";
      }}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
