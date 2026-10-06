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
          width: 120,
          height: 120,
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
      width={150}
      height={150}
      className="member-avatar"
      style={{
        width: 150,
        height: 150,
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

export default function AdvisoryPanelView({ year }: { year?: '2026' | '2027' }) {
  const [members, setMembers] = useState<AdvisoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const pageSlug = year ? `advisory-panel-${year}` : 'advisory-panel';
  const pageTitle = year ? `Advisory Panel ${year}` : 'Advisory Panel';

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const page = await fetchWebsitePageBySlug(pageSlug);

        const extractedMembers = extractMembers(page);

        setMembers(extractedMembers);
      } catch {
        setError('Unable to load Advisory Panel.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [pageSlug]);

  return (
    <main className="advisory-page">
      <section className="advisory-hero">
        <div className="container">
          <span className="title-badge">MEA CIO CHOICE</span>

          <h1>{pageTitle}</h1>

          <p className="hero-description">
            Visionary CIOs and technology leaders guiding innovation, digital transformation and
            excellence across the Middle East & Africa.
          </p>
        </div>
      </section>

      <section className="members-section">
        <div className="container">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8e0101]" />
            </div>
          )}

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
