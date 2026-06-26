import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 
    | 'primary' 
    | 'horizontal' 
    | 'vertical' 
    | 'icon' 
    | 'monogram' 
    | 'header' 
    | 'mobile' 
    | 'favicon';
  theme?: 'light' | 'dark' | 'foil' | 'monochrome';
  width?: number;
  height?: number;
}

export default function Logo({ 
  className = '', 
  variant = 'horizontal', 
  theme = 'light',
  width = 64, 
  height = 64 
}: LogoProps) {
  
  // Luxury Color Palette
  const colors = {
    primaryGold: '#D4AF37',
    luxuryGold: '#FFD700',
    antiqueGold: '#B8860B',
    royalBlack: '#111111',
    deepCharcoal: '#1A1A1A',
    ivoryWhite: '#F8F8F8'
  };

  // Monochrome override
  const isMono = theme === 'monochrome';
  const monoColor = 'currentColor'; // Inherits text color of parent

  // Determine text and background colors based on theme
  const isDark = theme === 'dark' || theme === 'foil';
  const textPrimary = isMono ? monoColor : (isDark ? colors.luxuryGold : colors.royalBlack);
  const textSecondary = isMono ? monoColor : (isDark ? colors.ivoryWhite : colors.deepCharcoal);
  const textAccent = isMono ? monoColor : (isDark ? colors.primaryGold : colors.antiqueGold);

  const renderEmblem = () => (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${theme === 'foil' ? 'drop-shadow-lg' : 'drop-shadow-sm'}`}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.luxuryGold} />
          <stop offset="50%" stopColor={colors.primaryGold} />
          <stop offset="100%" stopColor={colors.antiqueGold} />
        </linearGradient>
        
        <linearGradient id="goldGradientInverted" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={colors.luxuryGold} />
          <stop offset="50%" stopColor={colors.primaryGold} />
          <stop offset="100%" stopColor={colors.antiqueGold} />
        </linearGradient>

        <linearGradient id="darkBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.deepCharcoal} />
          <stop offset="100%" stopColor={colors.royalBlack} />
        </linearGradient>

        <filter id="foilEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* Background Seal */}
      <circle 
        cx="50" cy="50" r="48" 
        fill={isMono ? 'none' : (isDark ? 'url(#darkBg)' : colors.ivoryWhite)} 
        stroke={isMono ? monoColor : 'url(#goldGradient)'} 
        strokeWidth="1.5" 
      />

      {/* Intricate Sunburst/Lotus Ring (Heritage Coin Engraving) */}
      <g>
        {Array.from({ length: 36 }).map((_, i) => (
          <path 
            key={i} 
            d="M50 4 L51 8 L49 8 Z" 
            fill={isMono ? monoColor : 'url(#goldGradient)'}
            transform={`rotate(${i * 10} 50 50)`}
          />
        ))}
      </g>

      {/* Inner Beaded Ring */}
      <circle 
        cx="50" cy="50" r="40" 
        stroke={isMono ? monoColor : 'url(#goldGradientInverted)'} 
        strokeWidth="1.5" 
        strokeDasharray="2 4" 
        strokeLinecap="round" 
      />

      {/* Royal Geometric Core (Temple Architecture Motif) */}
      <path 
        d="M50 15 L85 50 L50 85 L15 50 Z" 
        stroke={isMono ? monoColor : 'url(#goldGradient)'} 
        strokeWidth="1" 
        fill="none" 
        opacity="0.3"
      />
      <path 
        d="M50 20 L80 50 L50 80 L20 50 Z" 
        stroke={isMono ? monoColor : 'url(#goldGradientInverted)'} 
        strokeWidth="1" 
        fill="none" 
        opacity="0.5"
      />

      {/* Center Shield/Crest Background */}
      <circle cx="50" cy="50" r="32" fill={isMono ? 'none' : (isDark ? colors.royalBlack : '#FFFFFF')} />
      <circle cx="50" cy="50" r="30" stroke={isMono ? monoColor : 'url(#goldGradient)'} strokeWidth="1" opacity="0.6"/>

      {/* Royal Crown Ornament (Top) */}
      <path 
        d="M44 26 C48 20, 52 20, 56 26 C53 28, 47 28, 44 26 Z" 
        fill={isMono ? monoColor : 'url(#goldGradient)'} 
      />
      <circle cx="50" cy="22" r="1.5" fill={isMono ? monoColor : colors.luxuryGold} />

      {/* Heritage Monogram: SH */}
      {/* Handcrafted S & H combination logic: We use exquisite serif typography treated as an SVG object with heavy foil filters. */}
      <text 
        x="50" 
        y="58" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="30" 
        fontWeight="900" 
        fill={isMono ? monoColor : 'url(#goldGradient)'} 
        textAnchor="middle" 
        letterSpacing="1"
        filter={theme === 'foil' ? 'url(#foilEffect)' : 'none'}
      >
        SH
      </text>

      {/* Bottom Diamond Ornament */}
      <path d="M50 78 L47 72 L53 72 Z" fill={isMono ? monoColor : 'url(#goldGradientInverted)'} />
    </svg>
  );

  const renderTypographyBlock = (align: 'left' | 'center' = 'left') => (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'justify-center'}`}>
      <span 
        className={`${align === 'center' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} font-bold leading-tight`} 
        style={{ color: textPrimary }}
      >
        શ્રી હરિ જ્વેલર્સ
      </span>
      <span 
        className={`${align === 'center' ? 'text-xs md:text-sm mt-1.5' : 'text-[10px] md:text-xs mt-0.5'} tracking-[0.2em] uppercase font-serif`} 
        style={{ color: textSecondary }}
      >
        Shree Hari Jewellers
      </span>
      <span 
        className={`${align === 'center' ? 'text-[10px] mt-2' : 'text-[8px] md:text-[9px] mt-0.5'} font-bold`} 
        style={{ color: textAccent }}
      >
        પાદરાવાળા
      </span>
    </div>
  );

  // Return logic based on variant
  switch (variant) {
    case 'monogram':
    case 'favicon':
      return (
        <div className={`inline-flex ${className}`}>
          <svg 
            width={width} 
            height={height} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 drop-shadow-md"
          >
            {/* Same defs */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.luxuryGold} />
                <stop offset="50%" stopColor={colors.primaryGold} />
                <stop offset="100%" stopColor={colors.antiqueGold} />
              </linearGradient>
            </defs>
            {/* Monogram only */}
            <circle cx="50" cy="50" r="48" fill={isDark ? colors.royalBlack : colors.ivoryWhite} stroke="url(#goldGradient)" strokeWidth="2" />
            <text x="50" y="62" fontFamily="Georgia, serif" fontSize="40" fontWeight="900" fill="url(#goldGradient)" textAnchor="middle" letterSpacing="1">SH</text>
          </svg>
        </div>
      );

    case 'icon':
    case 'mobile':
      return (
        <div className={`inline-flex ${className}`}>
          {renderEmblem()}
        </div>
      );

    case 'vertical':
    case 'primary':
      return (
        <div className={`flex flex-col items-center gap-6 ${className}`}>
          {renderEmblem()}
          {renderTypographyBlock('center')}
        </div>
      );

    case 'header':
    case 'horizontal':
    default:
      return (
        <div className={`flex items-center gap-5 ${className}`}>
          {renderEmblem()}
          {renderTypographyBlock('left')}
        </div>
      );
  }
}
