export default function DragonImage() {
  return (
    <svg viewBox="0 0 500 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#d32f2f', stopOpacity: 1 }} />
          <stop offset="40%" style={{ stopColor: '#f57c00', stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: '#ffa726', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ffd54f', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ff6f00', stopOpacity: 0.9 }} />
          <stop offset="50%" style={{ stopColor: '#ffb300', stopOpacity: 0.7 }} />
          <stop offset="100%" style={{ stopColor: '#ffd740', stopOpacity: 0.8 }} />
        </linearGradient>
        <radialGradient id="eyeGlow">
          <stop offset="0%" style={{ stopColor: '#ffeb3b', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#ff9800', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#ff5722', stopOpacity: 0 }} />
        </radialGradient>
        <filter id="shadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="2" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="250" cy="570" rx="120" ry="20" fill="rgba(0,0,0,0.4)" />

      <g filter="url(#shadow)">
        <path d="M 120 280 Q 60 220 70 150 Q 80 80 110 100 Q 140 130 150 180 Q 160 230 140 280 Z" 
          fill="url(#wingGrad)" stroke="#b85a00" strokeWidth="3" />
        <path d="M 130 200 L 90 160 M 140 230 L 100 200 M 150 260 L 115 240" 
          stroke="#d4782f" strokeWidth="2" opacity="0.6" />
      </g>

      <g filter="url(#shadow)">
        <path d="M 380 280 Q 440 220 430 150 Q 420 80 390 100 Q 360 130 350 180 Q 340 230 360 280 Z" 
          fill="url(#wingGrad)" stroke="#b85a00" strokeWidth="3" />
        <path d="M 370 200 L 410 160 M 360 230 L 400 200 M 350 260 L 385 240" 
          stroke="#d4782f" strokeWidth="2" opacity="0.6" />
      </g>

      <ellipse cx="280" cy="520" rx="22" ry="35" fill="url(#bodyGrad)" stroke="#8b4513" strokeWidth="3" />
      <ellipse cx="280" cy="560" rx="18" ry="12" fill="#6d4c41" />
      <path d="M 270 565 L 265 580 L 272 570 Z" fill="#3e2723" />
      <path d="M 280 565 L 278 582 L 283 570 Z" fill="#3e2723" />
      <path d="M 290 565 L 292 582 L 293 570 Z" fill="#3e2723" />

      <ellipse cx="220" cy="520" rx="22" ry="35" fill="url(#bodyGrad)" stroke="#8b4513" strokeWidth="3" />
      <ellipse cx="220" cy="560" rx="18" ry="12" fill="#6d4c41" />
      <path d="M 210 565 L 205 580 L 212 570 Z" fill="#3e2723" />
      <path d="M 220 565 L 218 582 L 223 570 Z" fill="#3e2723" />
      <path d="M 230 565 L 232 582 L 233 570 Z" fill="#3e2723" />

      <path d="M 250 450 Q 230 480 220 520" stroke="#8b4513" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M 250 450 Q 270 480 280 520" stroke="#8b4513" strokeWidth="12" fill="none" strokeLinecap="round" />

      <ellipse cx="250" cy="420" rx="70" ry="90" fill="url(#bodyGrad)" stroke="#b85a00" strokeWidth="3" />
      
      <path d="M 230 400 Q 228 395 230 390 M 240 410 Q 238 405 240 400 M 250 420 Q 248 415 250 410" 
        stroke="#8b0000" strokeWidth="2" opacity="0.5" />
      <path d="M 270 400 Q 272 395 270 390 M 260 410 Q 262 405 260 400" 
        stroke="#8b0000" strokeWidth="2" opacity="0.5" />

      <circle cx="250" cy="320" r="65" fill="url(#bodyGrad)" stroke="#b85a00" strokeWidth="3" />
      
      <ellipse cx="190" cy="380" rx="20" ry="30" fill="url(#bodyGrad)" stroke="#8b4513" strokeWidth="3" />
      <ellipse cx="310" cy="380" rx="20" ry="30" fill="url(#bodyGrad)" stroke="#8b4513" strokeWidth="3" />

      <ellipse cx="190" cy="415" rx="16" ry="10" fill="#6d4c41" />
      <path d="M 180 418 L 175 430 L 183 422 Z" fill="#3e2723" />
      <path d="M 190 418 L 188 432 L 193 422 Z" fill="#3e2723" />
      <path d="M 200 418 L 202 432 L 203 422 Z" fill="#3e2723" />

      <ellipse cx="310" cy="415" rx="16" ry="10" fill="#6d4c41" />
      <path d="M 300 418 L 295 430 L 303 422 Z" fill="#3e2723" />
      <path d="M 310 418 L 308 432 L 313 422 Z" fill="#3e2723" />
      <path d="M 320 418 L 322 432 L 323 422 Z" fill="#3e2723" />

      <ellipse cx="250" cy="240" rx="55" ry="60" fill="url(#bodyGrad)" stroke="#b85a00" strokeWidth="3" />
      
      <path d="M 220 220 L 210 190 L 217 220 Z" fill="#8b0000" stroke="#5d0000" strokeWidth="2" />
      <path d="M 235 210 L 230 175 L 237 210 Z" fill="#8b0000" stroke="#5d0000" strokeWidth="2" />
      <path d="M 250 205 L 250 165 L 255 205 Z" fill="#c41e3a" stroke="#8b0000" strokeWidth="2" />
      <path d="M 265 210 L 270 175 L 263 210 Z" fill="#8b0000" stroke="#5d0000" strokeWidth="2" />
      <path d="M 280 220 L 290 190 L 283 220 Z" fill="#8b0000" stroke="#5d0000" strokeWidth="2" />

      <ellipse cx="230" cy="245" r="12" fill="url(#eyeGlow)" filter="url(#glow)" />
      <ellipse cx="230" cy="245" rx="10" ry="12" fill="#ffeb3b" />
      <ellipse cx="230" cy="245" rx="6" ry="8" fill="#ff6f00" />
      <ellipse cx="228" cy="242" rx="3" ry="4" fill="#000" />
      <ellipse cx="232" cy="247" rx="2" ry="2" fill="#fff" opacity="0.8" />

      <ellipse cx="270" cy="245" r="12" fill="url(#eyeGlow)" filter="url(#glow)" />
      <ellipse cx="270" cy="245" rx="10" ry="12" fill="#ffeb3b" />
      <ellipse cx="270" cy="245" rx="6" ry="8" fill="#ff6f00" />
      <ellipse cx="268" cy="242" rx="3" ry="4" fill="#000" />
      <ellipse cx="272" cy="247" rx="2" ry="2" fill="#fff" opacity="0.8" />

      <path d="M 235 265 Q 240 270 245 268 Q 250 266 255 268 Q 260 270 265 265" 
        stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 240 268 L 243 275 L 246 268 L 250 273 L 254 268 L 257 275 L 260 268" 
        stroke="#ff4500" strokeWidth="2" fill="none" />

      <path d="M 250 470 Q 270 500 280 540 Q 285 560 290 580" 
        stroke="url(#bodyGrad)" strokeWidth="20" fill="none" strokeLinecap="round" />
      <path d="M 295 580 L 305 595 L 300 585 L 310 600 L 302 588 Z" 
        fill="#c41e3a" stroke="#8b0000" strokeWidth="2" />
      
      <circle cx="285" cy="510" r="4" fill="#ffeb3b" opacity="0.7" />
      <circle cx="290" cy="530" r="4" fill="#ffeb3b" opacity="0.7" />
      <circle cx="293" cy="550" r="4" fill="#ffeb3b" opacity="0.7" />

      <circle cx="230" cy="350" r="6" fill="rgba(255,235,59,0.3)" />
      <circle cx="260" cy="360" r="5" fill="rgba(255,235,59,0.3)" />
      <circle cx="240" cy="380" r="4" fill="rgba(255,235,59,0.3)" />
    </svg>
  );
}
