import React from 'react'

const about = () => {
  return (
    <div
      className='py-8 md:py-20 w-full flex flex-col items-center justify-center bg-bottom bg-no-repeat'
      style={{
        backgroundImage: "url('/assets/bg-about.png')",
        backgroundSize: "contain",
      }}
    >
      <h1
        className="text-2xl md:text-4xl font-bold leading-tight text-center text-white mb-6 md:mb-10 px-6"
        data-aos="fade-down"
      >
        Apa Itu Sistem Deteksi Penyakit Ikan Nila?
      </h1>
      
      <div className='flex flex-col md:flex-row w-full gap-4 md:gap-8 px-6 max-w-7xl'>
        {/* Bagian Kiri - Gambar */}
        <div
          className='flex-1 flex items-center justify-center'
          data-aos="fade-up"
        >
          <img
            src="/assets/about.png"
            alt="Ilustrasi Deteksi Penyakit Ikan Nila"
            className="w-full max-w-[400px] md:max-w-none h-auto"
          />
        </div>

        {/* Bagian Kanan - Teks */}
        <div
          className='flex-1 flex flex-col justify-center text-start md:text-left'
          data-aos="fade-up"
        >
          <div className='text-sm md:text-base text-white leading-relaxed space-y-4'>
            <p>
              Sistem Deteksi Penyakit Ikan Nila adalah platform berbasis web yang dirancang untuk mengidentifikasi penyakit pada ikan nila secara otomatis melalui analisis citra digital berbasis kecerdasan buatan. Dataset yang digunakan untuk melatih model deteksi terdiri dari kumpulan gambar ikan nila dalam kondisi sehat dan terinfeksi, termasuk penyakit umum seperti Streptococcosis, Aeromonas, dan jamur Saprolegnia.
            </p>
            <p>
              Untuk meningkatkan proses pelatihan dan pengujian, dataset telah dioptimalkan guna memastikan sistem dapat menganalisis gambar secara efisien dan akurat. Dengan memanfaatkan teknologi deep learning, khususnya Convolutional Neural Network (CNN), sistem mampu mengklasifikasikan jenis penyakit, menampilkan tingkat kepercayaan hasil, serta memberikan rekomendasi penanganan awal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default about