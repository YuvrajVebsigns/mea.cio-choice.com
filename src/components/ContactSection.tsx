// 'use client';

// import Image from 'next/image';
// import { AlertCircle, ArrowUpRight, CheckCircle2, LoaderCircle, X } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { submitWebsiteContact } from '@/services/contacts.service';

// const SERVICE_OPTIONS = [
//   'Business Strategy',
//   'Customer Experience',
//   'CIO Events & Conferences',
//   'Brand Recognition',
//   'Video Content',
// ];

// type ToastState = {
//   type: 'success' | 'error';
//   title: string;
//   message: string;
// } | null;

// export default function ContactSection() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [service, setService] = useState('');
//   const [message, setMessage] = useState('');

//   const [toast, setToast] = useState<ToastState>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   /* =========================================================
//      AUTO HIDE TOAST
//   ========================================================= */

//   useEffect(() => {
//     if (!toast) {
//       return;
//     }

//     const timer = window.setTimeout(() => {
//       setToast(null);
//     }, 4000);

//     return () => {
//       window.clearTimeout(timer);
//     };
//   }, [toast]);

//   /* =========================================================
//      SUBMIT
//   ========================================================= */

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const trimmedName = fullName.trim();
//     const trimmedEmail = email.trim();
//     const trimmedPhone = phone.trim();
//     const trimmedService = service.trim();
//     const trimmedMessage = message.trim();

//     /* Required fields */

//     if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedService || !trimmedMessage) {
//       setToast({
//         type: 'error',
//         title: 'Incomplete Form',
//         message: 'Please fill in all the required fields.',
//       });

//       return;
//     }

//     /* Name validation */

//     if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
//       setToast({
//         type: 'error',
//         title: 'Invalid Name',
//         message: 'Please enter only alphabetic characters in your name.',
//       });

//       return;
//     }

//     /* Phone validation */

//     if (!/^[0-9]{10}$/.test(trimmedPhone)) {
//       setToast({
//         type: 'error',
//         title: 'Invalid Phone Number',
//         message: 'Please enter a valid 10-digit phone number.',
//       });

//       return;
//     }

//     setIsSubmitting(true);
//     setToast(null);

//     try {
//       await submitWebsiteContact({
//         fullName: trimmedName,
//         email: trimmedEmail,
//         phone: trimmedPhone,
//         service: trimmedService,
//         message: trimmedMessage,
//       });

//       setToast({
//         type: 'success',
//         title: 'Message Sent Successfully!',
//         message: 'Thank you for contacting us. We will get back to you soon.',
//       });

//       /* Clear form */

//       setFullName('');
//       setEmail('');
//       setPhone('');
//       setService('');
//       setMessage('');
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error && error.message
//           ? error.message
//           : 'Something went wrong. Please try again.';

//       setToast({
//         type: 'error',
//         title: 'Message Not Sent',
//         message: errorMessage,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <section className="contact-section" id="contact-section">
//       {/* =====================================================
//           SUCCESS / ERROR TOAST
//       ===================================================== */}

//       {toast && (
//         <div
//           className={`contact-toast contact-toast--${toast.type}`}
//           role={toast.type === 'error' ? 'alert' : 'status'}
//           aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
//         >
//           <div className="contact-toast-icon">
//             {toast.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
//           </div>

//           <div className="contact-toast-content">
//             <strong>{toast.title}</strong>

//             <p>{toast.message}</p>
//           </div>

//           <button
//             type="button"
//             className="contact-toast-close"
//             onClick={() => setToast(null)}
//             aria-label="Close notification"
//           >
//             <X size={18} />
//           </button>

//           <span className="contact-toast-progress" aria-hidden="true" />
//         </div>
//       )}

//       {/* =====================================================
//           MAIN CONTACT CONTAINER
//       ===================================================== */}

//       <div className="contact-container">
//         {/* ===================================================
//             LEFT MAP
//         =================================================== */}

//         <div className="contact-map-area">
//           <div className="contact-map">
//             <Image
//               src="/assets/map3.png"
//               alt="Global map showing our locations"
//               width={700}
//               height={500}
//               className="contact-map-img"
//               priority
//             />

//             {/* Dubai */}

