// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchWebsitePageBySlug, WebsitePage } from '@/services/pages.services';

// interface AdvisoryMember {
//   id: string;
//   name: string;
//   designation: string;
//   company: string;
//   avatar: string;
// }

// function getInitials(name: string) {
//   return name
//     .split(' ')
//     .slice(0, 2)
//     .map((word) => word[0])
//     .join('')
//     .toUpperCase();
// }

// function Avatar({
//   name,
//   avatar,
// }: {
//   name: string;
//   avatar: string;
// }) {
//   const [error, setError] = useState(!avatar);

//   if (error) {
//     return (
//       <div
//         className="member-avatar-fallback"
//         style={{
//           width: 80,
//           height: 80,
//           borderRadius: '50%',
//           background: '#8e0101',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           color: '#fff',
//           fontWeight: 700,
//           fontSize: 22,
//           margin: '0 auto 20px',
//         }}
//       >
//         {getInitials(name)}
//       </div>
//     );
//   }

//   return (
//     <img
//       src={avatar}
//       alt={name}
//       className="member-avatar"
//       onError={() => setError(true)}
//     />
//   );
// }

// function extractMembers(page: WebsitePage | null): AdvisoryMember[] {
//   if (!page) return [];

//   const content = (page as any).content;

//   if (!content?.blocks) return [];

//   const testimonialBlock = content.blocks.find(
//     (block: any) => block.type === 'testimonialsSection'
//   );

//   if (!testimonialBlock) return [];

//   return (testimonialBlock.data.testimonials || []).map(
//     (item: any, index: number) => ({
//       id: `${index}`,
//       name: item.author,
//       designation: item.role,
//       company: item.quote,
//       avatar: item.avatar,
//     })
//   );
// }

// export default function AdvisoryPanel() {
//   const [members, setMembers] = useState<AdvisoryMember[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const page = await fetchWebsitePageBySlug('advisory-panel');

//         const result = extractMembers(page);

//         setMembers(result);
//       } catch (err) {
//         console.error(err);
//         setError('Unable to load Advisory Panel');
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadData();
//   }, []);

//   return (
//     <main className="advisory-page">
//       <section className="advisory-hero">
//         <div className="container">
//           <span className="title-badge">
//             CIO CHOICE MEA 2026
//           </span>

//           <h1>ADVISORY PANEL</h1>

//           <p className="hero-description">
//               Visionary CIOs and technology leaders guiding innovation,
//               digital transformation and excellence across the Middle East & Africa.
//           </p>

//         </div>
//       </section>

//       <section className="members-section">
//         <div className="container">

//           {loading && (
//             <div className="text-center py-12">
//               Loading Advisory Panel...
//             </div>
//           )}

//           {!loading && error && (
//             <div className="text-center py-12 text-red-500">
//               {error}
//             </div>
//           )}

//           {!loading && !error && (
//             <div className="members-grid">

//               {members.map((member) => (
//                 <div
//                   key={member.id}
//                   className="member-card"
//                 >
//                   <Avatar
//                     name={member.name}
//                     avatar={member.avatar}
//                   />

//                   <h3>{member.name}</h3>

//                   <p className="designation">
//                     {member.designation}
//                   </p>

//                   <span className="company">
//                     {member.company}
//                   </span>
//                 </div>
//               ))}

//             </div>
//           )}

//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, WebsitePage } from '@/services/pages.services';

interface AdvisoryMember {
  id: string;
  name: string;
  designation: string;
  company: string;
  avatar: string;
}

interface Testimonial {
  author: string;
  role: string;
  quote: string;
  avatar: string;
}

interface TestimonialsSectionBlock {
  type: 'testimonialsSection';
  data: {
    sectionTitle?: string;
    testimonials: Testimonial[];
  };
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}

function Avatar({ name, avatar }: { name: string; avatar: string }) {
  const [imageError, setImageError] = useState(!avatar);

  if (imageError) {
    return (
      <div
        className="member-avatar-fallback"
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#8e0101',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 22,
          fontWeight: 700,
          margin: '0 auto 20px',
        }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <Image
      src={avatar}
      alt={name}
      width={80}
      height={80}
      className="member-avatar"
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        objectFit: 'cover',
        margin: '0 auto 20px',
      }}
      onError={() => setImageError(true)}
    />
  );
}

function extractMembers(page: WebsitePage | null): AdvisoryMember[] {
  if (!page?.content?.blocks) {
    return [];
  }

  const testimonialBlock = (page.content.blocks as unknown as TestimonialsSectionBlock[]).find(
    (block) => block.type === 'testimonialsSection',
  );

  if (!testimonialBlock?.data?.testimonials) {
    return [];
  }

  return testimonialBlock.data.testimonials.map((item, index) => ({
    id: String(index),
    name: item.author,
    designation: item.role,
    company: item.quote,
    avatar: item.avatar,
  }));
}

export default function AdvisoryPanel() {
  const [members, setMembers] = useState<AdvisoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const page = await fetchWebsitePageBySlug('advisory-panel');

        const extractedMembers = extractMembers(page);

        setMembers(extractedMembers);
      } catch {
        setError('Unable to load Advisory Panel.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main className="advisory-page">
      <section className="advisory-hero">
        <div className="container">
          <span className="title-badge">MEA CIO CHOICE</span>

          <h1>Advisory Panel</h1>

          <p className="hero-description">
            Visionary CIOs and technology leaders guiding innovation, digital transformation and
            excellence across the Middle East & Africa.
          </p>
        </div>
      </section>

      <section className="members-section">
        <div className="container">
          {loading && <div className="text-center py-12">Loading Advisory Panel...</div>}

          {!loading && error && <div className="text-center py-12 text-red-500">{error}</div>}

          {!loading && !error && members.length === 0 && (
            <div className="text-center py-12">No advisory members found.</div>
          )}

          {!loading && members.length > 0 && (
            <div className="members-grid">
              {members.map((member) => (
                <div key={member.id} className="member-card">
                  <Avatar name={member.name} avatar={member.avatar} />

                  <h3>{member.name}</h3>

                  <p className="designation">{member.designation}</p>

                  <span className="company">{member.company}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
