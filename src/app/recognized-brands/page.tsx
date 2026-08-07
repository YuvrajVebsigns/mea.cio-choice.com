'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, WebsitePage } from '@/services/pages.services';

interface Brand {
  id: string;
  name: string;
  category: string;
  logo: string;
  [key: string]: unknown;
}

interface Testimonial {
  id?: string;
  author?: string;
  name?: string;
  quote?: string;
  category?: string;
  avatar?: string;
  logo?: string;
}

interface TestimonialsSection {
  type: string;
  data?: {
    testimonials?: Testimonial[];
  };
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}

function BrandLogo({ name, logo }: { name: string; logo: string }) {
  const [imageError, setImageError] = useState(!logo);

  if (imageError) {
    return (
      <div
        className="brand-logo-fallback"
        style={{
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#8e0101',
          borderRadius: '50%',
          color: '#fff',
          fontSize: '18px',
          fontWeight: 'bold',
          margin: '0 auto 15px',
        }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <Image
      src={logo}
      alt={name}
      width={120}
      height={80}
      className="brand-logo"
      style={{
        maxHeight: '80px',
        maxWidth: '120px',
        objectFit: 'contain',
        margin: '0 auto 15px',
      }}
      onError={() => setImageError(true)}
    />
  );
}

function extractBrandsFromPage(page: WebsitePage | null): Brand[] {
  if (!page?.content?.blocks) {
    return [];
  }

  const testimonialBlock = (page.content.blocks as TestimonialsSection[]).find(
    (block) => block.type === 'testimonialsSection',
  );

  if (!testimonialBlock?.data?.testimonials) {
    return [];
  }

  return testimonialBlock.data.testimonials
    .filter((brand) => !!(brand.author || brand.name))
    .map((brand, index) => ({
      id: brand.id ?? `brand-${index}`,
      name: brand.author ?? brand.name ?? '',
      category: brand.quote ?? brand.category ?? '',
      logo: brand.avatar ?? brand.logo ?? '',
    }));
}

export default function RecognizedBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBrands() {
      try {
        setIsLoading(true);
        setError(null);

        const page = await fetchWebsitePageBySlug('recognized-brands');

        const extractedBrands = extractBrandsFromPage(page);

        if (extractedBrands.length === 0) {
          setError('No brands data found in the API response');
        }

        setBrands(extractedBrands);
      } catch {
        setError('Failed to load brands from API');
        setBrands([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadBrands();
  }, []);

  return (
    <main className="recognized-page">
      <section className="recognized-header">
        <div className="container">
          <span className="title-badge">CIO CHOICE MEA 2026</span>

          <h1>RECOGNIZED BRANDS</h1>
        </div>
      </section>

      <section className="brands-section">
        <div className="container">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Loading brands...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="flex items-center justify-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!isLoading && !error && brands.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">No brands available</p>
            </div>
          )}

          {!isLoading && brands.length > 0 && (
            <div className="brands-grid">
              {brands.map((brand) => (
                <div className="brand-card" key={brand.id}>
                  <BrandLogo name={brand.name} logo={brand.logo} />

                  <h3>{brand.name}</h3>

                  <div className="category">
                    <small>Category</small>

                    <p>{brand.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
