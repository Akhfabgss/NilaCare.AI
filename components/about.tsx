import React from 'react'

const about = () => {
  return (
    <div
    className='py-5 md:pt-20 w-full items-center justify-center bg-bottom bg-no-repeat'
    style={{
        backgroundImage: "url('/assets/bg-about.png')",
        backgroundSize: "contain",
      }}
    >
        <h1 
          className="text-2xl md:text-4xl font-bold leading-snug text-center text-white mb-10"
          data-aos="fade-down"
        >
            Apa Itu Sistem Deteksi Penyakit Ikan Nila?
        </h1>
        <div className='flex flex-col md:flex-row w-full gap-8'>
            {/* Bagian Kiri */}
            <div 
              className='flex-1 py-5 px-2 md:px-15 rounded-xl'
              data-aos="fade-up"
            >
                <img
                    src="/assets/about.png"
                    alt="Ilustrasi Deteksi Penyakit Ikan Nila"
                    className="w-full h-auto rounded-lg"
                />
            </div>

            {/* Bagian Kanan */}
            <div 
              className='flex-1 py-5 px-2 md:px-15 rounded-xl'
              data-aos="fade-up"
            >
                <p className='text-md text-white py-10'>
                    Sistem Deteksi Penyakit Ikan Nila adalah platform berbasis web yang dirancang untuk mengidentifikasi penyakit pada ikan nila secara otomatis melalui analisis citra digital berbasis kecerdasan buatan. Dataset yang digunakan untuk melatih model deteksi terdiri dari kumpulan gambar ikan nila dalam kondisi sehat dan terinfeksi, termasuk penyakit umum seperti Streptococcosis, Aeromonas, dan jamur Saprolegnia. Setiap gambar telah diberi label dan divalidasi untuk memastikan model mempelajari pola visual yang sesuai dengan kondisi kesehatan ikan.
                    <br /><br />
                    Untuk meningkatkan proses pelatihan dan pengujian, dataset telah dioptimalkan guna memastikan sistem dapat menganalisis gambar secara efisien dan akurat. Dengan memanfaatkan teknologi deep learning, khususnya Convolutional Neural Network (CNN), sistem mampu mengklasifikasikan jenis penyakit, menampilkan tingkat kepercayaan hasil, serta memberikan rekomendasi penanganan awal.
                </p>
            </div>
        </div>
    </div>
  )
}

export default about