'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Send } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { submitWebsiteSubscribe } from '@/services/subscribers.service';
import footerData from '@/data/footer.json';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

interface ContactItem {
  type: 'phone' | 'email' | string;
  label: string;
  href: string;
}

interface SocialItem {
  name: string;
  href: string;
  icon: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | string;
}

interface FooterData {
  brand: {
    logo: string;
    alt: string;
    width: number;
    height: number;
    href: string;
    description: string;
  };
  columns: FooterColumn[];
  subscribe: {
    title: string;
    placeholder: string;
  };
  office: {
    title: string;
    addressLines: string[];
  };
  contacts: ContactItem[];
  socials: SocialItem[];
  copyright: string;
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  youtube: <FaYoutube />,
  twitter: <FaXTwitter />,
  linkedin: <FaLinkedinIn />,
};

const CONTACT_ICONS: Record<string, React.ReactNode> = {
  phone: <Phone size={16} />,
  email: <Mail size={16} />,
};

export default function Footer() {
  const data: FooterData = footerData as FooterData;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>, contact: ContactItem) => {
    if (contact.type !== 'email') {
      return;
    }

    const emailAddress = (contact.label || contact.href.replace(/^mailto:/i, '')).trim();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

    event.preventDefault();
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await submitWebsiteSubscribe({ email });
      setEmail('');
      setMessage({
        type: 'success',
        text: response?.message || 'Subscribed successfully!',
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error ? error.message : 'Failed to subscribe. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-widget footer-brand">
              <Link href={data.brand.href} className="footer-logo">
                <Image
                  src={data.brand.logo}
                  alt={data.brand.alt}
                  width={data.brand.width}
                  height={data.brand.height}
                  priority
                />
              </Link>

              <p className="footer-description">{data.brand.description}</p>
            </div>

            {/* Dynamic Link Columns */}
            {data.columns.map((column) => (
              <div key={column.id} className="footer-widget">
                <h4 className="footer-title">{column.title}</h4>

                <ul className="footer-links">
                  {column.links.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Subscribe & Office */}
            <div className="footer-widget">
              <h4 className="footer-title">{data.subscribe.title}</h4>

              <form className="footer-subscribe" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder={data.subscribe.placeholder}
                  className="footer-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="submit"
                  className="footer-submit"
                  aria-label="Subscribe"
                  disabled={loading}
                >
                  <Send size={18} />
                </button>
              </form>

              {message && (
                <div
                  className={`footer-message ${message.type}`}
                  style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: message.type === 'success' ? '#10b981' : '#ef4444',
                  }}
                >
                  {message.text}
                </div>
              )}

              <div style={{ marginTop: '24px' }}>
                <h4 className="footer-title">{data.office.title}</h4>

                <p className="footer-description">
                  {data.office.addressLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < data.office.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-wrapper">
          {/* Contacts */}
          <div className="footer-contact">
            {data.contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                className="footer-contact-item"
                target={contact.type === 'email' ? '_blank' : undefined}
                rel={contact.type === 'email' ? 'noopener noreferrer' : undefined}
                onClick={(event) => handleContactClick(event, contact)}
              >
                {CONTACT_ICONS[contact.type] || null}
                <span>{contact.label}</span>
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="footer-socials">
            {data.socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {SOCIAL_ICONS[social.icon] || null}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="footer-copy">{data.copyright}</div>
        </div>
      </div>
    </footer>
  );
}
