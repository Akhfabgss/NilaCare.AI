import Image from "next/image";
import Navbar from "@/components/navbar";
import HomeContent from "@/components/home";
import About from "@/components/about";
import HowItWork from "@/components/howitwork";
import Features from "@/components/features";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#3A62A3] via-[#648BC0] to-[#7FA3D2]">
        <div id="beranda"><HomeContent /></div>
        <div id="tentang"><About /></div>
        <div id="cara-kerja"><HowItWork /></div>
        <div id="fitur"><Features /></div>
        <div id="faq"><Faq /></div>
        <div><Footer /></div>
      </div>
    </div>
  );
}
