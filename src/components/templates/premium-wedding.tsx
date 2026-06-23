"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  MapPin,
  Heart,
  Clock,
  Copy,
  Check,
  MessageSquareHeart,
  ChevronDown,
  Star,
} from "lucide-react";
import { submitRsvp } from "@/app/actions/undangan";

interface PremiumWeddingTemplateProps {
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
    <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
      {messages.map((m, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-playfair font-semibold text-slate-800">{m.name}</span>
            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium tracking-wide ${
                m.attendance === "Hadir"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {m.attendance}
            </span>
          </div>
          <p className="font-lora text-slate-500 text-sm leading-relaxed italic">
            &ldquo;{m.message}&rdquo;
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Template ──────────────────────────────────── */
export function PremiumWeddingTemplate({
  data,
  subdomain,
  activeTab,
}: PremiumWeddingTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "loading" | "success">("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [envelope, setEnvelope] = useState(false);

  // Sync with activeTab from editor
  useEffect(() => {
    if (!activeTab) return;
    const map: Record<string, string> = {
      tema: "pw-section-tema",
      mempelai: "pw-section-mempelai",
      acara: "pw-section-acara",
      fitur: "pw-section-fitur",
    };
    const el = document.getElementById(map[activeTab]);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeTab]);

  // Fallbacks
  const groom        = data.nama_pria              || "Romeo";
  const groomFull    = data.nama_lengkap_pria       || "Romeo Adiputra, S.T.";
  const groomParents = data.ortu_pria               || "Putra dari Bapak & Ibu Adiputra";
  const bride        = data.nama_wanita             || "Juliet";
  const brideFull    = data.nama_lengkap_wanita     || "Juliet Maharani, S.E.";
  const brideParents = data.ortu_wanita             || "Putri dari Bapak & Ibu Maharani";
  const akadDate     = data.tanggal_akad            || "2026-12-31T08:00:00";
  const akadTime     = data.waktu_akad              || "08:00 – 10:00 WIB";
  const akadLocation = data.lokasi_akad             || "Masjid Agung Jakarta";
  const resepsiDate  = data.tanggal_acara           || "2026-12-31T11:00:00";
  const resepsiTime  = data.waktu_acara             || "11:00 WIB – Selesai";
  const resepsiLocation = data.lokasi_acara         || "Grand Ballroom Hotel Indonesia, Jakarta";
  const mapsUrl      = data.maps_url                || "https://maps.google.com";
  const quote        = data.kutipan                 || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.";
  const quoteSource  = data.sumber_kutipan          || "QS. Ar-Rum: 21";
  const coverUrl     = data.cover_url               || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop";

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const countdown = useCountdown(akadDate);

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
      const name       = formData.get("name") as string;
      const attendance = formData.get("attendance") as string;
      const message    = formData.get("message") as string;
      setMessages((prev) => [{ name, attendance, message }, ...prev]);
      setRsvpStatus("success");
    }
  };

  return (
    <div className="bg-stone-50 relative selection:bg-amber-100">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');

        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lora     { font-family: 'Lora', serif; }
        .font-jost     { font-family: 'Jost', sans-serif; }

        .pw-glass {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 20px 60px -10px rgba(0,0,0,0.08);
        }
        .pw-gold-gradient { background: linear-gradient(135deg, #d4a96a 0%, #b8860b 50%, #d4a96a 100%); }
        .pw-bg { background: linear-gradient(160deg, #faf8f5 0%, #f5f0e8 50%, #faf8f5 100%); }
        .pw-hero-overlay { background: linear-gradient(to bottom, rgba(10,8,6,0.28) 0%, rgba(60,40,20,0.62) 100%); }

        @keyframes pw-rise { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .pw-rise-1 { animation: pw-rise 1s 0.1s ease both; }
        .pw-rise-2 { animation: pw-rise 1s 0.35s ease both; }
        .pw-rise-3 { animation: pw-rise 1s 0.6s ease both; }

        .pw-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }
        .pw-divider::before, .pw-divider::after {
          content: '';
          flex: 1;
          max-width: 80px;
          height: 1px;
          background: linear-gradient(to right, transparent, #c9a96e, transparent);
        }
      ` }} />

      {/* ── ENVELOPE GATE ── */}
      {!envelope && !activeTab && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pw-bg px-6">
          <div className="text-center max-w-sm">
            {/* Ornament */}
            <div className="pw-divider mb-8">
              <Star className="w-4 h-4 text-amber-600 fill-amber-400" />
            </div>

            <p className="font-jost text-[10px] uppercase tracking-[0.5em] text-amber-700 mb-2">
              Kepada Yth.
            </p>
            <p className="font-lora text-stone-500 text-sm mb-8 italic">
              Bapak / Ibu / Saudara/i
            </p>

            <h1 className="font-playfair text-5xl text-stone-800 leading-tight mb-1">
              {groom}
            </h1>
            <p className="font-playfair text-2xl text-amber-600 italic my-2">&</p>
            <h1 className="font-playfair text-5xl text-stone-800 leading-tight mb-8">
              {bride}
            </h1>

            <p className="font-lora text-stone-500 text-sm mb-10 italic">
              Mengundang Anda hadir dalam hari bahagia kami
            </p>

            <button
              onClick={() => setEnvelope(true)}
              className="group inline-flex flex-col items-center gap-2"
            >
              <span className="pw-gold-gradient text-white px-9 py-3.5 rounded-full font-jost font-medium tracking-widest text-sm shadow-lg shadow-amber-800/20 group-hover:shadow-amber-800/40 group-hover:scale-105 transition-all duration-300">
                Buka Undangan
              </span>
              <ChevronDown className="w-4 h-4 text-amber-600 animate-bounce mt-1" />
            </button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="pw-section-tema" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 pw-hero-overlay z-10" />
          <img src={coverUrl} alt="Wedding Cover" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <p className="font-jost uppercase tracking-[0.6em] text-xs text-amber-200 mb-6 pw-rise-1">
            The Wedding Of
          </p>
          <h1 className="font-playfair text-6xl md:text-9xl font-bold drop-shadow-xl leading-none pw-rise-2">
            {groom}
            <span className="block font-playfair italic font-normal text-amber-300 text-4xl md:text-6xl my-3">
              &amp;
            </span>
            {bride}
          </h1>
          <div className="pw-divider mt-8 pw-rise-3" style={{ "--tw-divider-color": "rgba(255,255,255,0.3)" } as any}>
            <p className="font-lora text-white/80 tracking-widest text-sm">
              {formatDate(resepsiDate)}
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pw-rise-3">
          <span className="font-jost text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="pw-divider mb-10">
            <Heart className="w-5 h-5 text-amber-500 fill-amber-400" />
          </div>
          <p className="font-lora italic text-stone-600 text-xl md:text-2xl leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="mt-6 font-jost text-amber-700 font-medium text-sm tracking-widest uppercase">
            — {quoteSource} —
          </p>
        </div>
      </section>

      {/* ── MEMPELAI ── */}
      <section id="pw-section-mempelai" className="py-24 px-6 pw-bg">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-jost text-[10px] uppercase tracking-[0.5em] text-amber-700 mb-2">Mempelai</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-stone-800 mb-16">Kami Berdua</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { full: groomFull, parents: groomParents, initial: groom[0] },
              { full: brideFull, parents: brideParents, initial: bride[0] },
            ].map(({ full, parents, initial }, i) => (
              <div key={i} className="pw-glass rounded-[2.5rem] p-10">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full pw-gold-gradient mx-auto mb-6 flex items-center justify-center shadow-lg shadow-amber-700/20">
                  <span className="font-playfair text-3xl text-white font-bold">{initial}</span>
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-stone-800 mb-3">{full}</h3>
                <p className="font-lora text-stone-500 text-sm leading-relaxed">{parents}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center">
            <div className="pw-gold-gradient w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-amber-700/20">
              <Heart className="w-5 h-5 text-white fill-white/80" />
            </div>
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="py-20 px-6 bg-stone-900 text-white text-center">
        <p className="font-jost text-[10px] uppercase tracking-[0.5em] text-amber-400 mb-3">Menuju Hari Bahagia</p>
        <h2 className="font-playfair text-3xl md:text-5xl mb-12">{formatDate(akadDate)}</h2>

        <div className="flex items-center justify-center gap-4 md:gap-8 max-w-lg mx-auto">
          {[
            { val: countdown.d, label: "Hari" },
            { val: countdown.h, label: "Jam" },
            { val: countdown.m, label: "Menit" },
            { val: countdown.s, label: "Detik" },
          ].map(({ val, label }) => (
            <div key={label} className="flex-1">
              <div className="bg-white/8 backdrop-blur border border-white/10 rounded-2xl py-5 md:py-7 px-2">
                <span className="font-playfair text-3xl md:text-5xl font-bold tabular-nums text-amber-300">
                  {String(val).padStart(2, "0")}
                </span>
              </div>
              <p className="font-jost text-[10px] text-stone-400 mt-2 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACARA ── */}
      <section id="pw-section-acara" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-jost text-[10px] uppercase tracking-[0.5em] text-amber-700 mb-2">Jadwal</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone-800">Acara</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Akad Nikah",          date: akadDate,    time: akadTime,    loc: akadLocation },
              { title: "Resepsi Pernikahan",   date: resepsiDate, time: resepsiTime, loc: resepsiLocation },
            ].map(({ title, date, time, loc }) => (
              <div key={title} className="border border-stone-100 bg-stone-50 rounded-3xl p-8 hover:shadow-xl hover:border-amber-200 transition-all duration-300 group">
                <div className="w-10 h-10 pw-gold-gradient rounded-xl flex items-center justify-center mb-5 shadow-md shadow-amber-700/20 group-hover:scale-110 transition-transform">
                  <Heart className="w-4 h-4 text-white fill-white/80" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-5">{title}</h3>
                <ul className="space-y-3 font-lora text-stone-600">
                  <li className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{formatDate(date)}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{time}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{loc}</span>
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
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full font-jost font-medium text-sm hover:bg-black transition-colors shadow-lg hover:shadow-xl tracking-wide"
            >
              <MapPin className="w-4 h-4" />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ── AMPLOP DIGITAL ── */}
      {data.rekening_no && (
        <section className="py-24 px-6 pw-bg">
          <div className="max-w-xl mx-auto text-center">
            <p className="font-jost text-[10px] uppercase tracking-[0.5em] text-amber-700 mb-2">Hadiah</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone-800 mb-4">Wedding Gift</h2>
            <p className="font-lora text-stone-500 text-sm mb-10 leading-relaxed italic">
              Bagi keluarga dan sahabat yang ingin memberikan tanda kasih, dapat mengirimkan melalui:
            </p>

            <div className="pw-glass rounded-3xl p-8 md:p-10">
              <p className="font-playfair font-bold text-stone-800 text-xl">{data.bank_name || "BCA"}</p>
              <p className="font-mono text-3xl text-stone-700 my-4 tracking-widest">{data.rekening_no}</p>
              <p className="font-lora text-stone-500 text-sm mb-7">a.n {data.rekening_nama || "Nama Lengkap"}</p>
              <button
                onClick={handleCopyRekening}
                className="w-full pw-gold-gradient text-white py-3.5 rounded-2xl font-jost font-medium text-sm transition-all hover:opacity-90 hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-amber-700/20 tracking-wide"
              >
                {copied ? <><Check className="w-4 h-4" /> Berhasil Disalin</> : <><Copy className="w-4 h-4" /> Salin Nomor Rekening</>}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── RSVP & UCAPAN ── */}
      <section id="pw-section-fitur" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-jost text-[10px] uppercase tracking-[0.5em] text-amber-700 mb-2">Konfirmasi</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone-800 mb-4">RSVP &amp; Ucapan</h2>
            <p className="font-lora text-stone-500 text-sm italic">
              Kehadiran dan doa restu Anda sangat berarti bagi kami.
            </p>
          </div>

          {rsvpStatus === "success" ? (
            <div className="text-center py-14 pw-glass rounded-3xl">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="font-playfair text-2xl text-stone-800 font-semibold mb-2">Terima Kasih!</h3>
              <p className="font-lora text-stone-500 text-sm italic">Ucapan dan konfirmasi kehadiran Anda telah kami terima.</p>
            </div>
          ) : (
            <form action={handleRSVPAction} className="pw-glass rounded-3xl p-8 md:p-10 space-y-6">
              <div>
                <label className="block font-jost text-stone-700 text-sm font-medium mb-2 tracking-wide">Nama Lengkap</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Tulis nama Anda"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none transition-all bg-white/60 font-lora text-sm"
                />
              </div>

              <div>
                <label className="block font-jost text-stone-700 text-sm font-medium mb-2 tracking-wide">Kehadiran</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "Hadir",       label: "✓  Hadir" },
                    { value: "Tidak Hadir", label: "✗  Tidak Hadir" },
                  ].map(({ value, label }) => (
                    <label key={value} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value={value}
                        className="peer sr-only"
                        defaultChecked={value === "Hadir"}
                      />
                      <div className="w-full py-3 rounded-xl border border-stone-200 text-center font-jost font-medium text-sm text-stone-600 peer-checked:bg-stone-900 peer-checked:text-white peer-checked:border-stone-900 transition-all">
                        {label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-jost text-stone-700 text-sm font-medium mb-2 tracking-wide">Pesan &amp; Doa</label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tuliskan ucapan dan doa untuk kedua mempelai…"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none transition-all resize-none bg-white/60 font-lora text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={rsvpStatus === "loading"}
                className="w-full pw-gold-gradient text-white py-4 rounded-2xl font-jost font-medium text-sm hover:opacity-90 hover:scale-[1.01] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-amber-700/20 tracking-widest"
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
            <div className="mt-10">
              <p className="font-jost text-sm font-medium text-stone-600 mb-5 tracking-wide">
                {messages.length} Ucapan Tamu
              </p>
              <GuestMessages messages={messages} />
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 px-6 text-center bg-stone-900 text-white">
        <div className="pw-divider mb-8" style={{ "--tw-divider-color": "rgba(255,255,255,0.15)" } as any}>
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl mb-4">
          {groom} <span className="text-amber-400 italic">&</span> {bride}
        </h2>
        <p className="font-lora text-stone-400 text-sm mb-12 max-w-sm mx-auto leading-relaxed italic">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <p className="font-jost text-[11px] text-stone-600 tracking-widest">
          Dibuat dengan ❤ menggunakan{" "}
          <a href="https://upshare.id" className="text-amber-500 hover:text-amber-400 underline underline-offset-2 transition-colors">
            upshare.id
          </a>
        </p>
      </footer>
    </div>
  );
}
