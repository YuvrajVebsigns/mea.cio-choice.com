'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa6';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FoundersMessage() {
  const sectionRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-up',
    initialTransform: 'translateY(40px)',
  });

  return (
    <section ref={sectionRef} className="founder-message-section">
      <div className="founder-message-container">
        {/* LEFT SIDE IMAGE */}
        <div className="founder-image-wrapper">
          <div className="founder-image-frame">
            <Image
              src="/assets/team/Anoop-Mathur.png"
              alt="Anoop Mathur - Founder"
              width={500}
              height={500}
              className="founder-image"
              priority
            />
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="founder-content">
          {/* LABEL */}
          <div className="founder-label">
            <span className="founder-label-icon">♟</span>
            <span className="founder-label-text">Founder’s Message</span>
          </div>

          {/* TITLE */}
          {/* <h2 className="founder-title">
            Building Connections in a<br />
            <span>Digital World.</span>
          </h2> */}

          {/* DESCRIPTION */}
          <p className="founder-description">
            We are a leading global media and marketing company, proud of having more than 15-year
            track record in connecting stakeholders across the ICT ecosystem. By bridging
            businesses, customers, and innovators worldwide, we have established unparalleled reach
            and influence in the communities we serve.
          </p>
          <p className="founder-description">
            {' '}
            Our approach is deeply customer-centric. Every brand, platform, and initiative we craft
            is tailored to deliver unique, impactful, and results-driven experiences. Through
            bespoke programs, we empower our clients to communicate the right message, in the right
            format, to the right audience, ensuring engagement and meaningful outcomes.
          </p>
          <p className="founder-description">
            In today’s hyper-connected world, where customer expectations evolve rapidly, we
            continuously innovate to keep our clients ahead. Our focus is on helping them connect
            effectively with their audiences, at the right time, through relevant and resonant
            content.
          </p>
          <p className="founder-description">
            Beyond transactions, our mission is to build lasting relationships, unite global
            communities, and generate ideas that are meaningful, timely, and impactful. With
            unwavering dedication, we consistently deliver exceptional results for our clients, time
            and again.
          </p>

          {/* QUOTE */}
          {/* <blockquote className="founder-quote">
            <p>
              “We innovate to build relationships that deliver exceptional results, every single
              time.”
            </p>
          </blockquote> */}

          {/* <div className="founder-readmore-wrap">
            <Link href="/aboutus" className="founder-readmore-btn">
              Read more
            </Link>
          </div> */}

          <div className="founder-author">
            <div>
              <h3>Anoop Mathur</h3>
              {/* <span>Founder, CORE MEDIA</span> */}
            </div>
            <a
              href="https://www.linkedin.com/in/mathuranoop?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              className="founder-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Anoop Mathur's LinkedIn profile"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
          </div>

          {/* BUTTON */}
          <Link href="/#contact-section" className="founder-btn">
            <span>Partner With Us</span>
            <div className="founder-btn-icon">
              <ArrowUpRight size={22} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
