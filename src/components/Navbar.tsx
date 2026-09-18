'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type DropdownName = 'about' | 'process' | 'yearBook';

export default function Navbar() {
  const pathname = usePathname();

  // const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);
  const [yearBookOpen, setYearBookOpen] = useState(false);

  // const lastScrollY = useRef(0);
  // const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function closeAllDropdowns() {
    setAboutOpen(false);
    setProcessOpen(false);
    setYearBookOpen(false);
  }

  function openDropdown(name: DropdownName) {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
    }

    setAboutOpen(name === 'about');
    setProcessOpen(name === 'process');
    setYearBookOpen(name === 'yearBook');
  }

  function toggleDropdown(name: DropdownName) {
    const isOpen = name === 'about' ? aboutOpen : name === 'process' ? processOpen : yearBookOpen;

    closeAllDropdowns();

    if (!isOpen) {
      openDropdown(name);
    }
  }

  function handleDropdownClick(name: DropdownName) {
    if (isMobile) {
      toggleDropdown(name);
      return;
    }

    openDropdown(name);
  }

  function scheduleDropdownClose() {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
    }

    dropdownTimer.current = setTimeout(() => {
      closeAllDropdowns();
    }, 150);
  }

  function closeMobileMenu() {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
    }

    // if (hideTimer.current) {
    //   clearTimeout(hideTimer.current);
    // }

    setMobileOpen(false);
    // setIsHidden(false);
    closeAllDropdowns();
  }

  useEffect(() => {
    function updateScreenSize() {
      const mobile = window.innerWidth <= 992;

      setIsMobile(mobile);

      if (!mobile) {
        setMobileOpen(false);
      }
    }

    updateScreenSize();

    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  useEffect(() => {
    closeMobileMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // useEffect(() => {
  //   lastScrollY.current = window.scrollY;

  //   function handleScroll() {
  //     const current = window.scrollY;
  //     const diff = current - lastScrollY.current;

  //     if (Math.abs(diff) < 8) return;

  //     if (hideTimer.current) {
  //       clearTimeout(hideTimer.current);
  //     }

  //     if (diff < 0) {
  //       setIsHidden(false);
  //     }

  //     if (diff > 0 && current > 140 && !mobileOpen) {
  //       hideTimer.current = setTimeout(() => {
  //         setIsHidden(true);
  //       }, 180);
  //     }

  //     lastScrollY.current = current;
  //   }

  //   window.addEventListener('scroll', handleScroll, {
  //     passive: true,
  //   });

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);

  //     if (hideTimer.current) clearTimeout(hideTimer.current);

  //     if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
  //   };
  // }, [mobileOpen]);

  return (
    // <header
    //   className={['navbar', isHidden ? 'navbar-hide' : '', mobileOpen ? 'mobile-open' : '']
    //     .filter(Boolean)
    //     .join(' ')}
    // >

    <header className={`navbar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        <Link
          href="/"
          className="navbar-logo"
          onClick={closeMobileMenu}
          aria-label="CIO Choice Home"
        >
          <Image
            src="/assets/logo/cio-black.png"
            alt="CIO Choice"
            width={150}
            height={100}
            priority
          />
        </Link>

        <nav className="navbar-menu">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <div
            className={`nav-dropdown ${aboutOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) openDropdown('about');
            }}
            onMouseLeave={() => {
              if (!isMobile) scheduleDropdownClose();
            }}
          >
            <button
              type="button"
              className={`nav-link ${pathname === '/about-us' || pathname === '/foundermessage' ? 'active' : ''}`}
              onClick={() => handleDropdownClick('about')}
              aria-expanded={aboutOpen}
            >
              <span>About Us</span>
              <ChevronDown size={16} />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                <li>
                  <Link href="/about-us" className="mega-item" onClick={closeMobileMenu}>
                    About CIO Choice
                  </Link>
                </li>
                <li>
                  <a
                    href="https://core-mediagroup.com/"
                    className="mega-item"
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMobileMenu}
                  >
                    CORE Media Group
                  </a>
                </li>
                <li>
                  <a
                    href="https://cxo-capital.com"
                    className="mega-item"
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMobileMenu}
                  >
                    CXO-Capital
                  </a>
                </li>
                <li>
                  <Link href="/foundermessage" className="mega-item" onClick={closeMobileMenu}>
                    Founder&apos;s Message
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Link
            href="/advisory-panel"
            className={`nav-link ${pathname === '/advisory-panel' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Advisory Panel
          </Link>
          <div
            className={`nav-dropdown ${processOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) openDropdown('process');
            }}
            onMouseLeave={() => {
              if (!isMobile) scheduleDropdownClose();
            }}
          >
            <button
              type="button"
              className={`nav-link ${
                pathname === '/process-flow' || pathname === '/enter' ? 'active' : ''
              }`}
              onClick={() => handleDropdownClick('process')}
              aria-expanded={processOpen}
            >
              <span>Process</span>
              <ChevronDown size={16} />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                <li>
                  <Link href="/process-flow" className="mega-item" onClick={closeMobileMenu}>
                    Process and Flow
                  </Link>
                </li>

                <li>
                  <Link href="/enter" className="mega-item" onClick={closeMobileMenu}>
                    Enter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Link
            href="/red-carpet-night"
            className={`nav-link ${pathname === '/red-carpet-night' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Red Carpet Night
          </Link>

          <Link
            href="/recognized-brands"
            className={`nav-link ${pathname === '/recognized-brands' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Recognized Brands
          </Link>

          <div
            className={`nav-dropdown ${yearBookOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) openDropdown('yearBook');
            }}
            onMouseLeave={() => {
              if (!isMobile) scheduleDropdownClose();
            }}
          >
            <button
              type="button"
              className={`nav-link ${pathname.startsWith('/year-book') ? 'active' : ''}`}
              onClick={() => handleDropdownClick('yearBook')}
              aria-expanded={yearBookOpen}
            >
              <span>Year Book</span>
              <ChevronDown size={16} />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                <li>
                  <Link href="/year-book/2026" className="mega-item" onClick={closeMobileMenu}>
                    2026 Year Book
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/nominate"
            className={`nav-link ${pathname === '/nominate' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Nomination
          </Link>

          {/* <Link
            href="/contact"
            className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Contact Us
          </Link> */}
        </nav>

        <div className="navbar-actions">
          <Link href="/#contact-section" className="talk-btn" onClick={closeMobileMenu}>
            <span>Let&apos;s Talk</span>

            <span className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </span>
          </Link>

          <button
            type="button"
            className="menu-btn"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
            onClick={() => {
              setMobileOpen((prev) => !prev);
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
