'use client';

import { useRef, useState } from 'react';
import { shopInfo } from '@/data/shopInfo';

/**
 * Enquiry form → WhatsApp.
 *
 * The shop takes enquiries on WhatsApp, so the form composes the message and opens a
 * chat with the shop, ready to send. Fields have visible labels, errors are shown
 * inline (linked with aria-describedby), announced in a live region, and focus moves
 * to the first field that needs attention.
 */

type Field = 'name' | 'phone' | 'email' | 'inquiry' | 'message';
type Errors = Partial<Record<Field, string>>;

const INQUIRIES = [
  { value: 'Custom / made-to-order piece', label: 'Custom / made-to-order piece' },
  { value: 'A piece from the catalogue', label: 'A piece from the catalogue' },
  { value: "Today's gold rate", label: "Today's gold rate" },
  { value: 'Visiting the shop', label: 'Visiting the shop' },
  { value: 'Something else', label: 'Something else' },
];

const inputCls = (invalid: boolean) =>
  `mt-2 block w-full border bg-white px-4 py-3 font-body text-[16px] text-[#1C1726] transition-colors placeholder:text-[#6B6577] focus:border-[#8069BF] focus:outline-none focus:ring-2 focus:ring-[#8069BF]/20 ${
    invalid ? 'border-[#B42318]' : 'border-[#DDD6CA]'
  }`;
const labelCls = 'block font-label text-[13px] font-semibold text-[#1C1726]';

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1.5 font-label text-[13px] text-[#B42318]">
      {message}
    </p>
  ) : null;
}

export default function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState('');

  const validate = (data: FormData): Errors => {
    const e: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').replace(/[\s()-]/g, '');
    const email = String(data.get('email') ?? '').trim();
    if (!name) e.name = 'Please enter your name.';
    if (!/^(\+?91)?[6-9]\d{9}$/.test(phone)) e.phone = 'Please enter a valid 10-digit mobile number.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please check the email address.';
    if (!data.get('inquiry')) e.inquiry = 'Please choose what your enquiry is about.';
    if (!String(data.get('message') ?? '').trim()) e.message = 'Please tell us a little about what you are looking for.';
    return e;
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const found = validate(data);
    setErrors(found);

    const fields = Object.keys(found) as Field[];
    if (fields.length) {
      setStatus(`Please fix ${fields.length} ${fields.length === 1 ? 'field' : 'fields'}: ${fields.map((f) => found[f]).join(' ')}`);
      formRef.current?.querySelector<HTMLElement>(`[name="${fields[0]}"]`)?.focus();
      return;
    }

    const text = [
      'Namaste! New enquiry from the website:',
      '',
      `*Name:* ${data.get('name')}`,
      `*Phone:* ${data.get('phone')}`,
      data.get('email') ? `*Email:* ${data.get('email')}` : '',
      `*About:* ${data.get('inquiry')}`,
      '',
      String(data.get('message')).trim(),
    ]
      .filter((l, i, all) => l !== '' || all[i - 1] !== '')
      .join('\n');

    window.open(`https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setStatus('Your message is ready in WhatsApp — just press Send. We usually reply within the day.');
    ev.currentTarget.reset();
  };

  const describedBy = (f: Field, hint?: string) => [hint, errors[f] && `${f}-error`].filter(Boolean).join(' ') || undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby="form-note">
      <p id="form-note" className="font-body text-[14px] text-[#5F5A6B]">
        Send your enquiry on WhatsApp — we&apos;ll reply there. Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Your name <span aria-hidden="true" className="text-[#B42318]">*</span></label>
          <input id="name" name="name" type="text" autoComplete="name" required aria-required="true" aria-invalid={!!errors.name} aria-describedby={describedBy('name')} className={inputCls(!!errors.name)} />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Mobile number <span aria-hidden="true" className="text-[#B42318]">*</span></label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-required="true" placeholder="98765 43210" aria-invalid={!!errors.phone} aria-describedby={describedBy('phone')} className={inputCls(!!errors.phone)} />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>Email <span className="font-normal text-[#6B6577]">(optional)</span></label>
        <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describedBy('email')} className={inputCls(!!errors.email)} />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="inquiry" className={labelCls}>Your enquiry is about <span aria-hidden="true" className="text-[#B42318]">*</span></label>
        <div className="relative">
          <select id="inquiry" name="inquiry" defaultValue="" required aria-required="true" aria-invalid={!!errors.inquiry} aria-describedby={describedBy('inquiry')} className={`${inputCls(!!errors.inquiry)} cursor-pointer appearance-none pr-10`}>
            <option value="" disabled>Choose one</option>
            {INQUIRIES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg aria-hidden="true" width="12" height="8" viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-[#5F5A6B]">
            <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
        <FieldError id="inquiry-error" message={errors.inquiry} />
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>Message <span aria-hidden="true" className="text-[#B42318]">*</span></label>
        <textarea id="message" name="message" rows={4} required aria-required="true" aria-invalid={!!errors.message} aria-describedby={describedBy('message', 'message-hint')} className={`${inputCls(!!errors.message)} resize-y`} />
        <p id="message-hint" className="mt-1.5 font-label text-[12px] text-[#6B6577]">A photo helps — you can attach one in WhatsApp after this opens.</p>
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Announces errors and success to screen readers */}
      <p role="status" aria-live="polite" className={status ? `font-label text-[14px] ${Object.keys(errors).length ? 'text-[#B42318]' : 'text-[#1F7A4D]'}` : 'sr-only'}>
        {status}
      </p>

      <button
        type="submit"
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 bg-[#1C1726] px-8 py-4 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#8069BF] sm:w-auto"
      >
        Send on WhatsApp
      </button>
    </form>
  );
}
