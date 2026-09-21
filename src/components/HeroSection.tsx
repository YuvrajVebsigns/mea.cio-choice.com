'use client';

import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="hero-section">
      <video className="hero-video" autoPlay loop muted playsInline preload="auto">
        <source src="/assets/hero/mea22.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-overlay" />

      <button onClick={handleScroll} className="scroll-btn" aria-label="Scroll Down">
        <span>Scroll Down</span>
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
