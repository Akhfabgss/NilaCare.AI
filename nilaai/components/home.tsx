"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, FileUp, ImageIcon } from "lucide-react";
import { predictDisease, type PredictResponse } from "@/lib/predictApi";

type UiState = "idle" | "loading" | "success" | "error";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uiState, setUiState] = useState<UiState>("idle");
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [errorText, setErrorText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const resetResultState = () => {
    setUiState("idle");
    setResult(null);
    setErrorText("");
  };

  const setPreviewUrl = (file: File) => {
    setPreview((previousPreview) => {
      if (previousPreview) {
        URL.revokeObjectURL(previousPreview);
      }

      return URL.createObjectURL(file);
    });
  };

  const handleFile = (file?: File) => {
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      setSelectedFile(null);
      setPreview((previousPreview) => {
        if (previousPreview) {
          URL.revokeObjectURL(previousPreview);
        }

        return null;
      });
      setUiState("error");
      setResult(null);
      setErrorText("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.");
      setShowOptions(false);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(file);
    resetResultState();
    setShowOptions(false);
  };

  const handlePredict = async () => {
    if (!selectedFile || uiState === "loading") {
      return;
    }

    setUiState("loading");
    setResult(null);
    setErrorText("");

    try {
      const prediction = await predictDisease(selectedFile);
      setResult(prediction);
      setUiState("success");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Terjadi kesalahan saat memproses gambar.";
      setUiState("error");
      setErrorText(message);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  let uploadContent: React.ReactNode;

  if (preview) {
    uploadContent = (
      <>
        <img src={preview} alt="Preview" className="max-h-72 object-contain rounded-xl" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPreview((previousPreview) => {
              if (previousPreview) {
                URL.revokeObjectURL(previousPreview);
              }

              return null;
            });
            setSelectedFile(null);
            resetResultState();
          }}
          className="absolute top-4 right-4 bg-white text-md px-3 py-1 rounded-full shadow hover:bg-gray-100"
          disabled={uiState === "loading"}
        >
          Ganti
        </button>
      </>
    );
  } else if (showOptions) {
    uploadContent = (
      <div className="w-full max-w-xs space-y-4">
        <p className="text-gray-500 text-md mb-4">Pilih Metode Unggah Gambar</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (uiState === "loading") {
              return;
            }
            fileInputRef.current?.click();
          }}
          className="w-full flex items-center justify-center gap-3 py-3 bg-[#006699] text-white rounded-full hover:bg-[#005580] transition"
          disabled={uiState === "loading"}
        >
          <FileUp size={20} />
          Unggah Gambar
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (uiState === "loading") {
              return;
            }
            cameraInputRef.current?.click();
          }}
          className="w-full flex items-center justify-center gap-3 py-3 bg-[#D6E4F5] text-[#4361EE] rounded-full hover:bg-[#c5d9f0] transition"
          disabled={uiState === "loading"}
        >
          <Camera size={20} />
          Gunakan Kamera
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (uiState === "loading") {
              return;
            }
            setShowOptions(false);
          }}
          className="text-xs text-gray-400 underline mt-2"
          disabled={uiState === "loading"}
        >
          Batal
        </button>
      </div>
    );
  } else {
    uploadContent = (
      <>
        <ImageIcon size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-600 font-medium">Unggah Foto Ikan Di sini</p>
        <p className="text-xs text-gray-400 mt-2">Format yang didukung: JPG, PNG, WEBP (10 MB)</p>

        <button
          type="button"
          className="mt-6 px-5 py-2 bg-[#4361EE] text-white text-md rounded-md hover:opacity-90 transition"
          onClick={(e) => {
            e.stopPropagation();
            if (uiState === "loading") {
              return;
            }
            setShowOptions(true);
          }}
          disabled={uiState === "loading"}
        >
          Pilih Metode Unggah
        </button>
      </>
    );
  }
  
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
            className="relative border-2 border-dashed rounded-2xl p-8 md:p-25 flex flex-col items-center justify-center text-center transition-all overflow-hidden border-gray-300"
            >
            {uploadContent}

            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => handleFile(e.target.files?.[0])}
            />

            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="environment"
                className="hidden"
                ref={cameraInputRef}
                onChange={(e) => handleFile(e.target.files?.[0])}
            />
            </div>

          <div className="mt-5 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handlePredict}
              disabled={!selectedFile || uiState === "loading"}
              className="px-6 py-2 bg-[#4361EE] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
            >
              {uiState === "loading" ? "Memproses..." : "Prediksi Sekarang"}
            </button>

            {uiState === "error" && errorText ? (
              <p className="text-sm text-red-600 text-center">{errorText}</p>
            ) : null}

            {uiState === "success" && result ? (
              <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">Hasil Klasifikasi</p>
                <p className="text-lg font-semibold text-[#5A2BBF] mt-1">{result.label}</p>
                <p className="text-sm text-gray-700 mt-1">
                  Confidence: {(result.confidence * 100).toFixed(2)}%
                </p>
              </div>
            ) : null}
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