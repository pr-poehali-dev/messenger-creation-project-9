export default function DragonImage() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dragonBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ff6b35', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#f7931e', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="dragonWing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ff8c42', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#ffa500', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: '#ffcc00', stopOpacity: 0.7 }} />
        </linearGradient>
        <radialGradient id="dragonGlow">
          <stop offset="0%" style={{ stopColor: '#ffff00', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#ff6600', stopOpacity: 0 }} />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <ellipse cx="200" cy="380" rx="80" ry="15" fill="rgba(0,0,0,0.3)" />
      
      <path d="M 100 250 Q 80 200 90 150 Q 100 120 120 140 Q 130 160 120 200 Z" 
        fill="url(#dragonWing)" stroke="#d4782f" strokeWidth="2" opacity="0.9" />
      
      <path d="M 300 250 Q 320 200 310 150 Q 300 120 280 140 Q 270 160 280 200 Z" 
        fill="url(#dragonWing)" stroke="#d4782f" strokeWidth="2" opacity="0.9" />
      
      <ellipse cx="200" cy="320" rx="45" ry="60" fill="url(#dragonBody)" stroke="#d4782f" strokeWidth="2" />
      
      <circle cx="200" cy="240" r="50" fill="url(#dragonBody)" stroke="#d4782f" strokeWidth="2" />
      
      <ellipse cx="200" cy="180" rx="40" ry="45" fill="url(#dragonBody)" stroke="#d4782f" strokeWidth="2" />
      
      <path d="M 180 160 L 170 140 L 175 160 Z" fill="#8b0000" stroke="#d4782f" strokeWidth="1.5" />
      <path d="M 200 155 L 200 130 L 205 155 Z" fill="#8b0000" stroke="#d4782f" strokeWidth="1.5" />
      <path d="M 220 160 L 230 140 L 225 160 Z" fill="#8b0000" stroke="#d4782f" strokeWidth="1.5" />
      
      <circle cx="185" cy="185" r="8" fill="#ffff00" filter="url(#glow)" />
      <circle cx="185" cy="185" r="4" fill="#ff0000" />
      
      <circle cx="215" cy="185" r="8" fill="#ffff00" filter="url(#glow)" />
      <circle cx="215" cy="185" r="4" fill="#ff0000" />
      
      <path d="M 200 195 Q 195 200 190 198" stroke="#8b0000" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 200 195 Q 205 200 210 198" stroke="#8b0000" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      <ellipse cx="170" cy="310" rx="15" ry="25" fill="url(#dragonBody)" stroke="#d4782f" strokeWidth="2" />
      <ellipse cx="230" cy="310" rx="15" ry="25" fill="url(#dragonBody)" stroke="#d4782f" strokeWidth="2" />
      
      <ellipse cx="170" cy="340" rx="12" ry="8" fill="#8b4513" />
      <path d="M 160 345 L 155 355 L 165 350 Z" fill="#4a2511" />
      <path d="M 170 345 L 168 356 L 175 350 Z" fill="#4a2511" />
      <path d="M 180 345 L 182 356 L 185 350 Z" fill="#4a2511" />
      
      <ellipse cx="230" cy="340" rx="12" ry="8" fill="#8b4513" />
      <path d="M 220 345 L 215 355 L 225 350 Z" fill="#4a2511" />
      <path d="M 230 345 L 228 356 L 235 350 Z" fill="#4a2511" />
      <path d="M 240 345 L 242 356 L 245 350 Z" fill="#4a2511" />
      
      <path d="M 185 360 Q 180 370 175 380" stroke="url(#dragonBody)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 215 360 Q 220 370 225 380" stroke="url(#dragonBody)" strokeWidth="8" fill="none" strokeLinecap="round" />
      
      <path d="M 200 270 Q 180 300 170 340" stroke="#d4782f" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M 200 270 Q 210 295 215 320" stroke="#d4782f" strokeWidth="3" fill="none" opacity="0.5" />
      
      <circle cx="190" cy="200" r="2" fill="#fff" opacity="0.8" />
      <circle cx="220" cy="200" r="2" fill="#fff" opacity="0.8" />
      
      <path d="M 150 250 L 140 270 L 155 260 L 145 280 L 160 268 Z" 
        fill="url(#dragonWing)" stroke="#d4782f" strokeWidth="1.5" opacity="0.7" />
      <path d="M 250 250 L 260 270 L 245 260 L 255 280 L 240 268 Z" 
        fill="url(#dragonWing)" stroke="#d4782f" strokeWidth="1.5" opacity="0.7" />
      
      <ellipse cx="200" cy="380" rx="15" ry="20" fill="url(#dragonBody)" stroke="#d4782f" strokeWidth="2" />
      <path d="M 200 395 L 195 410 L 200 405 L 205 410 Z" fill="#8b0000" stroke="#d4782f" strokeWidth="1.5" />
    </svg>
  );
}
