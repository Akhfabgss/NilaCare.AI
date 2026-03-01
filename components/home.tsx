"use client";

import { useRef, useState } from "react";
import { Camera, FileUp, ImageIcon, X } from 'lucide-react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFile = (file?: File) => {
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setShowOptions(false);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Gagal mengakses kamera:", err);
      alert("Gagal mengakses kamera. Pastikan izin kamera diberikan dan menggunakan HTTPS.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
          handleFile(file);
          stopCamera();
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };
  
  return (
    <main className="min-h-screen bg-cover bg-center items-center flex flex-col pt-28 px-4">
      {/* HERO SECTION */}
      <div className="w-full h-60 flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/bg-home.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      >
        <section className="text-center text-white max-w-7xl">
            <h1 
              className="text-2xl md:text-4xl font-bold leading-snug"
              data-aos="fade-down"
            >
            Deteksi Penyakit Ikan Nila Gratis – Cek Kesehatan
            <br className="hidden md:block" />
            Ikan Anda Secara Instan
            </h1>

            <p 
              className="mt-4 text-md md:text-base text-white/90"
              data-aos="fade-up"
              data-aos-delay="100"
            >
            Gunakan teknologi AI kami untuk mengenali penyakit ikan nila dengan cepat.
            Cukup unggah foto, dapatkan hasilnya segera, dan lindungi kolam Anda dari gagal panen.
            </p>
        </section>
      </div>

      {/* CARD */}
      <section 
        className="w-full max-w-7xl mt-2 bg-[#F4F4F4] rounded-3xl shadow-xl p-6 md:p-12 relative"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h2 className="text-xl md:text-2xl font-semibold text-[#5A2BBF]">
          Cek Kesehatan Ikan Nila Anda dengan Cepat
        </h2>

        <p className=" text-gray-500 mt-3 text-md">
          Coba dengan contoh foto berikut:
        </p>

        {/* SAMPLE BUTTONS */}
        <div className="flex flex-wrap gap-3 mt-5">
          {["Nila Sehat", "Nila Jamur", "Sirip Busuk", "Mata Menonjol"].map(
            (item, index) => (
              <button
                key={item}
                className="px-4 py-2 rounded-full border border-[#4361EE] text-[#4361EE] text-md hover:bg-[#4361EE] hover:text-white transition"
                data-aos="fade-up"
                data-aos-delay={300 + index * 50}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* UPLOAD AREA */}
        <section className="w-full max-w-7xl mt-5 bg-[#F4F4F4]">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => !showOptions && !preview && setShowOptions(true)}
            className={`relative border-2 border-dashed rounded-2xl p-8 md:p-25 flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden ${
                isDragging ? "border-[#4361EE] bg-blue-50" : "border-gray-300"
            }`}
            >
            {/* Kalau sudah ada preview */}
            {preview ? (
                <>
                <img
                    src={preview}
                    alt="Preview"
                    className="max-h-72 object-contain rounded-xl"
                />

                {/* Ganti Foto Button */}
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                    setSelectedFile(null);
                    }}
                    className="absolute top-4 right-4 bg-white text-md px-3 py-1 rounded-full shadow hover:bg-gray-100"
                >
                    Ganti
                </button>
                </>
            ) : !showOptions ? (
                <>
                <ImageIcon size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">
                    Unggah Foto Ikan Di sini
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    Format yang didukung: JPG, PNG, WEBP (10 MB)
                </p>

                <button className="mt-6 px-5 py-2 bg-[#4361EE] text-white text-md rounded-md hover:opacity-90 transition">
                    Pilih Metode Unggah
                </button>
                </>
            ) : (
                <div className="w-full max-w-xs space-y-4">
                <p className="text-gray-500 text-md mb-4">
                    Pilih Metode Unggah Gambar
                </p>

                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                    }}
                    className="w-full flex items-center justify-center gap-3 py-3 bg-[#006699] text-white rounded-full hover:bg-[#005580] transition"
                >
                    <FileUp size={20} />
                    Unggah Gambar
                </button>

                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    openCamera();
                    }}
                    className="w-full flex items-center justify-center gap-3 py-3 bg-[#D6E4F5] text-[#4361EE] rounded-full hover:bg-[#c5d9f0] transition"
                >
                    <Camera size={20} />
                    Gunakan Kamera
                </button>

                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    setShowOptions(false);
                    }}
                    className="text-xs text-gray-400 underline mt-2"
                >
                    Batal
                </button>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => handleFile(e.target.files?.[0])}
            />

            <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                ref={cameraInputRef}
                onChange={(e) => handleFile(e.target.files?.[0])}
            />
            </div>
        </section>

        {/* FLOATING BUTTON */}
        {/* <div className="absolute bottom-6 right-6 w-16 h-16 bg-[#4361EE] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition">
          <span className="text-white text-2xl">✨</span>
        </div> */}
      </section>
    </main>
  );
}