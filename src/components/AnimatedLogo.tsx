export default function AnimatedLogo() {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg width="100%" height="100%" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M330 425 C330 350 390 290 465 290 L625 290 C700 290 760 350 760 425 L760 615 C760 690 700 750 625 750 L495 750 L400 820 L400 750 L465 750 C390 750 330 690 330 615 Z" fill="#1B4D5C" stroke="#1B4D5C" strokeWidth="10"/>
        
        <circle cx="465" cy="485" r="25" fill="#E91E63" className="animate-[pulse_2s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
        <circle cx="545" cy="485" r="25" fill="#E91E63" className="animate-[pulse_2s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
        <circle cx="625" cy="485" r="25" fill="#E91E63" className="animate-[pulse_2s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
        
        <path d="M870 545 C870 470 810 410 735 410 L575 410 C500 410 440 470 440 545 L440 735 C440 810 500 870 575 870 L705 870 L800 940 L800 870 L735 870 C810 870 870 810 870 735 Z" fill="#1B4D5C" stroke="#1B4D5C" strokeWidth="10"/>
        
        <circle cx="575" cy="640" r="25" fill="#00B4D8" className="animate-[pulse_2s_ease-in-out_infinite]" style={{ animationDelay: '0.6s' }} />
        <circle cx="655" cy="640" r="25" fill="#00B4D8" className="animate-[pulse_2s_ease-in-out_infinite]" style={{ animationDelay: '0.8s' }} />
        <circle cx="735" cy="640" r="25" fill="#00B4D8" className="animate-[pulse_2s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
      </svg>
    </div>
  );
}
