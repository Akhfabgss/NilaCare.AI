export default function MainFeatures() {
  const features = [
    {
      title: "Deteksi Penyakit Otomatis Berbasis AI",
      desc: "Sistem menggunakan teknologi Deep Learning (CNN) untuk menganalisis gambar ikan nila dan mengidentifikasi jenis penyakit secara otomatis dengan tingkat kepercayaan tertentu.",
      image: "/assets/fitur1.png",
    },
    {
      title: "Analisis Citra Digital",
      desc: "Cukup unggah foto ikan nila, sistem akan membaca pola visual seperti warna, tekstur, dan bentuk luka untuk menentukan kemungkinan penyakit.",
      image: "/assets/fitur2.png",
    },
    {
      title: "Konsultasi AI Interaktif",
      desc: "Setelah hasil deteksi ditampilkan, pengguna dapat melanjutkan konsultasi melalui fitur Chatbot AI untuk mendapatkan penjelasan lebih detail dan saran penanganan.",
      image: "/assets/fitur3.png",
    },
    {
      title: "Informasi Edukasi Penyakit",
      desc: "Website menyediakan informasi singkat mengenai penyakit umum ikan nila, gejala, serta langkah pencegahan yang dapat dilakukan pembudidaya.",
      image: "/assets/fitur4.png",
    },
    {
      title: "Akses Mudah Berbasis Web",
      desc: "Sistem dapat digunakan kapan saja dan di mana saja tanpa perlu instalasi aplikasi, cukup melalui browser.",
      image: "/assets/fitur5.png",
    },
    {
      title: "Dirancang untuk Petani Pemula",
      desc: "Sistem dirancang dengan alur penggunaan yang intuitif dan navigasi yang jelas, sehingga pengguna dapat melakukan deteksi penyakit tanpa memerlukan keahlian teknis khusus.",
      image: "/assets/fitur6.png",
    },
  ];

  return (
    <section className="w-full pt-25 px-6 bg-no-repeat bg-center"
    style={{
        backgroundImage: "url('/assets/bg-fitur.png')",
        backgroundSize: "40% auto"
      }}
    >
      <div className="max-w-7xl mx-auto text-center">

        {/* Title */}
        <h2 
          className="text-white text-2xl md:text-4xl font-bold mb-5 md:mb-14"
          data-aos="fade-down"
        >
          Fitur Utama Sistem Deteksi Penyakit Ikan Nila Kami?
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xs rounded-2xl p-8 text-white text-left shadow-lg hover:scale-[1.03] transition duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-12 h-12 mb-5 object-contain"
              />

              <h3 className="text-lg font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-md text-white/80 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}