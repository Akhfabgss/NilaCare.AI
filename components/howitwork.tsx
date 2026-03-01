export default function HowItWorks() {
  const steps = [
    {
      title: "Unggah Gambar",
      desc: "Unggah foto yang telah diambil melalui fitur upload yang tersedia pada halaman deteksi.",
      image: "/assets/hiw1.png",
    },
    {
      title: "Sistem Menganalisis",
      desc: "Sistem akan memproses gambar menggunakan teknologi deep learning untuk mengidentifikasi pola visual penyakit secara otomatis.",
      image: "/assets/hiw2.png",
    },
    {
      title: "Lihat Hasil Diagnosis",
      desc: "Hasil deteksi akan ditampilkan berupa nama penyakit, tingkat kepercayaan (%), serta rekomendasi penanganan awal.",
      image: "/assets/hiw3.png",
    },
    {
      title: "Konsultasi AI",
      desc: "Jika diperlukan, lanjutkan ke fitur Konsultasi AI untuk mendapatkan penjelasan lebih detail mengenai penyakit dan saran penanganan lanjutan.",
      image: "/assets/hiw4.png",
    },
  ];

  return (
    <section
    className="w-full pt-25 px-6 bg-top bg-no-repeat"
    style={{
        backgroundImage: "url('/assets/bg-hiw.png')",
        backgroundSize: "50% auto"
      }}>
      <div className="max-w-7xl mx-auto text-center">

        {/* Title */}
        <h1 
          className="text-white text-2xl md:text-4xl mb-14 font-bold"
          data-aos="fade-down"
        >
          Bagaimana Cara Menggunakan Sistem Deteksi Penyakit Ikan Nila Kami?
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xs rounded-2xl p-8 text-white shadow-lg hover:scale-105 transition duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex justify-center mb-6">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-20 h-20 object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-md text-white/80 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}