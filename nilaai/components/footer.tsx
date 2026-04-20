"use client";
import React from 'react';
import { Instagram, Facebook, MessageCircle, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { name: "Beranda", id: "beranda" },
    { name: "Deteksi penyakit", id: "beranda" },
    { name: "Tentang", id: "tentang" },
    { name: "FAQ", id: "faq" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#3A62A3] to-[#7FA3D2] text-white py-16 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div 
            className="lg:col-span-1"
            data-aos="fade-right"
          >
            <h2 className="text-xl font-bold mb-4">Nilacare.AI</h2>
            <p className="text-white text-sm leading-relaxed max-w-xs">
              Solusi cerdas untuk kesehatan ikan nila Anda.
            </p>
          </div>

        <div 
          className='mx-10'
          data-aos="fade-up"
          data-aos-delay="100"
        >
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-white text-sm">
              <li><a href="mailto:nilacareai@gmail.com" className="relative inline-block hover:text-[#FFD700] transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">nilacareai@gmail.com</a></li>
              <li><a href="https://wa.me/6281212341234" target="_blank" rel="noopener noreferrer" className="relative inline-block hover:text-[#FFD700] transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">0812-1234-1234</a></li>
              <li><span className="relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Indonesia</span></li>
            </ul>
          </div>

          <div 
            className='mx-10'
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-lg font-semibold mb-6">Fitur Utama</h3>
            <ul className="space-y-4 text-white text-sm">
              <li><span className="relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Deteksi Penyakit Otomatis</span></li>
              <li><span className="relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Analisis Citra Digital</span></li>
              <li><span className="relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Konsultasi AI</span></li>
              <li><span className="relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Rekomendasi Penanganan</span></li>
            </ul>
          </div>

          <div 
            className='mx-10'
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-lg font-semibold mb-6">Menu</h3>
            <ul className="space-y-4 text-white text-sm">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="relative inline-block text-left hover:text-[#FFD700] transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div 
          className="flex flex-col items-center border-t border-white-800 pt-10"
          data-aos="fade-in"
          data-aos-delay="400"
        >
          <p className="text-white text-xs text-center">
            © Copyright Tim SAR. All rights reserved
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;