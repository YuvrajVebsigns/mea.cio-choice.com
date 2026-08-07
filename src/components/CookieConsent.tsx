'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { trackCookieConsent } from '@/services/analytics.service';

const COOKIE_STORAGE_KEY = 'cookie_consent_preferences';

type CookieConsent = {
  analytics: boolean;
  status: 'accepted' | 'essential';
  updatedAt?: string;
};

function readConsentFromStorage(): CookieConsent | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(COOKIE_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

function writeConsentToStorage(analytics: boolean, status: 'accepted' | 'essential') {
  if (typeof window === 'undefined') {
    return;
  }

  const consent: CookieConsent = {
    analytics,
    status,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(consent));
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const storedConsent = readConsentFromStorage();

    if (storedConsent) {
      setAnalyticsEnabled(Boolean(storedConsent.analytics));
      setIsVisible(false);
      return;
    }

    setAnalyticsEnabled(true);
    setIsVisible(true);
  }, []);

  const acceptAll = async () => {
    writeConsentToStorage(true, 'accepted');

    setAnalyticsEnabled(true);
    setShowPreferences(false);
    setIsVisible(false);

    // Track cookie acceptance
    await trackCookieConsent('accepted', true);
  };

  const acceptEssentialOnly = async () => {
    writeConsentToStorage(false, 'essential');

    setAnalyticsEnabled(false);
    setShowPreferences(false);
    setIsVisible(false);

    // Track cookie acceptance
    await trackCookieConsent('essential', false);
  };

  const openPreferences = () => {
    setShowPreferences(true);
  };

  const closePreferences = () => {
    setShowPreferences(false);
  };

  const savePreferences = async () => {
    const status = analyticsEnabled ? 'accepted' : 'essential';

    writeConsentToStorage(analyticsEnabled, status);

    setShowPreferences(false);
    setIsVisible(false);

    // Track cookie preferences save
    await trackCookieConsent(status, analyticsEnabled);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section className="cookie-consent" aria-label="Cookie consent">
      {!showPreferences && (
        <div className="cookie-consent-inner">
          {/* =========================
              COOKIE DESCRIPTION
          ========================== */}
          <div className="cookie-consent-content">
            <p className="cookie-consent-description">
              We use cookies to enhance your browsing experience, personalize your content, and
              understand site performance.
              <br />
              Click <strong>Accept all</strong> to agree to cookies that help us deliver better
              content and a smoother browsing experience.
              <br />
              View our{' '}
              <Link href="/cookie-policy" className="cookie-policy-link">
                Cookie Policy
              </Link>{' '}
              to update or disable preferences anytime.
            </p>
          </div>

          {/* =========================
              DEFAULT BUTTONS
          ========================== */}
          <div className="cookie-consent-actions">
            <button type="button" className="cookie-btn cookie-btn-primary" onClick={acceptAll}>
              Accept all
            </button>

            <button
              type="button"
              className="cookie-btn cookie-btn-secondary"
              onClick={acceptEssentialOnly}
            >
              Essential only
            </button>

            <button
              type="button"
              className="cookie-btn cookie-btn-secondary cookie-customize-btn"
              onClick={openPreferences}
            >
              <span className="cookie-settings-icon">⚙</span>
              Customize
            </button>
          </div>
        </div>
      )}

      {/* =========================
          CUSTOMIZE VIEW
      ========================== */}
      {showPreferences && (
        <div className="cookie-consent-inner cookie-preferences-wrapper">
          <div className="cookie-preferences">
            <div className="cookie-preferences-divider" />

            <div className="cookie-preferences-title">COOKIE PREFERENCES</div>

            <div className="cookie-preferences-grid">
              {/* Essential Cookies */}
              <div className="cookie-preference-card">
                <div className="cookie-preference-info">
                  <h3>Essential Cookies</h3>

                  <p>Required for the website to function properly.</p>
                </div>

                <span className="cookie-active-badge">Always Active</span>
              </div>

              {/* Analytics Cookies */}
              <div className="cookie-preference-card">
                <div className="cookie-preference-info">
                  <h3>Analytics &amp; Performance Cookies</h3>

                  <p>Help us understand visitor usage and optimize site performance.</p>
                </div>

                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                  />

                  <span className="cookie-switch-slider" />
                </label>
              </div>
            </div>

            {/* Preferences Footer */}
            <div className="cookie-preferences-footer">
              <button type="button" className="cookie-cancel-btn" onClick={closePreferences}>
                Cancel
              </button>

              <button type="button" className="cookie-save-btn" onClick={savePreferences}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// 'use client';

// import React, { useEffect, useState } from 'react';

// type CookiePreferences = {
//   essential: boolean;
//   analytics: boolean;
// };

// const COOKIE_STORAGE_KEY = 'cookie-preferences';

// const defaultPreferences: CookiePreferences = {
//   essential: true,
//   analytics: true,
// };

// export default function CookieConsent() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [showPreferences, setShowPreferences] = useState(false);

//   const [preferences, setPreferences] =
//     useState<CookiePreferences>(defaultPreferences);

//   useEffect(() => {
//     try {
//       const savedPreferences = localStorage.getItem(COOKIE_STORAGE_KEY);

//       if (savedPreferences) {
//         const parsedPreferences = JSON.parse(savedPreferences);

//         setPreferences({
//           essential: true,
//           analytics: Boolean(parsedPreferences.analytics),
//         });

//         setIsVisible(false);
//       } else {
//         setIsVisible(true);
//       }
//     } catch (error) {
//       console.error('Unable to read cookie preferences:', error);
//       setIsVisible(true);
//     }
//   }, []);

//   const savePreferences = (newPreferences: CookiePreferences) => {
//     try {
//       localStorage.setItem(
//         COOKIE_STORAGE_KEY,
//         JSON.stringify(newPreferences),
//       );

//       setPreferences(newPreferences);
//       setIsVisible(false);
//       setShowPreferences(false);

//       console.log('Cookie preferences saved:', newPreferences);
//     } catch (error) {
//       console.error('Unable to save cookie preferences:', error);
//     }
//   };

//   const handleAcceptAll = () => {
//     const newPreferences: CookiePreferences = {
//       essential: true,
//       analytics: true,
//     };

//     savePreferences(newPreferences);
//   };

//   const handleEssentialOnly = () => {
//     const newPreferences: CookiePreferences = {
//       essential: true,
//       analytics: false,
//     };

//     savePreferences(newPreferences);
//   };

//   const handleCustomize = () => {
//     setShowPreferences(true);
//   };

//   const handleCancel = () => {
//     setShowPreferences(false);
//   };

//   const handleSavePreferences = () => {
//     savePreferences(preferences);
//   };

//   const handleAnalyticsChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     setPreferences((previous) => ({
//       ...previous,
//       analytics: event.target.checked,
//     }));
//   };

//   if (!isVisible) {
//     return null;
//   }

//   return (
//     <>
//       {/* =====================================================
//           MAIN COOKIE BANNER
//           ===================================================== */}

//       {!showPreferences && (
//         <div className="cookie-consent-overlay">
//           <div className="cookie-consent-banner">
//             <div className="cookie-consent-inner">
//               {/* TEXT */}

//               <div className="cookie-consent-text">
//                 <p>
//                   We use cookies to enhance your browsing experience,
//                   personalize your content, and understand site performance.
//                   Click <strong>Accept all</strong> to agree to cookies that
//                   help us deliver better content and a smoother browsing
//                   experience. View our{' '}
//                   <button
//                     type="button"
//                     className="cookie-policy-link"
//                     onClick={handleCustomize}
//                   >
//                     Cookie Policy
//                   </button>{' '}
//                   to update or disable preferences anytime.
//                 </p>
//               </div>

//               {/* ACTION BUTTONS */}

//               <div className="cookie-consent-actions">
//                 <button
//                   type="button"
//                   className="cookie-btn cookie-btn-primary"
//                   onClick={handleAcceptAll}
//                 >
//                   Accept all
//                 </button>

//                 <button
//                   type="button"
//                   className="cookie-btn cookie-btn-outline"
//                   onClick={handleEssentialOnly}
//                 >
//                   Essential only
//                 </button>

//                 <button
//                   type="button"
//                   className="cookie-btn cookie-btn-outline cookie-customize-btn"
//                   onClick={handleCustomize}
//                 >
//                   <span className="cookie-settings-icon">⚙</span>
//                   <span>Customize</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           CUSTOMIZE / COOKIE PREFERENCES
//           ===================================================== */}

//       {showPreferences && (
//         <div className="cookie-preferences-overlay">
//           <div className="cookie-preferences-modal">
//             {/* Description */}

//             <div className="cookie-preferences-description">
//               <p>
//                 We use cookies to enhance your browsing experience,
//                 personalize your content, and understand site performance.
//                 Click <strong>Accept all</strong> to agree to cookies that
//                 help us deliver better content and a smoother browsing
//                 experience. View our{' '}
//                 <button
//                   type="button"
//                   className="cookie-policy-link"
//                   onClick={() => setShowPreferences(false)}
//                 >
//                   Cookie Policy
//                 </button>{' '}
//                 to update or disable preferences anytime.
//               </p>
//             </div>

//             <div className="cookie-preferences-divider" />

//             {/* Heading */}

//             <div className="cookie-preferences-heading">
//               <h3>COOKIE PREFERENCES</h3>
//             </div>

//             {/* Preference cards */}

//             <div className="cookie-preferences-grid">
//               {/* Essential */}

//               <div className="cookie-preference-card">
//                 <div className="cookie-preference-content">
//                   <h4>Essential Cookies</h4>

//                   <p>
//                     Required for the website to function properly.
//                   </p>
//                 </div>

//                 <div className="cookie-always-active">
//                   Always Active
//                 </div>
//               </div>

//               {/* Analytics */}

//               <label
//                 htmlFor="analytics-cookie"
//                 className="cookie-preference-card cookie-preference-clickable"
//               >
//                 <div className="cookie-preference-content">
//                   <h4>Analytics &amp; Performance Cookies</h4>

//                   <p>
//                     Help us understand visitor usage and optimize site
//                     performance.
//                   </p>
//                 </div>

//                 <div className="cookie-checkbox-wrapper">
//                   <input
//                     id="analytics-cookie"
//                     type="checkbox"
//                     checked={preferences.analytics}
//                     onChange={handleAnalyticsChange}
//                   />

//                   <span className="cookie-custom-checkbox">
//                     {preferences.analytics ? '✓' : ''}
//                   </span>
//                 </div>
//               </label>
//             </div>

//             {/* Bottom buttons */}

//             <div className="cookie-preferences-actions">
//               <button
//                 type="button"
//                 className="cookie-cancel-btn"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 className="cookie-save-btn"
//                 onClick={handleSavePreferences}
//               >
//                 Save Preferences
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
