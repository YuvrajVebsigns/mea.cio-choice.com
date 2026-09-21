export const metadata = {
  title: 'Enter CIO Choice 2026',
  description:
    'Enter the largest CIO survey on product, service and solution recognition where winners are chosen by CIOs.',
};

export default function EnterPage() {
  return (
    <main className="enter-page">
      <section className="enter-section">
        <div className="enter-hero">
          <p className="enter-label">Enter CIO Choice 2027</p>

          <h1 className="enter-hero-title">
            CIO Choice 2027 welcomes you to participate in the largest CIO survey on product,
            service and/or solution recognition where winners are picked by CIOs.
          </h1>

          <p>
            It will only take a couple of minutes of your time to enter. Please be sure to download
            the full Terms &amp; Conditions and read the details below.
          </p>
        </div>

        {/* Details */}

        <details open className="enter-card">
          <summary>Details to Enter</summary>

          <div className="enter-card-content">
            <p>
              <p>
                <a href="/research">CLICK HERE</a>
              </p>
              TO DOWNLOAD FORM. Please download the form from the link provided and fill in the
              details as per the form requirement. It is mandatory to fill each section.
            </p>

            <p>
              <strong>CATEGORY SELECTION:</strong> You are required to select the category of
              recognition your Product/ Service/ Solution falls into. If your Product/ Service/
              Solution does not fit any of the categories listed, please contact us on{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@core-mediagroup.com&su=Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                contact@core-mediagroup.com
              </a>
              .
            </p>

            <p>
              <strong>DESCRIPTION:</strong> Please enter a paragraph of no more than 100 words
              describing your Product/ Service/ Solution and its innovative/associated features.
            </p>

            <p>
              <strong>AUTHORIZATION:</strong> Please ensure that you have the appropriate
              permissions and are duly authorized to enter on behalf of the Product/ Service/
              Solution.
            </p>

            <p>
              <strong>ENTRIES:</strong> You can fill in multiple entries using a fresh form for each
              Product/ Service/ Solution.
            </p>

            <p>
              <strong>NOTE:</strong> For assistance while filling the descriptions, feel free to
              contact us.
            </p>
          </div>
        </details>

        {/* After Entry */}

        <details className="enter-card">
          <summary>After You Enter</summary>

          <div className="enter-card-content">
            <p>
              Send the completed entry form to{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@cxo-capital.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact@cxo-capital.com
              </a>
              .
            </p>

            <p>
              We will send you an email confirming successful entry of your Product, Service or
              Solution and contact you if any additional information is required.
            </p>
          </div>
        </details>

        {/* Rules */}

        <details className="enter-card">
          <summary>The Rules</summary>

          <div className="enter-card-content">
            <p>
              This is a unique recognition for ICT Products, Services and Solutions based on the
              preferences of CIOs and ICT decision makers. We request you to carefully read the
              Terms &amp; Conditions before submitting your entry.
            </p>

            <p>
              Once submitted, you cannot withdraw your Product, Service or Solution from the
              process. Due to the nature of the study, withdrawal may impact other entries or even
              the entire category.
            </p>

            <p>
              The entry form is an electronic contract. By submitting it, you agree to participate
              in the complete CIO Choice process and cannot withdraw at any stage.
            </p>
          </div>
        </details>

        {/* Investment */}

        <details className="enter-card">
          <summary>Investments Involved</summary>

          <div className="enter-card-content">
            <ul>
              <li>Entry – US$ 1,000 + Local Taxes for Yr. 2027</li>

              <li>
                If Recognised – CIO CHOICE of the Year – US$ 10,000 + Local Taxes for Yr. 2027
                (License Fees)
              </li>
            </ul>

            <p>
              Please note that the entry fee is non-refundable even if the advisory panel eliminates
              your Product, Service or Solution.
            </p>
          </div>
        </details>

        {/* Download */}

        <details className="enter-card">
          <summary>Download Entry Form & Terms</summary>

          <div className="enter-card-content">
            <p>
              <p>
                <a href="/research">CLICK HERE</a>
              </p>
              to download the Entry Form.
            </p>

            <p>
              For the complete Terms &amp; Conditions, contact{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@cxo-capital.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact@cxo-capital.com
              </a>
              .
            </p>
          </div>
        </details>

        {/* Questions */}

        <details className="enter-card">
          <summary>Questions?</summary>

          <div className="enter-card-content">
            <p>
              If you have any questions about the entry form or the process, please contact us on:
            </p>

            <p>
              <strong>Phone:</strong> +971 56 113 6505
            </p>

            <p>
              <strong>Email:</strong>{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@cxo-capital.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact@cxo-capital.com
              </a>
            </p>
          </div>
        </details>
      </section>
    </main>
  );
}
