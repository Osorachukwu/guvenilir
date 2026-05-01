import { MailOpen, Menu, X, ChevronDown } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeSwitcher from '../ThemeSwitcher';

// Desktop Dropdown Component (Hover-based)
const DesktopDropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 px-2 py-0.5 hover:bg-primary/30 rounded font-medium focus:outline-none">
        <span>{trigger}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-56 bg-base-100 rounded-xl shadow-xl border border-base-content/10 py-2 z-50 backdrop-blur-md"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ to, onClick, children }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
};

// Mobile Dropdown Component (Click-based)
const MobileDropdown = ({ trigger, children, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-base font-medium hover:bg-primary/10 rounded-lg transition-colors"
      >
        <span>{trigger}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
        <div className="pl-4 space-y-1 border-l-2 border-primary/30 ml-4">
          {React.Children.map(children, child =>
            React.cloneElement(child, { onClick: onItemClick })
          )}
        </div>
      </div>
    </div>
  );
};

export function NavBar() {
  let currentLocation = useLocation().pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentLocation]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { navItem: "Home", navUrl: "/" },
    { navItem: "About", navUrl: "/about" },
    { navItem: "Investments", navUrl: "/investments", hasDropdown: true },
    { navItem: "FAQS", navUrl: "/faqs" },
    { navItem: "Support", navUrl: "/support" },
    { navItem: "Affiliate", navUrl: "/affiliate" },
    // { navItem: "Legal", navUrl: "/legal" },
    // { navItem: "Buy Digital currency", navUrl: "/buy" },
    { navItem: "Signup", navUrl: "/register" }
  ];

  const investmentDropdownItems = [
    { label: "Investment Plans", to: "/investments/plans" },
    { label: "Portfolio", to: "/investments/portfolio" },
    { label: "Performance", to: "/investments/performance" },
    { label: "Calculator", to: "/investments/calculator" },
  ];

  return (
    <div className='relative'>
      {/* Top Bar - Desktop Only */}
      <div className='py-6 hidden md:block z-50 relative'>
        <div className='flex justify-between items-center max-w-4xl mx-auto px-4'>
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            <span className="text-primary">Crypto</span>Invest
          </Link>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2 text-sm'>
              <div className="p-2 bg-primary/10 rounded-full">
                <MailOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">support@example.com</p>
                <p className='text-xs opacity-60'>Send us a mail</p>
              </div>
            </div>
            <div className='pl-6 border-l border-base-content/20'>
              <Link to="/register" className='btn btn-primary btn-sm'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`w-full absolute z-40 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        {/* className='bg-base-300/50 backdrop-blur-sm border-b border-gray-600 absolute z-50 py-4' */}
        <div className={`bg-base-300/50 backdrop-blur-md border-b border-base-content/10 w-full py-4 transition-all duration-300 ${scrolled ? 'bg-base-300/80' : ''}`}>
          
          {/* Desktop Navigation */}
          <div className='hidden md:flex justify-center items-center gap-1 max-w-6xl mx-auto px-4'>
            {navItems.map((item, i) => (
              <div key={i}>
                {item.hasDropdown ? (
                  <DesktopDropdown trigger={item.navItem}>
                    {investmentDropdownItems.map((dropItem, idx) => (
                      <DropdownItem key={idx} to={dropItem.to}>
                        {dropItem.label}
                      </DropdownItem>
                    ))}
                  </DesktopDropdown>
                ) : (
                  <Link
                    to={item.navUrl}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 hover:bg-primary/20 ${
                      currentLocation === item.navUrl ? "text-primary bg-primary/10" : ""
                    }`}
                  >
                    {item.navItem}
                  </Link>
                )}
              </div>
            ))}
            {/* <div className="ml-2 pl-2 border-l border-base-content/20">
              <Link
                to="/register"
                className="px-4 py-1.5 rounded-lg font-medium bg-primary text-primary-content hover:bg-primary/90 transition-colors"
              >
                Signup
              </Link>
            </div> */}
            <div className="ml-2">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Navigation Header */}
          <div className='flex md:hidden justify-between items-center px-4'>
            <Link to="/" className="text-xl font-bold">
              <span className="text-primary">Crypto</span>Invest
            </Link>
            <div className='flex items-center gap-3'>
              <ThemeSwitcher />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-base-content/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-base-100 z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-content/10">
          <span className="text-xl font-bold">
            <span className="text-primary">Crypto</span>Invest
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-base-content/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-80px)]">
          {/* User Info / Login Section */}
          <div className="mb-6 p-4 bg-base-200 rounded-xl">
            <p className="text-sm opacity-70 mb-3">Already have an account?</p>
            <Link
              to="/register"
              className="btn btn-primary w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login / Signup
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            {navItems.map((item, i) => (
              <div key={i}>
                {item.hasDropdown ? (
                  <MobileDropdown
                    trigger={item.navItem}
                    onItemClick={() => setMobileMenuOpen(false)}
                  >
                    {investmentDropdownItems.map((dropItem, idx) => (
                      <DropdownItem key={idx} to={dropItem.to}>
                        {dropItem.label}
                      </DropdownItem>
                    ))}
                  </MobileDropdown>
                ) : (
                  <Link
                    to={item.navUrl}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                      currentLocation === item.navUrl
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-base-200"
                    }`}
                  >
                    {item.navItem}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Support Section */}
          <div className="mt-6 pt-6 border-t border-base-content/10">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <MailOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">support@example.com</p>
                <p className="text-xs opacity-60">Send us a mail anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}