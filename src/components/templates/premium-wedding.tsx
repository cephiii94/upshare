"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Heart, Clock, Copy, Check, MessageSquareHeart } from "lucide-react";
import { submitRsvp } from "@/app/actions/undangan";

interface PremiumWeddingTemplateProps {
  data: any;
  subdomain: string;
  activeTab?: string;
}

export function PremiumWeddingTemplate({ data, subdomain, activeTab }: PremiumWeddingTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState("idle");

  // Sync with activeTab from editor
  useEffect(() => {
    if (!activeTab) return;
    
    let elementId = "";
    if (activeTab === "tema") elementId = "section-tema";
    if (activeTab === "mempelai") elementId = "section-mempelai";
    if (activeTab === "acara") elementId = "section-acara";
    if (activeTab === "fitur") elementId = "section-fitur";

    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeTab]);

  // Fallbacks for empty data
  const groom = data.nama_pria || "Romeo";
  const groomFull = data.nama_lengkap_pria || "Romeo Adiputra";
  const groomParents = data.ortu_pria || "Putra dari Bapak Fulan & Ibu Fulanah";
  
  const bride = data.nama_wanita || "Juliet";
  const brideFull = data.nama_lengkap_wanita || "Juliet Maharani";
  const brideParents = data.ortu_wanita || "Putri dari Bapak Fulan & Ibu Fulanah";

  const akadDate = data.tanggal_akad || "2026-12-31T08:00:00";
  const akadTime = data.waktu_akad || "08:00 - 10:00 WIB";
  const akadLocation = data.lokasi_akad || "Masjid Agung Jakarta";

  const resepsiDate = data.tanggal_acara || "2026-12-31T11:00:00";
  const resepsiTime = data.waktu_acara || "11:00 - Selesai";
  const resepsiLocation = data.lokasi_acara || "Grand Ballroom Hotel Indonesia, Jakarta";
  
  const quote = data.kutipan || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.";
  const quoteSource = data.sumber_kutipan || "Ar-Rum: 21";

  const coverUrl = data.cover_url || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop";

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const handleCopyRekening = () => {
    if (data.rekening_no) {
      navigator.clipboard.writeText(data.rekening_no);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRSVPAction = async (formData: FormData) => {
    setRsvpStatus("loading");
    formData.set("subdomain", subdomain);
    const result = await submitRsvp(formData);
    if (result.error) {
      alert(result.error);
      setRsvpStatus("idle");
    } else {
      setRsvpStatus("success");
    }
  };

  return (
    <div className="bg-slate-50 relative selection:bg-rose-200">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;1,400&display=swap');
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lora { font-family: 'Lora', serif; }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        }
      `}} />

      {/* Hero Section */}
      <section id="section-tema" className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/50 z-10" />
          <img src={coverUrl} alt="Wedding Cover" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 text-center text-white px-4 fade-in-up">
          <p className="font-lora uppercase tracking-[0.4em] text-xs md:text-sm mb-6 font-medium text-rose-100">
            The Wedding Of
          </p>
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg">
            {groom} <span className="text-rose-300 italic font-normal">&</span> {bride}
          </h1>
          <p className="font-lora text-lg md:text-xl mt-6 tracking-widest">
            {formatDate(resepsiDate)}
          </p>
        </div>
      </section>

      {/* Quote Section */}
      <section id="section-fitur" className="py-24 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <Heart className="w-8 h-8 text-rose-400 mx-auto mb-8 animate-pulse" />
          <p className="font-lora italic text-slate-600 text-lg md:text-xl leading-relaxed">
            "{quote}"
          </p>
          <p className="mt-6 font-playfair font-semibold text-slate-800">— {quoteSource} —</p>
        </div>
      </section>

      {/* Groom & Bride Details */}
      <section id="section-mempelai" className="py-24 px-6 bg-rose-50/50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 text-center">
          {/* Pria */}
          <div className="glass-card p-10 rounded-[3rem]">
            <h2 className="font-playfair text-3xl font-bold text-slate-800 mb-4">{groomFull}</h2>
            <p className="font-lora text-slate-600">{groomParents}</p>
          </div>
          {/* Wanita */}
          <div className="glass-card p-10 rounded-[3rem]">
            <h2 className="font-playfair text-3xl font-bold text-slate-800 mb-4">{brideFull}</h2>
            <p className="font-lora text-slate-600">{brideParents}</p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section id="section-acara" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-bold text-slate-800 mb-16">Jadwal Acara</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Akad */}
            <div className="border border-slate-100 bg-slate-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-2xl font-bold text-slate-800 mb-6">Akad Nikah</h3>
              <div className="space-y-4 font-lora text-slate-600">
                <p className="flex items-center justify-center gap-2"><Calendar className="w-5 h-5 text-rose-500"/> {formatDate(akadDate)}</p>
                <p className="flex items-center justify-center gap-2"><Clock className="w-5 h-5 text-rose-500"/> {akadTime}</p>
                <p className="flex items-center justify-center gap-2"><MapPin className="w-5 h-5 text-rose-500"/> {akadLocation}</p>
              </div>
            </div>

            {/* Resepsi */}
            <div className="border border-slate-100 bg-slate-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-2xl font-bold text-slate-800 mb-6">Resepsi</h3>
              <div className="space-y-4 font-lora text-slate-600">
                <p className="flex items-center justify-center gap-2"><Calendar className="w-5 h-5 text-rose-500"/> {formatDate(resepsiDate)}</p>
                <p className="flex items-center justify-center gap-2"><Clock className="w-5 h-5 text-rose-500"/> {resepsiTime}</p>
                <p className="flex items-center justify-center gap-2"><MapPin className="w-5 h-5 text-rose-500"/> {resepsiLocation}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amplop Digital */}
      {data.rekening_no && (
        <section className="py-24 px-6 bg-rose-50/50">
          <div className="max-w-xl mx-auto text-center glass-card p-10 rounded-3xl">
            <h2 className="font-playfair text-3xl font-bold text-slate-800 mb-4">Wedding Gift</h2>
            <p className="font-lora text-slate-600 mb-8">Bagi keluarga dan sahabat yang ingin memberikan tanda kasih, dapat mengirimkan melalui:</p>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="font-bold text-slate-800 text-lg">{data.bank_name || "BCA"}</p>
              <p className="text-2xl font-mono text-slate-700 my-2 tracking-wider">{data.rekening_no}</p>
              <p className="text-slate-600 mb-6 font-lora">a.n {data.rekening_nama || "Nama Lengkap"}</p>
              
              <button 
                onClick={handleCopyRekening}
                className="w-full bg-slate-900 text-white py-3 rounded-full font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <><Check className="w-4 h-4"/> Berhasil Disalin</> : <><Copy className="w-4 h-4"/> Salin Nomor Rekening</>}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* RSVP & Buku Tamu */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-slate-800 mb-4 text-center">RSVP & Ucapan</h2>
          <p className="font-lora text-slate-600 text-center mb-12">Kehadiran dan doa restu Anda sangat berarti bagi kami.</p>
          
          <form action={handleRSVPAction} className="glass-card p-8 rounded-3xl space-y-6">
            <div>
              <label className="block font-lora text-slate-700 mb-2">Nama Lengkap</label>
              <input required name="name" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all bg-white/50" placeholder="Tulis nama Anda" />
            </div>
            
            <div>
              <label className="block font-lora text-slate-700 mb-2">Kehadiran</label>
              <select required name="attendance" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all bg-white/50">
                <option value="Hadir">Ya, Saya akan hadir</option>
                <option value="Tidak Hadir">Maaf, saya tidak bisa hadir</option>
              </select>
            </div>

            <div>
              <label className="block font-lora text-slate-700 mb-2">Pesan & Doa Restu</label>
              <textarea required name="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all resize-none bg-white/50" placeholder="Tuliskan ucapan dan doa untuk kedua mempelai"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={rsvpStatus === "loading" || rsvpStatus === "success"}
              className="w-full bg-rose-600 text-white py-4 rounded-xl font-bold hover:bg-rose-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {rsvpStatus === "loading" ? "Mengirim..." : rsvpStatus === "success" ? <><Check className="w-5 h-5"/> Terkirim</> : <><MessageSquareHeart className="w-5 h-5"/> Kirim Ucapan</>}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center bg-slate-900 text-slate-400 font-lora text-sm">
        <p>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.</p>
        <p className="mt-8 text-rose-400 font-playfair text-xl">{groom} & {bride}</p>
      </footer>
    </div>
  );
}
