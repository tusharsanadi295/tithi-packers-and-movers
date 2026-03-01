import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-slate-100">
      
      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP BAR (Mobile) */}
        <div className="lg:hidden bg-white p-4 shadow flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={26} />
          </button>
          <h2 className="font-bold">Admin Panel</h2>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
