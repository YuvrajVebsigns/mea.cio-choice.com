'use client';

import { useEffect } from 'react';

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="cookie-policy-page">
      <section className="cookie-policy-header">
        <div className="container">
          <h1>Cookie Policy</h1>
        </div>
      </section>

      <section className="cookie-policy-content">
        <div className="container">
          <div className="cookie-policy-inner">
            {/* How We Use Cookies */}
            <article className="cookie-policy-section">
              <h2>How we use cookies</h2>

              <p>
                We use cookies to improve your experience on our website, to personalize content, to
                provide social media features, and to analyze our traffic. By accepting cookies, you
                help us make the site faster and better.
              </p>
            </article>

            {/* Essential Cookies */}
            <article className="cookie-policy-section">
              <h3>Essential Cookies</h3>

              <p>
                Essential cookies are always active and are required for the site to function. These
                cookies are necessary for the basic functionality of our website and enable core
                features such as security, network management, and accessibility.
              </p>

              <ul>
                <li>Session management</li>
                <li>Security and authentication</li>
                <li>Load balancing</li>
                <li>User preferences</li>
              </ul>
            </article>

            {/* Analytics Cookies */}
            <article className="cookie-policy-section">
              <h3>Analytics Cookies</h3>

              <p>
                Analytics cookies are optional and help us understand how our visitors use the
                website so we can improve performance and content. These cookies collect information
                about how you use our website, including which pages you visit and how long you
                spend on them.
              </p>

              <ul>
                <li>User behavior tracking</li>
                <li>Page performance metrics</li>
                <li>Visitor engagement data</li>
                <li>Site optimization insights</li>
              </ul>
            </article>

            {/* Cookie Management */}
            <article className="cookie-policy-section">
              <h3>Managing Your Cookies</h3>

              <p>
                You can control and manage cookie preferences at any time. You can disable analytics
                cookies while keeping essential cookies active, or adjust your preferences through
                your browser settings.
              </p>

              <p>
                To update or change your cookie preferences, use the cookie consent banner at the
                bottom of any page on our website.
              </p>
            </article>

            {/* Contact */}
            <article className="cookie-policy-section">
              <h3>Questions?</h3>

              <p>
                If you have any questions about our use of cookies or privacy practices, please
                contact us at{' '}
                <a href="mailto:support@core-mediagroup.com">support@core-mediagroup.com</a>
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
