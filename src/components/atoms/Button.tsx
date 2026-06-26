'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { buttonHoverVariant } from '@/lib/animations';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'icon';
  fullWidth?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex justify-center items-center gap-2 transition-all font-bold uppercase tracking-widest text-xs py-3 px-6";
  
  const variants = {
    primary: "bg-[var(--color-tertiary)] hover:brightness-90 text-white shadow-md",
    secondary: "bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white shadow-md",
    outline: "border border-[var(--color-secondary)]/30 hover:border-[var(--color-tertiary)] text-[var(--color-primary)] hover:text-[var(--color-tertiary)]",
    icon: "p-2 hover:text-[var(--color-tertiary)] text-[var(--color-primary)]"
  };

  const widthClass = fullWidth ? "w-full" : "";

  const finalClass = variant === 'icon' 
    ? `inline-flex justify-center items-center transition-all ${variants.icon} ${className}`
    : `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;

  return (
    <motion.button 
      className={finalClass} 
      variants={buttonHoverVariant}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...(props as import('framer-motion').HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
}