//             <div className="map-location dot-1" title="Dubai">
//               <span className="map-dot" />

//               <span className="map-location-label">Dubai</span>
//             </div>

//             {/* India */}

//             <div className="map-location dot-2" title="India">
//               <span className="map-dot" />

//               <span className="map-location-label">India</span>
//             </div>

//             {/* Singapore */}

//             <div className="map-location dot-3" title="Singapore">
//               <span className="map-dot" />

//               <span className="map-location-label">Singapore</span>
//             </div>
//           </div>
//         </div>

//         {/* ===================================================
//             RIGHT CONTACT FORM
//         =================================================== */}

//         <div className="contact-form-area">
//           <div className="contact-badge">
//             <Image
//               src="/assets/icon.png"
//               alt=""
//               width={20}
//               height={20}
//               className="contact-badge-icon"
//             />

//             <span>GET IN TOUCH</span>
//           </div>

//           <h2 className="contact-title">Let’s Start a Conversation</h2>

//           <form className="contact-form" onSubmit={handleSubmit}>
//             <div className="contact-grid">
//               {/* Full Name */}

//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name *"
//                 value={fullName}
//                 required
//                 autoComplete="name"
//                 pattern="^[A-Za-z\s]+$"
//                 title="Only alphabets are allowed"
//                 onChange={(event) => {
//                   const value = event.target.value.replace(/[^A-Za-z\s]/g, '');

//                   setFullName(value);
//                 }}
//               />

//               {/* Email */}

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address *"
//                 value={email}
//                 required
//                 autoComplete="email"
//                 title="Enter a valid email address"
//                 onChange={(event) => setEmail(event.target.value)}
//               />

//               {/* Phone */}

//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone Number *"
//                 value={phone}
//                 required
//                 autoComplete="tel"
//                 inputMode="numeric"
//                 maxLength={10}
//                 pattern="[0-9]{10}"
//                 title="Enter a valid 10-digit phone number"
//                 onChange={(event) => {
//                   const value = event.target.value.replace(/[^0-9]/g, '');

//                   setPhone(value);
//                 }}
//               />

//               {/* Service */}

//               <select
//                 name="service"
//                 required
//                 value={service}
//                 onChange={(event) => setService(event.target.value)}
//               >
//                 <option value="" disabled>
//                   Select a Service *
//                 </option>

//                 {SERVICE_OPTIONS.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Message */}

//             <textarea
//               name="message"
//               rows={6}
//               placeholder="Your Message *"
//               required
//               value={message}
//               onChange={(event) => setMessage(event.target.value)}
//             />

//             {/* Submit */}

//             <button
//               type="submit"
//               className={`contact-btn ${isSubmitting ? 'contact-btn--loading' : ''}`}
//               disabled={isSubmitting}
//               aria-busy={isSubmitting}
//             >
//               <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>

//               <span className="contact-btn-icon" aria-hidden="true">
//                 {isSubmitting ? (
//                   <LoaderCircle size={20} className="contact-btn-loader" />
//                 ) : (
//                   <ArrowUpRight size={20} />
//                 )}
//               </span>
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import { ArrowUpRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { submitWebsiteContact } from '@/services/contacts.service';

const SERVICE_OPTIONS = [
  'Business Strategy',
  'Customer Experience',
  'CIO Events & Conferences',
  'Brand Recognition',
  'Video Content',
];

const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible' | 'invisible';
          execution?: 'render' | 'execute';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: (errorCode?: string) => void;
          'timeout-callback'?: () => void;
        },
      ) => string;

      execute: (widgetId?: string) => void;

      reset: (widgetId?: string) => void;

      remove: (widgetId?: string) => void;
    };
  }
}

type CaptchaStatus = 'loading' | 'ready' | 'verifying' | 'verified' | 'error';

