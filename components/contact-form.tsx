'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { SmoothInput, SmoothTextarea } from '@/components/ui/smooth-caret-input';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MSG = 2000;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [success]);

  const validateClient = (): string | null => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();
    if (!trimmedName || trimmedName.length > 100) return 'Name must be 1–100 characters.';
    if (!EMAIL_RE.test(trimmedEmail)) return 'Please enter a valid email address.';
    if (!trimmedMessage || trimmedMessage.length > MAX_MSG) return `Message must be 1–${MAX_MSG} characters.`;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const clientError = validateClient();
    if (clientError) { setError(clientError); return; }
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() }),
      });
      const data = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !data.success) { setError(data.error ?? 'Failed to send message.'); return; }
      setSuccess(true);
      setName(''); setEmail(''); setMessage('');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const msgPercent = Math.min((message.length / MAX_MSG) * 100, 100);
  const msgNearLimit = message.length > MAX_MSG * 0.85;

  return (
    <form onSubmit={handleSubmit} className="space-y-7 md:space-y-8" noValidate>

      <div className="contact-field-group">
        <label
          htmlFor="cf-name"
          className={`contact-label ${focusedField === 'name' || name ? 'contact-label--active' : ''}`}
        >
          Name
        </label>
        <SmoothInput
          id="cf-name"
          name="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          disabled={loading}
          maxLength={100}
          autoComplete="name"
          className="contact-input contact-input--underline"
          wrapperClassName="w-full"
        />
      </div>

      <div className="contact-field-group">
        <label
          htmlFor="cf-email"
          className={`contact-label ${focusedField === 'email' || email ? 'contact-label--active' : ''}`}
        >
          Email
        </label>
        <SmoothInput
          id="cf-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          disabled={loading}
          autoComplete="email"
          className="contact-input contact-input--underline"
          wrapperClassName="w-full"
        />
      </div>

      <div className="contact-field-group">
        <div className="flex items-end justify-between gap-3 mb-2">
          <label
            htmlFor="cf-message"
            className={`contact-label !mb-0 ${focusedField === 'message' || message ? 'contact-label--active' : ''}`}
          >
            Message
          </label>
          <span className={`contact-counter ${msgNearLimit ? 'contact-counter--warn' : ''}`} aria-live="polite">
            <span className="tabular-nums">{message.length}</span>
            <span className="mx-1 opacity-50">/</span>
            <span className="tabular-nums">{MAX_MSG}</span>
          </span>
        </div>
        <SmoothTextarea
          id="cf-message"
          name="message"
          placeholder="Scope, timeline, stack — tell me what you are building…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          disabled={loading}
          maxLength={MAX_MSG}
          rows={5}
          className="contact-textarea"
          wrapperClassName="w-full"
        />
        <div
          className="h-0.5 rounded-full overflow-hidden mt-2"
          aria-hidden
        >
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${msgPercent}%`,
              background: msgNearLimit ? '#f87171' : 'var(--accent)',
            }}
          />
        </div>
      </div>

      {error && (
        <div className="contact-alert contact-alert--error" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="contact-alert contact-alert--success" role="status">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
          <p>Message sent! I&apos;ll get back to you soon.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="contact-submit"
        id="contact-submit"
      >
        {loading ? (
          <>
            <span className="contact-spinner" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4 opacity-90" aria-hidden />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
