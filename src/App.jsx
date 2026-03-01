import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import HeroSection from "./pages/HeroSection1";
import BenefitsSection from "./components/BenefitsSection";
import CalculatorCTA from "./components/CalculatorCTA";
import WhyTithi from "./components/WhyTithi";
import CustomerReviews from "./components/CustomerReviews";
import ShiftingCalculator from "./components/ShiftingCalculator";
import PopularRoutes from "./components/PopularRoutes";
import AddOnServices from "./components/AddOnServices";
import PackersMoversSEO from "./components/PackersMoversSEO";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import LocalBusinessSEO from "./components/LocalBusinessSEO";
import Services from "./pages/Services";
import PackersMover from "./services/packermover";
import PackersMoverBooking from "./pages/PackersMoverBooking";
import AreaPackersMovers from "./components/AreaPackersMovers";
import PackersMoverDetails from "./pages/PackersMoverDetails";
import AdminBookings from "./admin/pages/AdminBookings";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminLayout from "./admin/layout/AdminLayout";
import Invoice from "./admin/pages/Invoice";
import Dashboard from "./admin/pages/Dashboard";
import Schedule from "./admin/pages/Schedule";
import ScheduleCalendar from "./admin/pages/ScheduleCalendar";
import FAQPage from "./pages/faq";
import TermsAndConditions from "./pages/termconditions";
import PrivacyPolicy from "./pages/privacyprivacy";
import HelpCenter from "./pages/helpcenter";
import BlogPage from "./pages/blog";
import BlogDetail from "./pages/blogDetail";
import AdminCreateBlog from "./admin/pages/AdminCreateBlog";
import BlogSection from "./pages/BlogSection";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";
import ShiftingCalc from "./components/ShiftingCalc";
import AddItemsPage from "./pages/additempage";
import CustomerLogin from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerDashboard from "./components/Cdashboard";
import CustomerOtp from "./components/CustomerOtp";
import SplashLoader from "./components/SplashLoader";
import Packers from "./components/packers";
/* ===== HOME PAGE LAYOUT ===== */
function Home() {
  return (
    <>
    <LocalBusinessSEO/>
      
      <HeroSection  />
      <ShiftingCalculator onlyPackers={true}/>
      <BenefitsSection />
      <CalculatorCTA />
      <WhyTithi />
      <CustomerReviews />
      <PopularRoutes />
      <AddOnServices />
      <BlogSection />
      <HomePage />
      <PackersMoversSEO />
      <ChatWidget/>
      

    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // 1.8 second animation

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashLoader />;
  return (
    <>

      <ScrollToTop/>
      <Header />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/packermover" element={<PackersMover/>} />
        <Route path="/PackersMoverBooking" element={<PackersMoverBooking/>} />
        <Route path="/packers-movers/surat/:area" element={<AreaPackersMovers/>} />
        <Route path="/shiftingcalculator"element={<ShiftingCalculator />}/>
        <Route path="/packermover-details" element={<PackersMoverDetails />} />
        <Route path="/AdminBookings" element={<AdminBookings />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />
        <Route path="/admin/orders" element={<AdminLayout> <AdminBookings /></AdminLayout>}/>
        <Route path="/admin/invoice" element={<AdminLayout><Invoice /></AdminLayout>} />
        <Route path="/admin/schedule" element={<AdminLayout><ScheduleCalendar /></AdminLayout>} />
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/getquote" element={<BenefitsSection />} />
        <Route path="/calculate" element={<ShiftingCalculator onlyPackers={true}/>} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/support" element={<HelpCenter />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/admin/CreateBlog" element={<AdminLayout><AdminCreateBlog /></AdminLayout>} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/calc" element={<ShiftingCalc />} />
        <Route path="/AddItems" element={<AddItemsPage />} />
        <Route path="/Login" element={<CustomerLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute><CustomerDashboard/></ProtectedRoute>} />
        <Route path="verify-otp" element={<CustomerOtp/>}/>
        <Route path="packing" element={<Packers/>}/>
      </Routes>

      <Footer />
      
    </>
  );
}
