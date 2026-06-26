'use client';

import React, { useState } from 'react';
import { shopInfo } from '@/data/shopInfo';

export default function ContactInfoAndForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Thank you for your inquiry! This is a demo so no email was actually sent, but your form works perfectly.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 max-w-6xl mb-16 sm:mb-24 mt-6 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-start">
        
        {/* Left Column: Contact Info & Map */}
        <div className="space-y-8">
          
          {/* Info Card */}
          <div className="bg-white p-8 md:p-10 border border-[var(--color-secondary)]/20 shadow-sm">
            <h2 className="text-xl md:text-2xl font-headline font-bold text-[var(--color-primary)] uppercase tracking-wider mb-8 border-b border-[var(--color-secondary)]/10 pb-4">
              Our Showroom
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="text-[var(--color-tertiary)] mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-2">Address</h4>
                  <p className="text-sm text-[var(--color-neutral)] leading-relaxed font-light">
                    {shopInfo.address.line1}<br />
                    {shopInfo.address.city}, {shopInfo.address.taluka_district} - 388340<br />
                    {shopInfo.address.state}, {shopInfo.address.country}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start space-x-4">
                <div className="text-[var(--color-tertiary)] mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-2">Contact</h4>
                  <p className="text-sm text-[var(--color-neutral)] leading-relaxed font-light space-y-1">
                    <span className="block font-medium text-[var(--color-primary)]">{shopInfo.owner}: <a href={`tel:${shopInfo.phone1.replace(/\s+/g, '')}`} className="font-light text-[var(--color-neutral)] hover:text-[var(--color-tertiary)] transition-colors">{shopInfo.phone1}</a></span>
                    <span className="block font-medium text-[var(--color-primary)]">Inquiries: <a href={`tel:${shopInfo.phone2.replace(/\s+/g, '')}`} className="font-light text-[var(--color-neutral)] hover:text-[var(--color-tertiary)] transition-colors">{shopInfo.phone2}</a></span>
                  </p>
                  
                  <a href="mailto:info@shriharijewellers.com" className="block mt-4 text-[11px] font-bold text-[var(--color-neutral)] uppercase tracking-wider hover:text-[var(--color-tertiary)] transition-colors">
                    info@shriharijewellers.com
                  </a>

                  <a href={`https://wa.me/919978101081`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 mt-4 text-[10px] font-bold text-[var(--color-tertiary)] uppercase tracking-widest hover:brightness-90 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>Connect on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="text-[var(--color-tertiary)] mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="w-full">
                  <h4 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-2">Business Hours</h4>
                  <div className="flex justify-between items-center text-sm text-[var(--color-neutral)] font-light mb-1">
                    <span>Monday - Saturday:</span>
                    <span>10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-[var(--color-neutral)] font-light">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="w-full h-[250px] bg-white p-2 border border-[var(--color-secondary)]/20 shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14695.539281786523!2d72.96443455!3d22.48834925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e2098d5c417%3A0xb34d70b776c5b9f7!2sMogar%2C%20Gujarat%20388340!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>

        </div>

        {/* Right Column: Inquiry Form */}
        <div className="bg-white p-8 md:p-12 border border-[var(--color-secondary)]/20 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-[var(--color-primary)] uppercase tracking-widest mb-4">
            Inquire
          </h2>
          <p className="text-sm text-[var(--color-neutral)] font-light mb-10">
            Please fill out the form below for bespoke requests, catalog inquiries, or to schedule a private viewing.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative group">
                <input type="text" id="firstName" className="w-full bg-transparent border-b border-[var(--color-secondary)]/30 py-2 text-sm focus:outline-none focus:border-[var(--color-tertiary)] transition-colors peer placeholder-transparent" placeholder="First Name" required />
                <label htmlFor="firstName" className="absolute left-0 -top-4 text-[10px] text-[var(--color-primary)] font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--color-neutral)] peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--color-tertiary)]">First Name</label>
              </div>
              <div className="relative group">
                <input type="text" id="lastName" className="w-full bg-transparent border-b border-[var(--color-secondary)]/30 py-2 text-sm focus:outline-none focus:border-[var(--color-tertiary)] transition-colors peer placeholder-transparent" placeholder="Last Name" required />
                <label htmlFor="lastName" className="absolute left-0 -top-4 text-[10px] text-[var(--color-primary)] font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--color-neutral)] peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--color-tertiary)]">Last Name</label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative group">
                <input type="email" id="email" className="w-full bg-transparent border-b border-[var(--color-secondary)]/30 py-2 text-sm focus:outline-none focus:border-[var(--color-tertiary)] transition-colors peer placeholder-transparent" placeholder="Email Address" required />
                <label htmlFor="email" className="absolute left-0 -top-4 text-[10px] text-[var(--color-primary)] font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--color-neutral)] peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--color-tertiary)]">Email Address</label>
              </div>
              <div className="relative group">
                <input type="tel" id="phone" className="w-full bg-transparent border-b border-[var(--color-secondary)]/30 py-2 text-sm focus:outline-none focus:border-[var(--color-tertiary)] transition-colors peer placeholder-transparent" placeholder="Phone Number" required />
                <label htmlFor="phone" className="absolute left-0 -top-4 text-[10px] text-[var(--color-primary)] font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--color-neutral)] peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--color-tertiary)]">Phone Number</label>
              </div>
            </div>

            <div className="relative group pt-4">
              <select defaultValue="" id="inquiry" className="w-full bg-transparent border-b border-[var(--color-secondary)]/30 py-2 text-sm focus:outline-none focus:border-[var(--color-tertiary)] transition-colors text-[var(--foreground)] appearance-none cursor-pointer peer" required>
                <option value="" disabled className="text-[var(--color-neutral)]">Nature of Inquiry</option>
                <option value="bespoke">Bespoke Jewelry Design</option>
                <option value="custom">Custom Jewelry Design</option>
                <option value="general">General Question</option>
              </select>
              <div className="absolute right-0 top-6 pointer-events-none text-[var(--color-primary)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <div className="relative group pt-6">
              <textarea id="message" rows={3} className="w-full bg-transparent border-b border-[var(--color-secondary)]/30 py-2 text-sm focus:outline-none focus:border-[var(--color-tertiary)] transition-colors resize-none peer placeholder-transparent" placeholder="Your Message" required></textarea>
              <label htmlFor="message" className="absolute left-0 top-0 text-[10px] text-[var(--color-primary)] font-medium transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--color-neutral)] peer-placeholder-shown:top-6 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[var(--color-tertiary)]">Your Message</label>
            </div>

            <div className="flex justify-center sm:justify-end pt-4">
              <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-[var(--color-tertiary)] hover:brightness-90 text-white py-4 px-8 sm:px-10 text-[11px] font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center min-h-[48px]">
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
