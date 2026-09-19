'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const YEAR_BOOK_PAGES = Array.from({ length: 30 }, (_, index) => {
  const pageNumber = String(index + 1).padStart(2, '0');

  return {
    src: `/assets/2026/cio-choice-pages-jpg/page-${pageNumber}.jpg`,
    alt: `CIO Choice 2026 Year Book page ${index + 1}`,
  };
});

export default function YearBook2026Page() {
  const [spreadStart, setSpreadStart] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [isTurning, setIsTurning] = useState(false);

  const turnPage = useCallback(
    (nextSpreadStart: number, turnDirection: 'next' | 'previous') => {
      if (isTurning || nextSpreadStart < 0 || nextSpreadStart >= YEAR_BOOK_PAGES.length) {
        return;
      }

      setDirection(turnDirection);
      setIsTurning(true);
      window.setTimeout(() => {
        setSpreadStart(nextSpreadStart);
        setIsTurning(false);
      }, 560);
    },
    [isTurning],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        turnPage(spreadStart === 0 ? 1 : spreadStart + 2, 'next');
      }

      if (event.key === 'ArrowLeft') {
        turnPage(spreadStart <= 1 ? 0 : spreadStart - 2, 'previous');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTurning, spreadStart, turnPage]);

  const isCover = spreadStart === 0;
  const nextSpreadStart = isCover ? 1 : spreadStart + 2;
  const previousSpreadStart = isCover || spreadStart === 1 ? 0 : spreadStart - 2;
  const leftPage = YEAR_BOOK_PAGES[spreadStart] ?? YEAR_BOOK_PAGES[0]!;
  const rightPage = isCover ? null : (YEAR_BOOK_PAGES[spreadStart + 1] ?? null);
  const pageLabel = isCover
    ? 'Cover Page'
    : `Pages ${spreadStart + 1} - ${Math.min(spreadStart + 2, YEAR_BOOK_PAGES.length)}`;
  const turningToLeftPage =
    YEAR_BOOK_PAGES[direction === 'next' ? nextSpreadStart : previousSpreadStart];
  const turningToRightPage =
    YEAR_BOOK_PAGES[(direction === 'next' ? nextSpreadStart : previousSpreadStart) + 1];
  const openNextSpread = () => turnPage(nextSpreadStart, 'next');
  const openPreviousSpread = () => turnPage(previousSpreadStart, 'previous');

  return (
    <main className="year-book-page">
      <section className="year-book-reader" aria-labelledby="year-book-title">
        <h1 id="year-book-title" className="year-book-heading">
          CIO Choice 2026 Year Book
        </h1>
        <div className="year-book-stage">
          <button
            type="button"
            className="year-book-arrow year-book-arrow-previous"
            onClick={openPreviousSpread}
            disabled={isCover || isTurning}
            aria-label="Open previous pages"
          >
            <ChevronLeft size={27} aria-hidden="true" />
          </button>
          <div
            className={`year-book-book ${isTurning ? `is-turning ${direction}` : ''} ${isCover ? 'is-cover' : 'is-spread'}`}
          >
            {isTurning && (
              <div
                className={`year-book-next-spread ${turningToRightPage ? 'is-spread' : 'is-cover'}`}
                aria-hidden="true"
              >
                <div className="year-book-page-sheet">
                  <Image src={turningToLeftPage?.src ?? leftPage.src} alt="" fill sizes="380px" />
                </div>
                {turningToRightPage && (
                  <div className="year-book-page-sheet year-book-page-right">
                    <Image src={turningToRightPage.src} alt="" fill sizes="380px" />
                  </div>
                )}
              </div>
            )}
            <div
              className={`year-book-page-sheet year-book-page-left ${isTurning && direction === 'previous' ? 'is-turning-left' : ''}`}
              onClick={isCover ? openNextSpread : openPreviousSpread}
            >
              <Image
                src={leftPage.src}
                alt={leftPage.alt}
                fill
                priority={spreadStart === 0}
                sizes="(max-width: 700px) 88vw, 380px"
              />
            </div>
            {rightPage && (
              <div
                className={`year-book-page-sheet year-book-page-right ${isTurning && direction === 'next' ? 'is-turning-right' : ''}`}
                onClick={openNextSpread}
              >
                <Image
                  src={rightPage.src}
                  alt={rightPage.alt}
                  fill
                  sizes="(max-width: 700px) 44vw, 380px"
                />
              </div>
            )}
          </div>
          <button
            type="button"
            className="year-book-arrow year-book-arrow-next"
            onClick={openNextSpread}
            disabled={nextSpreadStart >= YEAR_BOOK_PAGES.length || isTurning}
            aria-label="Open next pages"
          >
            <ChevronRight size={27} aria-hidden="true" />
          </button>
        </div>
        <div className="year-book-controls" aria-label="Year book navigation">
          <p className="year-book-page-count" aria-live="polite">
            {pageLabel}
          </p>
        </div>
      </section>
    </main>
  );
}
