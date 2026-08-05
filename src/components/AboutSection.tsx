// // 'use client';

// // import Link from 'next/link';
// // import { ArrowRight, ShieldCheck, Trophy, Lightbulb, BadgeCheck } from 'lucide-react';

// // const highlights = [
// //   {
// //     icon: ShieldCheck,
// //     title: 'Chosen by CIOs, Trusted by Enterprises',
// //   },
// //   {
// //     icon: Lightbulb,
// //     title: 'Recognizing Excellence, Empowering Innovation',
// //   },
// //   {
// //     icon: Trophy,
// //     title: 'Celebrating Technology That Powers Business',
// //   },
// //   {
// //     icon: BadgeCheck,
// //     title: 'Recognized by CIOs, Respected by Industry',
// //   },
// // ];

// // export default function AboutSection() {
// //   return (
// //     <section className="about-home">
// //       <div className="container about-wrapper">
// //         <div className="about-left">
// //           <span className="about-tag">MEA CIO CHOICE</span>

// //           <h2>
// //             Where CIOs <span>Voice Their Choice</span>
// //           </h2>

// //           <p>
// //             CIO CHOICE brings technology leaders together to recognize ICT brands shaping the
// //             future. More than an event, it&apos;s where insights, networking, and
// //             enterprise-enabling technologies come together.
// //           </p>

// //           <Link href="/about-us" className="about-btn">
// //             Read More
// //             <ArrowRight size={18} />
// //           </Link>
// //         </div>

// //         <div className="about-right">
// //           {highlights.map((item, index) => {
// //             const Icon = item.icon;

// //             return (
// //               <div
// //                 className="highlight-card"
// //                 key={index}
// //                 style={{ animationDelay: `${index * 0.15}s` }}
// //               >
// //                 <div className="highlight-icon">
// //                   <Icon size={42} strokeWidth={2} />
// //                 </div>

// //                 <h3>{item.title}</h3>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// 'use client';

// import Link from 'next/link';
// import { ArrowRight, ShieldCheck, Trophy, Lightbulb, BadgeCheck } from 'lucide-react';
// import { useEffect, useRef } from 'react';

// const highlights = [
//   {
//     icon: ShieldCheck,
//     title: 'Chosen by CIOs, Trusted by Enterprises',
//   },
//   {
//     icon: Lightbulb,
//     title: 'Recognizing Excellence, Empowering Innovation',
//   },
//   {
//     icon: Trophy,
//     title: 'Celebrating Technology That Powers Business',
//   },
//   {
//     icon: BadgeCheck,
//     title: 'Recognized by CIOs, Respected by Industry',
//   },
// ];

// export default function AboutSection() {
//   const sectionRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     const section = sectionRef.current;

//     if (!section) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           section.classList.add('in-view');

//           // Run animation only once.
//           observer.unobserve(section);
//         }
//       },
//       {
//         threshold: 0.2,
//       },
//     );

//     observer.observe(section);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <section ref={sectionRef} className="about-home">
//       <div className="container about-wrapper">

//         {/* LEFT CONTENT */}
//         <div className="about-left scroll-reveal">
//           <span className="about-tag">MEA CIO CHOICE</span>

//           <h2>
//             Where CIOs <span>Voice Their Choice</span>
//           </h2>

//           <p>
//             CIO CHOICE brings technology leaders together to recognize ICT
//             brands shaping the future. More than an event, it&apos;s where
//             insights, networking, and enterprise-enabling technologies come
//             together.
//           </p>

//           <Link href="/about-us" className="about-btn">
//             Read More
//             <ArrowRight size={18} />
//           </Link>
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="about-right">
//           {highlights.map((item, index) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 className="highlight-card scroll-reveal-card"
//                 key={index}
//                 style={{
//                   animationDelay: `${index * 0.15}s`,
//                 }}
//               >
//                 <div className="highlight-icon">
//                   <Icon size={42} strokeWidth={2} />
//                 </div>

//                 <h3>{item.title}</h3>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </section>
//   );
// }

'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Trophy, Lightbulb, BadgeCheck } from 'lucide-react';
import { useEffect, useRef } from 'react';

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Chosen by CIOs, Trusted by Enterprises',
  },
  {
    icon: Lightbulb,
    title: 'Recognizing Excellence, Empowering Innovation',
  },
  {
    icon: Trophy,
    title: 'Celebrating Technology That Powers Business',
  },
  {
    icon: BadgeCheck,
    title: 'Recognized by CIOs, Respected by Industry',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          section.classList.add('in-view');

          // Run animation only once.
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-home">
      <div className="container about-wrapper">
        {/* LEFT CONTENT */}
        <div className="about-left scroll-reveal">
          <span className="about-tag">MEA CIO CHOICE</span>

          <h2>
            Where CIOs <span>Voice Their Choice</span>
          </h2>

          <p>
            CIO CHOICE brings technology leaders together to recognize ICT brands shaping the
            future. More than an event, it&apos;s where insights, networking, and
            enterprise-enabling technologies come together.
          </p>

          <Link href="/about-us" className="about-btn">
            Read More
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* RIGHT CONTENT */}
        <div className="about-right">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                className="highlight-card scroll-reveal-card"
                key={index}
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <div className="highlight-icon">
                  <Icon size={42} strokeWidth={2} />
                </div>

                <h3>{item.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
