"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Beranda", id: "beranda" },
    { name: "Tentang", id: "tentang" },
    { name: "Cara Kerja", id: "cara-kerja" },
    { name: "Fitur", id: "fitur" },
    { name: "FAQ", id: "faq" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#F5F6FA] shadow-sm">
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/assets/logo.png"
            alt="Logo NilaCare.AI"
            className="w-10 h-10"
          />
          <h1 className="text-md font-semibold text-[#4361EE]">
            NilaCare.AI
          </h1>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className={`relative text-base transition-colors group ${
                index === 0
                  ? "text-[#4361EE] font-medium"
                  : "text-gray-500"
              }`}
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#4361EE] group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => scrollToSection("beranda")}
          className="hidden md:block px-6 py-2 bg-[#4361EE] text-white rounded-lg shadow-md hover:opacity-90 transition"
        >
          Unggah
        </button>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center space-y-4 p-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 hover:text-[#4361EE] transition"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;