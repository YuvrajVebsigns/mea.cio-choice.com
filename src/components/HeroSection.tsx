// // 'use client';

// // import Image from 'next/image';

// // export default function HeroSection() {
// //   return (
// //     <section className="hero-section">
// //       <br />
// //        <Image
// //     src="/assets/hero/cio-choice2.png"
// //     alt="CIO Choice"
// //     width={1400}
// //     height={800}
// //     priority
// //     className="hero-image"
// //   />
// //       <div className="hero-overlay" />
// //     </section>
// //   );
// // }

// 'use client';

// import Image from 'next/image';
// import { ArrowDown } from 'lucide-react';

// export default function HeroSection() {
//   const handleScroll = () => {
//     window.scrollBy({
//       top: window.innerHeight,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <section className="hero-section">
//       <Image
//         src="/assets/hero/Heading.png"
//         alt="CIO Choice"
//         width={1400}
//         height={800}
//         priority
//         className="hero-image"
//       />

//       <button onClick={handleScroll} className="scroll-btn" aria-label="Scroll Down">
//         <span>Scroll Down</span>
//         <ArrowDown size={18} />
//       </button>

//       <div className="hero-overlay" />
//     </section>
//   );
// }

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
        <source src="/assets/hero/hero-video.mp4" type="video/mp4" />
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
