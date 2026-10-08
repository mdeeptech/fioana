import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type CallbackFormData = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
};

type CallbackPayload = CallbackFormData & {
  source: 'Website Callback Form';
};

type FieldErrors = Partial<Record<keyof CallbackFormData, string>>;

const EMPTY_FORM: CallbackFormData = {
  name: '',
  phone: '',
  email: '',
  interest: '',
  message: '',
};

const SHOWN_KEY = 'fiona_callback_popup_shown';
const SUBMITTED_KEY = 'fiona_callback_popup_submitted';
const EXIT_DURATION = 430;
const GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxVGKNJT58SNQVBn5tWYi9iDOqiDl9QvihCootKYi4KMFnlu9vf2J82MbnNtSGVHMHc/exec';

async function submitCallbackForm(payload: CallbackPayload) {
  await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });
}

function wasHandledThisSession() {
  try {
    return sessionStorage.getItem(SHOWN_KEY) === '1' || sessionStorage.getItem(SUBMITTED_KEY) === '1';
  } catch {
    return false;
  }
}

function markSessionKey(key: string) {
  try {
    sessionStorage.setItem(key, '1');
  } catch {
    // The popup still works if storage is unavailable; it simply cannot remember dismissal.
  }
}

export default function CallbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<CallbackFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState('');
  const submittingRef = useRef(false);
  const dialogRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ignoreInitialFocusRef = useRef(true);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dismissTimerRef = useRef<number | undefined>(undefined);
  const closeTimerRef = useRef<number | undefined>(undefined);

  const closePopup = () => {
    if (!isOpen || isClosing) return;
    window.clearTimeout(dismissTimerRef.current);
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setHasInteracted(false);
      window.setTimeout(() => {
        if (previousFocusRef.current?.isConnected) previousFocusRef.current.focus();
      }, 0);
    }, EXIT_DURATION);
  };

  useEffect(() => {
    if (wasHandledThisSession()) return;

    const openTimer = window.setTimeout(() => {
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      ignoreInitialFocusRef.current = true;
      markSessionKey(SHOWN_KEY);
      setIsClosing(false);
      setIsOpen(true);
    }, 5000);

    return () => window.clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const oldOverflow = document.body.style.overflow;
    const appRoot = document.getElementById('root');
    const oldInert = appRoot?.inert ?? false;
    const oldAriaHidden = appRoot?.getAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    if (appRoot) {
      appRoot.inert = true;
      appRoot.setAttribute('aria-hidden', 'true');
    }

    const focusFrame = window.requestAnimationFrame(() => nameInputRef.current?.focus());
    const clearInitialFocusGuard = window.setTimeout(() => { ignoreInitialFocusRef.current = false; }, 80);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.clearTimeout(clearInitialFocusGuard);
      document.body.style.overflow = oldOverflow;
      if (appRoot) {
        appRoot.inert = oldInert;
        if (oldAriaHidden === null) appRoot.removeAttribute('aria-hidden');
        else if (oldAriaHidden !== undefined) appRoot.setAttribute('aria-hidden', oldAriaHidden);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || hasInteracted || isSubmitted) return;
    dismissTimerRef.current = window.setTimeout(closePopup, 6000);
    return () => { if (dismissTimerRef.current !== undefined) window.clearTimeout(dismissTimerRef.current); };
  }, [isOpen, hasInteracted, isSubmitted, isClosing]);

  useEffect(() => () => {
    if (dismissTimerRef.current !== undefined) window.clearTimeout(dismissTimerRef.current);
    if (closeTimerRef.current !== undefined) window.clearTimeout(closeTimerRef.current);
  }, []);

  const markInteracted = () => {
    if (ignoreInitialFocusRef.current) return;
    setHasInteracted(true);
    if (dismissTimerRef.current !== undefined) window.clearTimeout(dismissTimerRef.current);
  };

  const updateField = (field: keyof CallbackFormData, value: string) => {
    markInteracted();
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closePopup();
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    )).filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const validate = (): FieldErrors => {
    const nextErrors: FieldErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) nextErrors.phone = 'Please enter your phone number.';
    else if (phoneDigits.length < 7 || phoneDigits.length > 10) nextErrors.phone = 'Please enter a valid phone number.';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.interest) nextErrors.interest = 'Please select what you’re interested in.';
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    markInteracted();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitError('');
    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0];
      dialogRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    const payload: CallbackPayload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      interest: formData.interest,
      message: formData.message.trim(),
      source: 'Website Callback Form',
    };

    try {
      await submitCallbackForm(payload);
      markSessionKey(SUBMITTED_KEY);
      setFormData(EMPTY_FORM);
      setIsSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const fieldClass = (field: keyof CallbackFormData) => `callback-field${errors[field] ? ' has-error' : ''}`;

  return createPortal(
    <div
      className={`callback-backdrop${isClosing ? ' is-closing' : ''}`}
      onMouseDown={(event) => { if (event.target === event.currentTarget) closePopup(); }}
      aria-hidden="false"
    >
      <section
        ref={dialogRef}
        className={`callback-dialog${isClosing ? ' is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-title"
        aria-describedby="callback-description"
        onKeyDown={handleKeyDown}
        onFocusCapture={markInteracted}
      >
        <button className="callback-close" type="button" onClick={closePopup} aria-label="Close callback form">
          <span aria-hidden="true">×</span>
        </button>

        {isSubmitted ? (
          <div className="callback-success" role="status" aria-live="polite">
            <span className="callback-success-icon" aria-hidden="true">✓</span>
            <p className="callback-eyebrow">REQUEST RECEIVED</p>
            <h2>Thank You.</h2>
            <p>Your callback request has been received. Our team will be in touch shortly.</p>
          </div>
        ) : (
          <>
            <header className="callback-header">
              <div className="callback-brand" aria-label="Fiona Beauty and Wellness Academy">
                <span>FIONA</span>
                <span>BEAUTY &amp; WELLNESS ACADEMY</span>
              </div>
              <p className="callback-eyebrow">REQUEST A CALLBACK</p>
              <h2 id="callback-title">LET’S TALK ABOUT<br />YOUR BEAUTY JOURNEY.</h2>
              <p id="callback-description">Questions about a course or service? Leave your details and our team will be in touch.</p>
            </header>

            <form className="callback-form" onSubmit={handleSubmit} noValidate>
              <div className="callback-form-row">
                <div className={fieldClass('name')}>
                  <label htmlFor="callback-name">FULL NAME <span aria-hidden="true">*</span></label>
                  <input ref={nameInputRef} id="callback-name" name="name" autoComplete="name" required value={formData.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Enter your full name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'callback-name-error' : undefined} />
                  {errors.name && <span className="callback-error" id="callback-name-error">{errors.name}</span>}
                </div>
                <div className={fieldClass('phone')}>
                  <label htmlFor="callback-phone">PHONE NUMBER <span aria-hidden="true">*</span></label>
                  <input id="callback-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} required value={formData.phone} onChange={(event) => updateField('phone', event.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Enter your phone number" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'callback-phone-error' : undefined} />
                  {errors.phone && <span className="callback-error" id="callback-phone-error">{errors.phone}</span>}
                </div>
              </div>

              <div className={fieldClass('email')}>
                <label htmlFor="callback-email">EMAIL <span className="callback-optional">OPTIONAL</span></label>
                <input id="callback-email" name="email" type="email" inputMode="email" autoComplete="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} placeholder="Enter your email address" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'callback-email-error' : undefined} />
                {errors.email && <span className="callback-error" id="callback-email-error">{errors.email}</span>}
              </div>

              <div className={fieldClass('interest')}>
                <label htmlFor="callback-interest">I’M INTERESTED IN <span aria-hidden="true">*</span></label>
                <select id="callback-interest" name="interest" required value={formData.interest} onChange={(event) => updateField('interest', event.target.value)} aria-invalid={Boolean(errors.interest)} aria-describedby={errors.interest ? 'callback-interest-error' : undefined}>
                  <option value="" disabled>Select an area of interest</option>
                  <option>Beauty Courses</option>
                  <option>Aesthetic Salon</option>
                </select>
                {errors.interest && <span className="callback-error" id="callback-interest-error">{errors.interest}</span>}
              </div>

              <div className={fieldClass('message')}>
                <label htmlFor="callback-message">MESSAGE <span className="callback-optional">OPTIONAL</span></label>
                <textarea id="callback-message" name="message" rows={3} value={formData.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Tell us how we can help you…" />
              </div>

              {submitError && <p className="callback-submit-error" role="alert">{submitError}</p>}

              <button className="callback-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><span className="callback-spinner" aria-hidden="true" /> Sending...</> : <>REQUEST A CALLBACK <span aria-hidden="true">→</span></>}
              </button>
              <p className="callback-privacy">Your details are only used to respond to your enquiry.</p>
            </form>
          </>
        )}
      </section>
    </div>,
    document.body,
  );
}