export default function ContactSection() {
  /* =========================================================
     FORM STATE
  ========================================================= */

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  /* =========================================================
     CLOUDFLARE TURNSTILE STATE
  ========================================================= */

  const [captchaToken, setCaptchaToken] = useState('');

  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>('loading');

  const [isRefreshingCaptcha, setIsRefreshingCaptcha] = useState(false);

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);

  const turnstileWidgetIdRef = useRef<string | null>(null);

  /* =========================================================
     UI STATE
  ========================================================= */

  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
     CLOUDFLARE SITE KEY
  ========================================================= */

  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_SITEKEY?.trim() ||
    (process.env.NODE_ENV !== 'production' ? '1x00000000000000000000AA' : '');

  /* =========================================================
     FORM COMPLETION CHECK
  ========================================================= */

  const isFormComplete =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    service.trim().length > 0 &&
    message.trim().length > 0;

  /* =========================================================
     LOAD CLOUDFLARE TURNSTILE (MANUAL VERIFY)
  ========================================================= */

  useEffect(() => {
    if (!turnstileSiteKey) {
      setCaptchaStatus('error');

      return;
    }

    let cancelled = false;

    const initializeTurnstile = () => {
      if (cancelled) {
        return;
      }

      if (!window.turnstile) {
        setCaptchaStatus('error');

        return;
      }

      if (!turnstileContainerRef.current) {
        setCaptchaStatus('error');

        return;
      }

      /*
       * Prevent duplicate Turnstile widgets.
       */
      if (turnstileWidgetIdRef.current) {
        return;
      }

      try {
        setCaptchaStatus('ready');

        const widgetId = window.turnstile.render(turnstileContainerRef.current, {
          /*
           * PUBLIC CLOUDFLARE SITE KEY
           */
          sitekey: turnstileSiteKey,

          /*
           * Invisible Turnstile.
           */
          size: 'invisible',

          /* Verification starts only when the user clicks Verify. */
          execution: 'execute',

          theme: 'light',

          /*
           * Cloudflare verification successful.
           */
          callback: (token: string) => {
            if (cancelled) {
              return;
            }

            setCaptchaToken(token);

            setCaptchaStatus('verified');

            setIsRefreshingCaptcha(false);

            /*
             * Clear old CAPTCHA-related messages.
             */
            setPopupMessage(null);
          },

          /* Token expired - wait for the user to click Verify again. */
          'expired-callback': () => {
            if (cancelled) {
              return;
            }

            setCaptchaToken('');
            setCaptchaStatus('error');
            setIsRefreshingCaptcha(false);
          },

          /*
           * Turnstile error.
           */
          'error-callback': (_errorCode) => {
            if (cancelled) {
              return;
            }

            setCaptchaToken('');

            setCaptchaStatus('error');

            setIsRefreshingCaptcha(false);
          },

          /* Verification timeout - wait for an explicit retry. */
          'timeout-callback': () => {
            if (cancelled) {
              return;
            }

            setCaptchaToken('');
            setCaptchaStatus('error');
            setIsRefreshingCaptcha(false);
          },
        });

        if (cancelled) {
          try {
            window.turnstile.remove(widgetId);
          } catch {
            // Ignore cleanup error.
          }

          return;
        }

        turnstileWidgetIdRef.current = widgetId;
      } catch {
        setCaptchaStatus('error');
      }
    };

    /*
     * Check whether Turnstile script already exists.
     */
    const existingScript = document.querySelector('script[data-cloudflare-turnstile="true"]');

    if (existingScript) {
      if (window.turnstile) {
        initializeTurnstile();
      } else {
        existingScript.addEventListener('load', initializeTurnstile);
      }

      return () => {
        cancelled = true;

        existingScript.removeEventListener('load', initializeTurnstile);
      };
    }

    /*
     * Create Cloudflare Turnstile script.
     */
    const script = document.createElement('script');

    script.src = TURNSTILE_SCRIPT_SRC;

    script.async = true;

    script.defer = true;

    script.setAttribute('data-cloudflare-turnstile', 'true');

    script.addEventListener('load', initializeTurnstile);

    script.addEventListener('error', () => {
      if (cancelled) {
        return;
      }

      setCaptchaStatus('error');
    });

    document.head.appendChild(script);

    return () => {
      cancelled = true;

      script.removeEventListener('load', initializeTurnstile);
    };
  }, [turnstileSiteKey]);

  /* =========================================================
     CLEANUP TURNSTILE
  ========================================================= */

  useEffect(() => {
    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // Ignore cleanup error.
        }
      }

      turnstileWidgetIdRef.current = null;
    };
  }, []);

  /* =========================================================
     POPUP AUTO CLOSE
  ========================================================= */

  useEffect(() => {
    if (!popupMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [popupMessage]);

  /* =========================================================
     MANUAL TURNSTILE VERIFICATION
  ========================================================= */

  function resetTurnstile() {
    setCaptchaToken('');

    if (window.turnstile && turnstileWidgetIdRef.current) {
      try {
        window.turnstile.reset(turnstileWidgetIdRef.current);
        setCaptchaStatus('ready');
        setIsRefreshingCaptcha(false);
      } catch {
        setCaptchaStatus('error');
        setIsRefreshingCaptcha(false);
      }
    } else {
      setCaptchaStatus('error');
      setIsRefreshingCaptcha(false);
    }
  }

  function verifyTurnstile() {
    setCaptchaToken('');
    setCaptchaStatus('verifying');
    setIsRefreshingCaptcha(true);

    if (window.turnstile && turnstileWidgetIdRef.current) {
      try {
        window.turnstile.reset(turnstileWidgetIdRef.current);
        window.turnstile.execute(turnstileWidgetIdRef.current);
      } catch {
        setCaptchaStatus('error');
        setIsRefreshingCaptcha(false);
      }
    } else {
      setCaptchaStatus('error');
      setIsRefreshingCaptcha(false);
    }
  }

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = fullName.trim();

    const trimmedEmail = email.trim();

    const trimmedPhone = phone.trim();

    const trimmedService = service.trim();

    const trimmedMessage = message.trim();

    /* =======================================================
       FORM VALIDATION
    ======================================================= */

    if (!trimmedName) {
      setPopupMessage('Please enter your full name.');

      return;
    }

    if (!trimmedEmail) {
      setPopupMessage('Please enter your email address.');

      return;
    }

    if (!trimmedPhone) {
      setPopupMessage('Please enter your phone number.');

      return;
    }

    if (!trimmedService) {
      setPopupMessage('Please select a service.');

      return;
    }

    if (!trimmedMessage) {
      setPopupMessage('Please enter your message.');

      return;
    }

    /* =======================================================
       CLOUDFLARE TURNSTILE VALIDATION
    ======================================================= */

    if (!captchaToken) {
      setPopupMessage(
        captchaStatus === 'error'
          ? 'CAPTCHA verification failed.'
          : 'Please complete the CAPTCHA verification.',
      );

      return;
    }

    /* =======================================================
       SUBMIT
    ======================================================= */

    setIsSubmitting(true);

    setPopupMessage(null);

    try {
      /*
       * Send contact form data together with
       * the real Cloudflare Turnstile token.
       */
      await submitWebsiteContact({
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        service: trimmedService,
        message: trimmedMessage,
        captchaToken,
      });

      /* =====================================================
         SUCCESS
      ===================================================== */

      setPopupMessage('Thank you! Your message has been received.');

      /* =====================================================
         CLEAR FORM
      ===================================================== */

      setFullName('');

      setEmail('');

      setPhone('');

      setService('');

      setMessage('');

      /* =====================================================
         RESET CAPTCHA

         resetTurnstile() clears the token without
         automatically starting another verification.
        popupMessage, so the success message remains.
      ===================================================== */

      resetTurnstile();
    } catch (error) {
      /*
       * Show API/backend error.
       */
      setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');

      /*
       * Turnstile tokens are single-use.
       *
       * Always create a fresh token after a failed
       * submission.
       *
       * resetTurnstile() does not clear the error message.
       */
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="contact-section" id="contact-section">
      <div className="contact-container">
        {/* ===================================================
            LEFT SIDE - MAP
        ==================================================== */}

        <div className="contact-map-area">
          <div className="contact-map">
            <Image
              src="/assets/map3.png"
              alt="Global map showing our locations"
              width={700}
              height={500}
              className="contact-map-img"
              priority
            />

            {/* Dubai */}

            <div className="map-location dot-1" title="Dubai">
              <span className="map-dot" />

              <span className="map-location-label">Dubai</span>
            </div>

            {/* India */}

            <div className="map-location dot-2" title="India">
              <span className="map-dot" />

              <span className="map-location-label">India</span>
            </div>

            {/* Singapore */}

            <div className="map-location dot-3" title="Singapore">
              <span className="map-dot" />

              <span className="map-location-label">Singapore</span>
            </div>
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE - CONTACT FORM
        ==================================================== */}

        <div className="contact-form-area">
          <div className="contact-header-row">
            <div className="contact-badge">⬢ GET IN TOUCH</div>

            {popupMessage && (
              <div className="contact-popup" role="status" aria-live="polite">
                <span className="contact-popup-dot" aria-hidden="true" />

                <p>{popupMessage}</p>

                <button
                  type="button"
                  onClick={() => setPopupMessage(null)}
                  aria-label="Close message"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* =================================================
                INPUT GRID
            ================================================== */}

            <div className="contact-grid">
              {/* FULL NAME */}

              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={fullName}
                required
                pattern="^[A-Za-z\s]+$"
                title="Only alphabets are allowed"
                autoComplete="name"
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(event) => setFullName(event.target.value)}
              />

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={email}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />

              {/* PHONE */}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={phone}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                autoComplete="tel"
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(/[^0-9]/g, '');
                }}
                onChange={(event) => setPhone(event.target.value)}
              />

              {/* SERVICE */}

              <select
                name="service"
                required
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="" disabled>
                  Select a Service *
                </option>

                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* =================================================
                MESSAGE
            ================================================== */}

            <textarea
              name="message"
              rows={6}
              placeholder="Your Message *"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            {/* =================================================
                CUSTOM CLOUDFLARE CAPTCHA
            ================================================== */}

            <div className="contact-captcha">
              <label className="captcha-title">CAPTCHA *</label>

              <div
                className={`custom-captcha ${
                  captchaStatus === 'verified' ? 'custom-captcha-verified' : ''
                } ${captchaStatus === 'error' ? 'custom-captcha-error' : ''}`}
              >
                {/* CHECK / SHIELD ICON */}

                <div
                  className={`captcha-check ${
                    captchaStatus === 'verified' ? 'captcha-check-success' : ''
                  } ${
                    captchaStatus === 'verifying' || captchaStatus === 'loading'
                      ? 'captcha-check-loading'
                      : ''
                  }`}
                >
                  {captchaStatus === 'verified' ? (
                    <ShieldCheck size={22} />
                  ) : captchaStatus === 'verifying' || captchaStatus === 'loading' ? (
                    <RefreshCw size={20} className="captcha-spin" />
                  ) : (
                    <span />
                  )}
                </div>

                {/* TEXT */}

                <div className="captcha-content">
                  <strong>
                    {captchaStatus === 'verified'
                      ? 'CAPTCHA successful'
                      : captchaStatus === 'verifying' || captchaStatus === 'loading'
                        ? 'CAPTCHA security...'
                        : captchaStatus === 'error'
                          ? 'CAPTCHA failed'
                          : 'CAPTCHA verification'}
                  </strong>

                  <small>
                    {captchaStatus === 'verified'
                      ? 'You can now submit the form.'
                      : captchaStatus === 'verifying' || captchaStatus === 'loading'
                        ? 'Checking security...'
                        : captchaStatus === 'error'
                          ? 'Please try again.'
                          : 'Click Verify to continue.'}
                  </small>
                </div>

                {/* =================================================
                    VERIFY BUTTON (MANUAL ONLY)
                ================================================== */}

                {captchaStatus !== 'verified' && captchaStatus !== 'loading' && (
                  <button
                    type="button"
                    className="captcha-verify-button"
                    onClick={verifyTurnstile}
                    disabled={isRefreshingCaptcha || isSubmitting}
                    title="Verify CAPTCHA"
                  >
                    {isRefreshingCaptcha ? 'Verifying...' : 'Verify'}
                  </button>
                )}

                {/* A verified token must remain unchanged until submission. */}
              </div>

              {/* =================================================
                  INVISIBLE TURNSTILE
              ================================================== */}

              <div ref={turnstileContainerRef} className="turnstile-invisible" aria-hidden="true" />
            </div>
            <br />

            {/* =================================================
                SUBMIT BUTTON
            ================================================== */}

            <button
              type="submit"
              className="contact-btn"
              disabled={isSubmitting || !isFormComplete || !captchaToken}
            >
              <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>

              <span className="contact-btn-icon">
                <ArrowUpRight size={18} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
