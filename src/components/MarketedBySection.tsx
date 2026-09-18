import Image from 'next/image';

const marketedByLogo =
  'https://cxo-capital.com/wp-content/uploads/2023/10/CXO-Capital-Final-Logo.png';

export default function MarketedBySection() {
  return (
    <section className="marketed-by-section" aria-labelledby="marketed-by-title">
      <div className="marketed-by-container">
        <p className="marketed-by-title" id="marketed-by-title">
          Marketed By
        </p>

        <div className="marketed-by-divider" aria-hidden="true">
          <span />
        </div>

        <a
          className="marketed-by-card"
          href="https://cxo-capital.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit CXO Capital"
        >
          <Image
            src={marketedByLogo}
            alt="CXO Capital"
            width={460}
            height={150}
            className="marketed-by-logo"
          />
          <span className="marketed-by-visit">Visit CXO Capital</span>
        </a>
      </div>
    </section>
  );
}
