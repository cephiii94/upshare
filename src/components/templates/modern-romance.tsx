"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Heart,
  MapPin,
  Clock,
  Calendar,
  Copy,
  Check,
  MessageSquareHeart,
  ChevronDown,
} from "lucide-react";
import { submitRsvp } from "@/app/actions/undangan";

interface ModernRomanceTemplateProps {
  data: any;
  subdomain: string;
  activeTab?: string;
}

/* ─── Countdown Hook ─────────────────────────────────── */
function useCountdown(targetDate: string) {
  const calc = useCallback(() => {
    const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  }, [targetDate]);

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [calc]);
  return time;
}

/* ─── Guest Message List ─────────────────────────────── */
type Message = { name: string; attendance: string; message: string };

function GuestMessages({ messages }: { messages: Message[] }) {
  if (!messages.length) return null;
  return (
    <div className="space-y-4 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
      {messages.map((m, i) => (
        <div key={i} className="bg-white/70 rounded-2xl p-4 border border-rose-100">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-rose-800 text-sm">{m.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              m.attendance === "Hadir"
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-500"
            }`}>
              {m.attendance}
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed italic">"{m.message}"</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Template ──────────────────────────────────── */
export function ModernRomanceTemplate({ data, subdomain, activeTab }: ModernRomanceTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "loading" | "success">("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [envelope, setEnvelope] = useState(false); // "buka undangan" gate

  // Scroll sync with editor
  useEffect(() => {
    if (!activeTab) return;
    const map: Record<string, string> = {
      tema: "mr-section-tema",
      mempelai: "mr-section-mempelai",
      acara: "mr-section-acara",
      fitur: "mr-section-fitur",
    };
    const el = document.getElementById(map[activeTab]);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeTab]);

  // Data fallbacks
  const groom       = data.nama_pria              || "Romeo";
  const groomFull   = data.nama_lengkap_pria       || "Romeo Adiputra, S.T.";
  const groomParents= data.ortu_pria               || "Putra dari Bapak & Ibu Adiputra";
  const bride       = data.nama_wanita             || "Juliet";
  const brideFull   = data.nama_lengkap_wanita      || "Juliet Maharani, S.E.";
  const brideParents= data.ortu_wanita             || "Putri dari Bapak & Ibu Maharani";
  const akadDate    = data.tanggal_akad            || "2026-02-14T08:00:00";
  const akadTime    = data.waktu_akad              || "08:00 – 10:00 WIB";
  const akadLoc     = data.lokasi_akad             || "Masjid Istiqlal, Jakarta";
  const resepsiDate = data.tanggal_acara           || "2026-02-14T11:00:00";
  const resepsiTime = data.waktu_acara             || "11:00 WIB – Selesai";
  const resepsiLoc  = data.lokasi_acara            || "Grand Ballroom Hotel Indonesia";
  const mapsUrl     = data.maps_url                || "https://maps.google.com";
  const quote       = data.kutipan                 || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.";
  const quoteSource = data.sumber_kutipan          || "QS. Ar-Rum: 21";
  const coverUrl    = data.cover_url               || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop";

  const fmt = (d: string) => {
    try {
      return new Date(d).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch { return d; }
  };

  const countdown = useCountdown(akadDate);

  const handleCopy = () => {
    if (data.rekening_no) {
      navigator.clipboard.writeText(data.rekening_no);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRSVP = async (formData: FormData) => {
    setRsvpStatus("loading");
    formData.set("subdomain", subdomain);
    const result = await submitRsvp(formData);
    if (result.error) {
      alert(result.error);
      setRsvpStatus("idle");
    } else {
      const name       = formData.get("name") as string;
      const attendance = formData.get("attendance") as string;
      const message    = formData.get("message") as string;
      setMessages((prev) => [{ name, attendance, message }, ...prev]);
      setRsvpStatus("success");
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-rose-100" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        .font-serif-mr { font-family: 'Cormorant Garamond', serif; }
        .font-sans-mr  { font-family: 'Plus Jakarta Sans', sans-serif; }
        .mr-gradient   { background: linear-gradient(135deg, #fff1f2 0%, #fdf2f8 50%, #fff1f2 100%); }
        .mr-hero-overlay { background: linear-gradient(to bottom, rgba(15,10,10,0.35) 0%, rgba(120,40,55,0.55) 100%); }
        .mr-card       { background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,220,225,0.6); }
        .mr-scroll::-webkit-scrollbar { width: 4px; }
        .mr-scroll::-webkit-scrollbar-thumb { background: #fca5a5; border-radius: 99px; }
        @keyframes floatup { 0%{opacity:0;transform:translateY(24px)} 100%{opacity:1;transform:translateY(0)} }
        .mr-fadein { animation: floatup 0.8s ease both; }
        .mr-fadein-2 { animation: floatup 0.8s 0.2s ease both; }
        .mr-fadein-3 { animation: floatup 0.8s 0.4s ease both; }
      ` }} />

      {/* ── ENVELOPE GATE (preview bypass if activeTab set) ── */}
      {!envelope && !activeTab && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center mr-gradient px-6">
          <div className="text-center max-w-sm">
            {/* Ornamental lines */}
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="h-px w-16 bg-rose-300" />
              <Heart className="w-5 h-5 text-rose-500 fill-rose-400" />
              <div className="h-px w-16 bg-rose-300" />
            </div>

            <p className="font-sans-mr text-xs uppercase tracking-[0.4em] text-rose-400 mb-2">Kepada Yth.</p>
            <p className="font-sans-mr text-sm text-slate-500 mb-8">Bapak / Ibu / Saudara/i</p>

            <h1 className="font-serif-mr text-5xl text-rose-800 leading-tight mb-2">
              {groom} <span className="text-rose-400 italic">&</span> {bride}
            </h1>
            <p className="font-sans-mr text-sm text-slate-500 mt-3 mb-10">
              Mengundang Anda hadir dalam hari istimewa kami
            </p>

            <button
              onClick={() => setEnvelope(true)}
              className="inline-flex flex-col items-center gap-2 group"
            >
              <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-rose-500/30 group-hover:shadow-rose-500/50 group-hover:scale-105 transition-all duration-200">
                Buka Undangan
              </span>
              <ChevronDown className="w-4 h-4 text-rose-400 animate-bounce mt-1" />
            </button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="mr-section-tema" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 mr-hero-overlay" />
        </div>

        <div className="relative z-10 text-center px-6 mr-fadein">
          <p className="font-sans-mr uppercase tracking-[0.5em] text-xs text-rose-200 mb-5">The Wedding Of</p>

          <h1 className="font-serif-mr text-7xl md:text-9xl font-semibold text-white drop-shadow-lg leading-none">
            {groom}
          </h1>
          <p className="font-serif-mr text-3xl md:text-4xl text-rose-300 italic my-3">&</p>
          <h1 className="font-serif-mr text-7xl md:text-9xl font-semibold text-white drop-shadow-lg leading-none">
            {bride}
          </h1>

          <div className="flex items-center justify-center gap-4 mt-8 mr-fadein-2">
            <div className="h-px w-12 bg-white/40" />
            <p className="font-sans-mr text-white/80 text-sm tracking-widest">{fmt(resepsiDate)}</p>
            <div className="h-px w-12 bg-white/40" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mr-fadein-3">
          <span className="font-sans-mr text-white/50 text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="py-24 px-6 mr-gradient text-center">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px w-10 bg-rose-300" />
            <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
            <div className="h-px w-10 bg-rose-300" />
          </div>
          <p className="font-serif-mr italic text-slate-600 text-xl md:text-2xl leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="mt-6 font-sans-mr text-rose-500 font-semibold text-sm tracking-wide">— {quoteSource} —</p>
        </div>
      </section>

      {/* ── MEMPELAI ── */}
      <section id="mr-section-mempelai" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans-mr text-xs uppercase tracking-widest text-rose-400 mb-2">Mempelai</p>
          <h2 className="font-serif-mr text-4xl md:text-5xl text-slate-800 mb-16">Kami Berdua</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { full: groomFull, parents: groomParents, initial: groom[0] },
              { full: brideFull, parents: brideParents, initial: bride[0] },
            ].map(({ full, parents, initial }, i) => (
              <div key={i} className="mr-card rounded-3xl p-8 shadow-sm">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-300 to-pink-500 mx-auto mb-5 flex items-center justify-center shadow-lg">
                  <span className="font-serif-mr text-3xl text-white font-semibold">{initial}</span>
                </div>
                <h3 className="font-serif-mr text-2xl text-slate-800 font-semibold mb-2">{full}</h3>
                <p className="font-sans-mr text-slate-500 text-sm leading-relaxed">{parents}</p>
              </div>
            ))}
          </div>

          {/* Decorative AND */}
          <div className="my-10 flex items-center justify-center">
            <Heart className="w-10 h-10 text-rose-400 fill-rose-300" />
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-rose-600 to-pink-700 text-white text-center">
        <p className="font-sans-mr uppercase tracking-[0.4em] text-xs text-rose-200 mb-3">Menuju Hari Bahagia</p>
        <h2 className="font-serif-mr text-4xl md:text-5xl mb-12">{fmt(akadDate)}</h2>

        <div className="flex items-center justify-center gap-4 md:gap-8 max-w-lg mx-auto">
          {[
            { val: countdown.d, label: "Hari" },
            { val: countdown.h, label: "Jam" },
            { val: countdown.m, label: "Menit" },
            { val: countdown.s, label: "Detik" },
          ].map(({ val, label }) => (
            <div key={label} className="flex-1">
              <div className="bg-white/15 backdrop-blur rounded-2xl py-4 md:py-6 px-2 border border-white/20">
                <span className="font-sans-mr text-3xl md:text-5xl font-bold tabular-nums">
                  {String(val).padStart(2, "0")}
                </span>
              </div>
              <p className="font-sans-mr text-xs text-rose-200 mt-2 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACARA ── */}
      <section id="mr-section-acara" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans-mr text-xs uppercase tracking-widest text-rose-400 mb-2">Jadwal</p>
            <h2 className="font-serif-mr text-4xl md:text-5xl text-slate-800">Acara</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Akad Nikah", date: akadDate, time: akadTime, loc: akadLoc },
              { title: "Resepsi Pernikahan", date: resepsiDate, time: resepsiTime, loc: resepsiLoc },
            ].map(({ title, date, time, loc }) => (
              <div key={title} className="border border-rose-100 rounded-3xl p-8 hover:shadow-lg hover:border-rose-200 transition-all duration-300 group">
                <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-rose-100 transition-colors">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-300" />
                </div>
                <h3 className="font-serif-mr text-2xl text-slate-800 font-semibold mb-5">{title}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-600">
                    <Calendar className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="font-sans-mr text-sm">{fmt(date)}</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <Clock className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="font-sans-mr text-sm">{time}</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="font-sans-mr text-sm">{loc}</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Maps Button */}
          <div className="text-center mt-10">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-full font-sans-mr font-semibold text-sm hover:bg-black transition-colors shadow-lg hover:shadow-xl"
            >
              <MapPin className="w-4 h-4" />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ── AMPLOP DIGITAL (conditional) ── */}
      {data.rekening_no && (
        <section className="py-20 px-6 mr-gradient">
          <div className="max-w-md mx-auto text-center">
            <p className="font-sans-mr text-xs uppercase tracking-widest text-rose-400 mb-2">Hadiah</p>
            <h2 className="font-serif-mr text-4xl text-slate-800 mb-4">Amplop Digital</h2>
            <p className="font-sans-mr text-slate-500 text-sm mb-10 leading-relaxed">
              Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui:
            </p>

            <div className="mr-card rounded-3xl p-8 shadow-sm">
              <p className="font-sans-mr font-bold text-slate-800 text-lg">{data.bank_name || "BCA"}</p>
              <p className="font-mono text-2xl text-slate-700 my-3 tracking-widest">{data.rekening_no}</p>
              <p className="font-sans-mr text-slate-500 text-sm mb-6">a.n {data.rekening_nama || "Nama Lengkap"}</p>
              <button
                onClick={handleCopy}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-2xl font-sans-mr font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
              >
                {copied ? <><Check className="w-4 h-4" /> Berhasil Disalin</> : <><Copy className="w-4 h-4" /> Salin Nomor Rekening</>}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── RSVP & UCAPAN ── */}
      <section id="mr-section-fitur" className="py-24 px-6 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-sans-mr text-xs uppercase tracking-widest text-rose-400 mb-2">Konfirmasi</p>
            <h2 className="font-serif-mr text-4xl md:text-5xl text-slate-800 mb-4">RSVP & Ucapan</h2>
            <p className="font-sans-mr text-slate-500 text-sm">
              Kehadiran dan doa restu Anda sangat berarti bagi kami.
            </p>
          </div>

          {rsvpStatus === "success" ? (
            <div className="text-center py-12 mr-card rounded-3xl">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-serif-mr text-2xl text-slate-800 mb-2">Terima Kasih!</h3>
              <p className="font-sans-mr text-slate-500 text-sm">Ucapan dan konfirmasi kehadiran Anda telah kami terima.</p>
            </div>
          ) : (
            <form action={handleRSVP} className="mr-card rounded-3xl p-8 space-y-5 shadow-sm">
              {[
                { name: "name", label: "Nama Lengkap", type: "text", placeholder: "Tulis nama Anda" },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="block font-sans-mr text-slate-700 text-sm font-medium mb-2">{label}</label>
                  <input
                    required name={name} type={type}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all bg-white font-sans-mr text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="block font-sans-mr text-slate-700 text-sm font-medium mb-2">Kehadiran</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "Hadir", label: "✓  Hadir", active: "bg-rose-600 text-white border-rose-600" },
                    { value: "Tidak Hadir", label: "✗  Tidak Hadir", active: "bg-slate-800 text-white border-slate-800" },
                  ].map(({ value, label }) => (
                    <label key={value} className="relative cursor-pointer">
                      <input type="radio" name="attendance" value={value} className="peer sr-only" defaultChecked={value === "Hadir"} />
                      <div className="w-full py-3 rounded-xl border border-rose-100 text-center font-sans-mr font-semibold text-sm text-slate-600 peer-checked:bg-rose-600 peer-checked:text-white peer-checked:border-rose-600 transition-all">
                        {label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-sans-mr text-slate-700 text-sm font-medium mb-2">Pesan & Doa</label>
                <textarea
                  required name="message" rows={4}
                  placeholder="Tuliskan ucapan dan doa untuk kedua mempelai…"
                  className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all resize-none bg-white font-sans-mr text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={rsvpStatus === "loading"}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-2xl font-sans-mr font-bold text-sm hover:opacity-90 hover:scale-[1.01] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
              >
                {rsvpStatus === "loading"
                  ? "Mengirim…"
                  : <><MessageSquareHeart className="w-5 h-5" /> Kirim Ucapan</>
                }
              </button>
            </form>
          )}

          {/* Guest messages list */}
          {messages.length > 0 && (
            <div className="mt-8">
              <p className="font-sans-mr text-sm font-semibold text-slate-700 mb-4">
                {messages.length} Ucapan Tamu
              </p>
              <GuestMessages messages={messages} />
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 text-center bg-gradient-to-br from-rose-700 to-pink-800 text-white">
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="h-px w-12 bg-white/30" />
          <Heart className="w-5 h-5 text-white fill-white/60" />
          <div className="h-px w-12 bg-white/30" />
        </div>
        <h2 className="font-serif-mr text-4xl md:text-5xl mb-3">{groom} & {bride}</h2>
        <p className="font-sans-mr text-rose-200 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <p className="font-sans-mr text-[11px] text-white/40">
          Dibuat dengan ❤ menggunakan{" "}
          <a href="https://upshare.id" className="underline underline-offset-2 hover:text-white/60">
            upshare.id
          </a>
        </p>
      </footer>
    </div>
  );
}
