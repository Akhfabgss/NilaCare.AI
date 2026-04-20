"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Format gambar apa saja yang didukung oleh sistem ini?",
      answer:
        "Sistem mendukung format JPG, PNG, dan WEBP dengan ukuran maksimal 10 MB.",
    },
    {
      question: "Berapa ukuran maksimal file gambar yang dapat diunggah?",
      answer:
        "Ukuran maksimal file yang dapat diunggah adalah 10 MB per gambar.",
    },
    {
      question:
        "Apakah sistem dapat mendeteksi lebih dari satu penyakit dalam satu gambar?",
      answer:
        "Saat ini sistem dirancang untuk mendeteksi penyakit utama yang paling dominan dalam gambar.",
    },
    {
      question:
        "Apakah sistem dapat digunakan untuk semua jenis ikan atau hanya ikan nila?",
      answer:
        "Sistem saat ini difokuskan untuk mendeteksi penyakit pada ikan nila.",
    },
    {
      question:
        "Apakah diperlukan koneksi internet untuk menggunakan sistem ini?",
      answer:
        "Ya, karena sistem berbasis web dan menggunakan pemrosesan AI di server.",
    },
    {
      question: "Berapa lama proses analisis gambar berlangsung?",
      answer:
        "Proses analisis biasanya berlangsung beberapa detik tergantung ukuran file dan koneksi internet.",
    },
    {
      question:
        "Apakah sistem tetap dapat bekerja jika kualitas gambar kurang baik?",
      answer:
        "Sistem tetap akan mencoba menganalisis, namun hasil terbaik diperoleh dari gambar yang jelas dan fokus.",
    },
  ];

  return (
    <section className="w-full py-25 px-6 relative bg-no-repeat bg-top"
    style={{
        backgroundImage: "url('/assets/bg-faq.png')",
        backgroundSize: "80% auto"
      }}
    >
      <div className="max-w-7xl mx-auto text-center">

        {/* Title */}
        <h2 
          className="text-white text-2xl md:text-4xl font-bold mb-6 md:mb-16"
          data-aos="fade-down"
        >
          Pertanyaan yang sering diajukan
        </h2>

        {/* FAQ List */}
        <div className="space-y-5 text-left">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xs rounded-2xl px-6 py-5 text-white transition"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <button
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-md md:text-base font-medium">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-md text-white/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}