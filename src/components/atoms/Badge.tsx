import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const baseStyles = "text-[10px] uppercase tracking-widest font-bold px-2 py-1";
  const variants = {
    primary: "bg-[var(--color-primary)] text-white",
    secondary: "bg-[var(--color-secondary)]/10 text-[var(--color-primary)]",
    outline: "border border-[var(--color-primary)]/20 text-[var(--color-primary)]"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
