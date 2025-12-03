export default function BackgroundSky() {
  return (
    <>
      <div className="absolute top-10 left-[5%] animate-cloud-float-1">
        <div className="text-8xl drop-shadow-2xl opacity-80">☁️</div>
      </div>
      <div className="absolute top-20 right-[10%] animate-cloud-float-2">
        <div className="text-9xl drop-shadow-2xl opacity-90">☁️</div>
      </div>
      <div className="absolute top-32 left-[40%] animate-cloud-float-3">
        <div className="text-7xl drop-shadow-2xl opacity-75">☁️</div>
      </div>
      <div className="absolute top-40 right-[30%] animate-cloud-float-4">
        <div className="text-8xl drop-shadow-2xl opacity-85">☁️</div>
      </div>
      <div className="absolute top-[55%] left-[35%] animate-cloud-small">
        <div className="text-6xl drop-shadow-xl opacity-70">☁️</div>
      </div>
      
      <div className="absolute top-16 right-[15%] animate-sun-shine">
        <div className="text-9xl filter brightness-125 drop-shadow-2xl">☀️</div>
      </div>
      
      <div className="absolute top-[25%] right-[20%] animate-rainbow-shimmer">
        <div className="text-8xl drop-shadow-xl filter brightness-110">🌈</div>
      </div>
      
      <div className="absolute top-[20%] left-[25%] animate-star-shine">
        <div className="text-5xl drop-shadow-lg">⭐</div>
      </div>
      
      <div className="absolute top-[35%] left-[10%] animate-balloon-float">
        <div className="text-6xl drop-shadow-lg">🎈</div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-amber-100/40 via-transparent to-transparent animate-light-shimmer pointer-events-none"></div>
      
      <div className="absolute top-[25%] left-[30%] w-3 h-3 bg-white rounded-full animate-star-twinkle-1"></div>
      <div className="absolute top-[35%] right-[25%] w-2 h-2 bg-yellow-200 rounded-full animate-star-twinkle-2"></div>
      <div className="absolute bottom-[40%] left-[50%] w-3 h-3 bg-white rounded-full animate-star-twinkle-3"></div>
      <div className="absolute top-[15%] right-[35%] w-2 h-2 bg-cyan-200 rounded-full animate-star-twinkle-4"></div>
      <div className="absolute bottom-[50%] left-[20%] w-3 h-3 bg-pink-200 rounded-full animate-star-twinkle-5"></div>
      <div className="absolute top-[70%] right-[60%] w-2 h-2 bg-purple-200 rounded-full animate-star-twinkle-6"></div>
    </>
  );
}
