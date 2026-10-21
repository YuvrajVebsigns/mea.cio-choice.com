'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  websiteFormsService,
  PublicCustomForm,
  FormFieldType,
  FormQuestionPublic,
} from '@/services/forms.service';
import { CheckCircle2, AlertCircle, Loader2, Lock, ArrowRight } from 'lucide-react';
import DatePicker from './DatePicker';

interface DynamicFormProps {
  slug: string;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ slug }) => {
  const router = useRouter();

  const [form, setForm] = useState<PublicCustomForm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form input answers state: key -> value
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Turnstile state
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // 1. Fetch Form Schema
  useEffect(() => {
    let isMounted = true;
    async function loadForm() {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await websiteFormsService.getFormBySlug(slug);
        if (isMounted) {
          setForm(data);
          // Initialize empty answers map
          const initAnswers: Record<string, unknown> = {};
          (data.questions || []).forEach((q) => {
            initAnswers[q.key] = q.type === FormFieldType.MULTIPLE_CHOICE ? [] : '';
          });
          setAnswers(initAnswers);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg =
            err instanceof Error
              ? err.message
              : 'This form is currently unavailable or has closed.';
          setFetchError(msg);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (slug) {
      loadForm();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // 2. Setup Turnstile CAPTCHA if enabled
  useEffect(() => {
    if (!form?.settings?.captchaEnabled || !turnstileSiteKey) {
      return;
    }

    const initTurnstile = () => {
      if (!window.turnstile || !turnstileContainerRef.current) return;
      if (turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }

      const widgetId = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        theme: 'dark',
        callback: (token: string) => {
          setCaptchaToken(token);
          setSubmitError(null);
        },
        'expired-callback': () => {
          setCaptchaToken(null);
        },
        'error-callback': () => {
          setCaptchaToken(null);
        },
      });
      turnstileWidgetIdRef.current = widgetId;
    };

    const existingScript = document.querySelector('script[data-cloudflare-turnstile="true"]');

    if (window.turnstile) {
      initTurnstile();
    } else if (existingScript) {
      existingScript.addEventListener('load', initTurnstile);
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-cloudflare-turnstile', 'true');
      script.addEventListener('load', initTurnstile);
      document.head.appendChild(script);
    }

    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // ignore cleanup error
        }
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [form?.settings?.captchaEnabled, turnstileSiteKey]);

  // Handle Input Changes
  const handleAnswerChange = (key: string, val: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
    // Clear error on type
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleCheckboxToggle = (key: string, optionValue: string) => {
    const current = Array.isArray(answers[key]) ? (answers[key] as string[]) : [];
    const exists = current.includes(optionValue);
    const updated = exists ? current.filter((v) => v !== optionValue) : [...current, optionValue];
    handleAnswerChange(key, updated);
  };

  // Client-side Validation
  const validateClient = (): boolean => {
    if (!form) return false;
    const errors: Record<string, string> = {};

    for (const q of form.questions || []) {
      const val = answers[q.key];
      const isMissing =
        val === undefined ||
        val === null ||
        (typeof val === 'string' && val.trim() === '') ||
        (Array.isArray(val) && val.length === 0);

      // 1. Required Check
      if (q.validation?.required && isMissing) {
        errors[q.key] = q.validation.customErrorMessage || `${q.label} is required.`;
        continue;
      }

      if (isMissing) continue;

      // 2. Type-specific checks
      if (q.type === FormFieldType.EMAIL) {
        const str = String(val).trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
          errors[q.key] = q.validation?.customErrorMessage || 'Please enter a valid email address.';
        }
      }

      // 3. PHONE CHECK: Enforce required 8 to 12 digits
      if (q.type === FormFieldType.PHONE) {
        const digits = String(val).replace(/[^0-9]/g, '');
        if (digits.length < 8 || digits.length > 12) {
          errors[q.key] =
            q.validation?.customErrorMessage || 'Phone number must be between 8 and 12 digits.';
        }
      }

      if (q.type === FormFieldType.SINGLE_INPUT || q.type === FormFieldType.PARAGRAPH) {
        const str = String(val).trim();
        if (q.validation?.minLength !== undefined && str.length < q.validation.minLength) {
          errors[q.key] =
            q.validation?.customErrorMessage ||
            `${q.label} must be at least ${q.validation.minLength} characters.`;
        } else if (q.validation?.maxLength !== undefined && str.length > q.validation.maxLength) {
          errors[q.key] =
            q.validation?.customErrorMessage ||
            `${q.label} must not exceed ${q.validation.maxLength} characters.`;
        } else if (q.validation?.pattern) {
          try {
            const regex = new RegExp(q.validation.pattern);
            if (!regex.test(str)) {
              errors[q.key] =
                q.validation?.customErrorMessage || `${q.label} is in an invalid format.`;
            }
          } catch {
            // Ignore invalid regex
          }
        }
      }

      if (q.type === FormFieldType.NUMBER) {
        const num = parseFloat(String(val));
        if (isNaN(num)) {
          errors[q.key] = 'Please enter a valid number.';
        } else if (q.validation?.min !== undefined && num < q.validation.min) {
          errors[q.key] = `${q.label} must be at least ${q.validation.min}.`;
        } else if (q.validation?.max !== undefined && num > q.validation.max) {
          errors[q.key] = `${q.label} must not exceed ${q.validation.max}.`;
        }
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || isSubmitting) return;

    if (!validateClient()) {
      setSubmitError('Please correct the highlighted fields before submitting.');
      return;
    }

    if (form.settings?.captchaEnabled && turnstileSiteKey && !captchaToken) {
      setSubmitError('Please complete the security verification challenge.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await websiteFormsService.submitForm(slug, {
        answers,
        captchaToken: captchaToken || undefined,
      });

      setSubmitSuccess(true);

      // Handle custom redirect if configured
      if (form.settings?.redirectUrl) {
        const redirectUrl = form.settings.redirectUrl;
        setTimeout(() => {
          if (redirectUrl.startsWith('http')) {
            window.location.href = redirectUrl;
          } else {
            router.push(redirectUrl);
          }
        }, 1800);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to record response. Please try again.';
      setSubmitError(msg);

      // Reset Turnstile on error if available
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
        setCaptchaToken(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[380px] p-8 space-y-4">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-sm font-medium text-gray-400">Loading form...</p>
      </div>
    );
  }

  // Error State (404 / closed)
  if (fetchError || !form) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 text-center bg-gray-900/60 rounded-3xl border border-gray-800 shadow-xl backdrop-blur-md">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
          <AlertCircle size={24} />
        </div>
        <h3 className="text-xl font-bold text-white">Form Unavailable</h3>
        <p className="mt-2 text-sm text-gray-400 leading-relaxed">
          {fetchError || 'This form has either expired or is not currently open for submissions.'}
        </p>
      </div>
    );
  }

  // Success State
  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 text-center bg-gray-900/80 rounded-3xl border border-emerald-500/30 shadow-2xl backdrop-blur-lg animate-fadeIn">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Response Received!
        </h2>
        <p className="mt-3 text-base text-gray-300 leading-relaxed max-w-lg mx-auto">
          {form.settings?.successMessage ||
            'Thank you! Your submission has been securely recorded.'}
        </p>
        {form.settings?.redirectUrl && (
          <p className="mt-4 text-xs text-brand-400 flex items-center justify-center gap-1">
            <span>Redirecting you to next page</span>
            <ArrowRight size={12} className="animate-pulse" />
          </p>
        )}
      </div>
    );
  }

  // Active Interactive Form
  return (
    <div className="max-w-3xl mx-auto my-6 p-6 sm:p-10 bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl text-white">
      {/* Accent Header Bar */}
      <div className="h-2 w-24 bg-gradient-to-r from-brand-500 to-amber-500 rounded-full mb-6" />

      {/* Form Header */}
      <div className="pb-6 border-b border-gray-800/80">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{form.name}</h1>
        {form.description && (
          <p className="mt-2.5 text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {form.description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2 text-xs text-red-400 font-medium">
          * Indicates required question
        </div>
      </div>

      {/* Submission Error Banner */}
      {submitError && (
        <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-sm animate-shake">
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Questions Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(form.questions || []).map((q: FormQuestionPublic, idx: number) => {
            const isHalf = q.width === 'half';
            const error = fieldErrors[q.key];

            return (
              <div
                key={q.key || idx}
                className={`space-y-2 ${isHalf ? 'col-span-1' : 'col-span-1 md:col-span-2'}`}
              >
                {/* Question Label */}
                <label className="block text-sm font-semibold text-gray-200">
                  {q.label}
                  {q.validation?.required && <span className="text-red-400 ml-1">*</span>}
                </label>

                {/* Subtitle description */}
                {q.description && (
                  <p className="text-xs text-gray-400 leading-normal">{q.description}</p>
                )}

                {/* Question Inputs */}
                {q.type === FormFieldType.SINGLE_INPUT && (
                  <input
                    type="text"
                    value={String(answers[q.key] || '')}
                    onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                    placeholder={q.placeholder || 'Your answer'}
                    className={`w-full text-sm rounded-xl border bg-gray-800/70 px-4 py-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 ${
                      error
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-700 focus:border-brand-500 focus:ring-brand-500/40'
                    }`}
                  />
                )}

                {q.type === FormFieldType.PARAGRAPH && (
                  <textarea
                    rows={4}
                    value={String(answers[q.key] || '')}
                    onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                    placeholder={q.placeholder || 'Your long answer...'}
                    className={`w-full text-sm rounded-xl border bg-gray-800/70 px-4 py-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 resize-none ${
                      error
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-700 focus:border-brand-500 focus:ring-brand-500/40'
                    }`}
                  />
                )}

                {q.type === FormFieldType.EMAIL && (
                  <input
                    type="email"
                    value={String(answers[q.key] || '')}
                    onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                    placeholder={q.placeholder || 'name@example.com'}
                    className={`w-full text-sm rounded-xl border bg-gray-800/70 px-4 py-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 ${
                      error
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-700 focus:border-brand-500 focus:ring-brand-500/40'
                    }`}
                  />
                )}

                {/* PHONE INPUT: 8 to 12 digits minimum/maximum validation */}
                {q.type === FormFieldType.PHONE && (
                  <div>
                    <input
                      type="tel"
                      maxLength={12}
                      pattern="[0-9]{8,12}"
                      value={String(answers[q.key] || '')}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/[^0-9]/g, '').slice(0, 12);
                        handleAnswerChange(q.key, clean);
                      }}
                      placeholder={q.placeholder || 'e.g. 501234567 (8-12 digits)'}
                      className={`w-full text-sm rounded-xl border bg-gray-800/70 px-4 py-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 ${
                        error
                          ? 'border-red-500 focus:ring-red-500/50'
                          : 'border-gray-700 focus:border-brand-500 focus:ring-brand-500/40'
                      }`}
                    />
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1 px-1">
                      <span>Must be between 8 and 12 numeric digits</span>
                      <span>{String(answers[q.key] || '').replace(/[^0-9]/g, '').length}/12</span>
                    </div>
                  </div>
                )}

                {q.type === FormFieldType.NUMBER && (
                  <input
                    type="number"
                    min={q.validation?.min}
                    max={q.validation?.max}
                    value={String(answers[q.key] ?? '')}
                    onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                    placeholder={q.placeholder || '0'}
                    className={`w-full text-sm rounded-xl border bg-gray-800/70 px-4 py-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 ${
                      error
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-700 focus:border-brand-500 focus:ring-brand-500/40'
                    }`}
                  />
                )}

                {q.type === FormFieldType.DATE && (
                  <DatePicker
                    value={String(answers[q.key] || '')}
                    onChange={(dateStr) => handleAnswerChange(q.key, dateStr)}
                    placeholder={q.placeholder || 'Select date'}
                    hasError={!!error}
                  />
                )}

                {q.type === FormFieldType.SINGLE_SELECT && (
                  <select
                    value={String(answers[q.key] || '')}
                    onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                    className={`w-full text-sm rounded-xl border bg-gray-800/70 px-4 py-3 text-white transition-all focus:outline-none focus:ring-2 ${
                      error
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-gray-700 focus:border-brand-500 focus:ring-brand-500/40'
                    }`}
                  >
                    <option value="" className="bg-gray-900 text-gray-400">
                      Select an option
                    </option>
                    {(q.options || []).map((opt, optIdx) => (
                      <option key={optIdx} value={opt.value} className="bg-gray-900 text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {q.type === FormFieldType.RADIO && (
                  <div className="space-y-2.5 pt-1">
                    {(q.options || []).map((opt, optIdx) => {
                      const isSelected = answers[q.key] === opt.value;
                      return (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-brand-500 bg-brand-500/10 text-white'
                              : 'border-gray-800 bg-gray-800/40 text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`form_radio_${q.key}`}
                            value={opt.value}
                            checked={isSelected}
                            onChange={() => handleAnswerChange(q.key, opt.value)}
                            className="w-4 h-4 text-brand-500 border-gray-700 focus:ring-brand-500"
                          />
                          <span className="text-sm font-medium">{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {q.type === FormFieldType.MULTIPLE_CHOICE && (
                  <div className="space-y-2.5 pt-1">
                    {(q.options || []).map((opt, optIdx) => {
                      const selectedArr = Array.isArray(answers[q.key])
                        ? (answers[q.key] as string[])
                        : [];
                      const isChecked = selectedArr.includes(opt.value);

                      return (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? 'border-brand-500 bg-brand-500/10 text-white'
                              : 'border-gray-800 bg-gray-800/40 text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={opt.value}
                            checked={isChecked}
                            onChange={() => handleCheckboxToggle(q.key, opt.value)}
                            className="w-4 h-4 rounded text-brand-500 border-gray-700 focus:ring-brand-500"
                          />
                          <span className="text-sm font-medium">{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <p className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle size={12} />
                    {error}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Turnstile Container */}
        {form.settings?.captchaEnabled && turnstileSiteKey && (
          <div className="pt-4 flex flex-col items-center">
            <div ref={turnstileContainerRef} />
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock size={13} className="text-brand-400" />
            <span>Submissions are encrypted and stored securely.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-brand-600/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Recording Response...</span>
              </>
            ) : (
              <span>{form.settings?.submitButtonText || 'Submit Response'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
