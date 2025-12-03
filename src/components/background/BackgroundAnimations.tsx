export default function BackgroundAnimations() {
  return (
    <style>{`
      @keyframes cloud-float-1 {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(100px, -20px); }
      }
      
      @keyframes cloud-float-2 {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-80px, -30px); }
      }
      
      @keyframes cloud-float-3 {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(60px, -25px); }
      }
      
      @keyframes cloud-float-4 {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-70px, -15px); }
      }
      
      @keyframes sun-shine {
        0%, 100% { transform: rotate(0deg) scale(1); filter: brightness(1.3); }
        50% { transform: rotate(180deg) scale(1.15); filter: brightness(1.5); }
      }
      
      @keyframes building-glow {
        0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(255, 215, 0, 0)); }
        50% { transform: scale(1.1); filter: brightness(1.2) drop-shadow(0 0 40px rgba(255, 215, 0, 0.9)); }
      }
      
      @keyframes house-bounce {
        0%, 100% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-20px) scale(1.05, 0.95); }
        50% { transform: translateY(-30px) scale(0.95, 1.05); }
        75% { transform: translateY(-15px) scale(1.02, 0.98); }
      }
      
      @keyframes wheat-wave {
        0%, 100% { transform: rotate(-8deg) scale(1); }
        50% { transform: rotate(8deg) scale(1.08); }
      }
      
      @keyframes tractor-move {
        0%, 100% { transform: translateX(0) rotate(-3deg); }
        50% { transform: translateX(80px) rotate(3deg); }
      }
      
      @keyframes tree-sway-natural {
        0%, 100% { transform: rotate(-3deg); transform-origin: bottom center; }
        50% { transform: rotate(3deg); transform-origin: bottom center; }
      }
      
      @keyframes flower-grow {
        0%, 100% { transform: scale(0.9) rotate(-5deg); }
        50% { transform: scale(1.15) rotate(5deg); }
      }
      
      @keyframes worker-build {
        0%, 100% { transform: rotate(-8deg) translateY(0); }
        25% { transform: rotate(8deg) translateY(-15px); }
        50% { transform: rotate(-8deg) translateY(0); }
        75% { transform: rotate(8deg) translateY(-15px); }
      }
      
      @keyframes farmer-walk {
        0% { transform: translateX(0) scaleX(1); }
        25% { transform: translateX(40px) scaleX(1) translateY(-8px); }
        50% { transform: translateX(80px) scaleX(-1); }
        75% { transform: translateX(40px) scaleX(-1) translateY(-8px); }
        100% { transform: translateX(0) scaleX(1); }
      }
      
      @keyframes bird-soar {
        0% { transform: translate(0, 0) rotate(-15deg); }
        20% { transform: translate(200px, -100px) rotate(10deg); }
        40% { transform: translate(400px, -60px) rotate(-10deg); }
        60% { transform: translate(600px, -120px) rotate(15deg); }
        80% { transform: translate(800px, -80px) rotate(-5deg); }
        100% { transform: translate(1000px, -100px) rotate(10deg); }
      }
      
      @keyframes monument-pulse {
        0%, 100% { filter: brightness(1) drop-shadow(0 0 0 rgba(255, 255, 255, 0)); }
        50% { filter: brightness(1.3) drop-shadow(0 0 25px rgba(255, 255, 255, 0.7)); }
      }
      
      @keyframes apple-swing {
        0%, 100% { transform: rotate(-12deg); transform-origin: top center; }
        50% { transform: rotate(12deg); transform-origin: top center; }
      }
      
      @keyframes bush-rustle {
        0%, 100% { transform: scale(1) rotate(-2deg); }
        25% { transform: scale(1.05) rotate(2deg); }
        50% { transform: scale(1) rotate(-2deg); }
        75% { transform: scale(1.05) rotate(2deg); }
      }
      
      @keyframes flower-bloom {
        0%, 100% { transform: scale(0.95); }
        50% { transform: scale(1.12); }
      }
      
      @keyframes butterfly-flutter {
        0% { transform: translate(0, 0) rotate(0deg); }
        15% { transform: translate(60px, -40px) rotate(15deg); }
        30% { transform: translate(120px, -20px) rotate(-10deg); }
        45% { transform: translate(180px, -60px) rotate(20deg); }
        60% { transform: translate(240px, -30px) rotate(-15deg); }
        75% { transform: translate(300px, -50px) rotate(10deg); }
        100% { transform: translate(360px, -40px) rotate(0deg); }
      }
      
      @keyframes rabbit-hop {
        0%, 100% { transform: translateX(0) translateY(0) scaleX(1); }
        25% { transform: translateX(30px) translateY(-25px) scaleX(1); }
        50% { transform: translateX(60px) translateY(0) scaleX(-1); }
        75% { transform: translateX(30px) translateY(-20px) scaleX(-1); }
      }
      
      @keyframes bee-buzz {
        0% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(8px, -8px) rotate(15deg); }
        20% { transform: translate(-8px, 8px) rotate(-15deg); }
        30% { transform: translate(15px, 0) rotate(10deg); }
        40% { transform: translate(-15px, -8px) rotate(-10deg); }
        50% { transform: translate(0, 15px) rotate(0deg); }
        60% { transform: translate(12px, -12px) rotate(12deg); }
        70% { transform: translate(-12px, 12px) rotate(-12deg); }
        80% { transform: translate(10px, -5px) rotate(8deg); }
        90% { transform: translate(-10px, 5px) rotate(-8deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
      
      @keyframes gem-sparkle {
        0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(138, 43, 226, 0)); }
        50% { transform: scale(1.25); filter: brightness(1.5) drop-shadow(0 0 50px rgba(138, 43, 226, 1)); }
      }
      
      @keyframes windmill-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes light-shimmer {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.5; }
      }
      
      @keyframes star-twinkle-1 {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(2); }
      }
      
      @keyframes star-twinkle-2 {
        0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(2.5) rotate(180deg); }
      }
      
      @keyframes star-twinkle-3 {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(2.2); }
      }
      
      @keyframes star-twinkle-4 {
        0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(2.8) rotate(90deg); }
      }
      
      @keyframes star-twinkle-5 {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(2.3); }
      }
      
      @keyframes star-twinkle-6 {
        0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(2.6) rotate(-90deg); }
      }
      
      @keyframes duck-waddle {
        0% { transform: translateX(0) scaleX(1) rotate(-5deg); }
        25% { transform: translateX(25px) scaleX(1) rotate(5deg); }
        50% { transform: translateX(50px) scaleX(-1) rotate(-5deg); }
        75% { transform: translateX(25px) scaleX(-1) rotate(5deg); }
        100% { transform: translateX(0) scaleX(1) rotate(-5deg); }
      }
      
      @keyframes balloon-float {
        0%, 100% { transform: translateY(0) rotate(-5deg); }
        25% { transform: translateY(-40px) rotate(3deg); }
        50% { transform: translateY(-60px) rotate(-3deg); }
        75% { transform: translateY(-40px) rotate(5deg); }
      }
      
      @keyframes cat-walk {
        0% { transform: translateX(0) scaleX(1); }
        50% { transform: translateX(60px) scaleX(-1); }
        100% { transform: translateX(0) scaleX(1); }
      }
      
      @keyframes chicken-peck {
        0%, 100% { transform: scaleY(1) translateY(0); }
        25% { transform: scaleY(0.9) translateY(5px); }
        50% { transform: scaleY(1) translateY(0); }
        75% { transform: scaleY(0.9) translateY(5px); }
      }
      
      @keyframes bird-fly-2 {
        0% { transform: translate(0, 0) rotate(10deg); }
        25% { transform: translate(-150px, -60px) rotate(-8deg); }
        50% { transform: translate(-300px, -30px) rotate(12deg); }
        75% { transform: translate(-450px, -80px) rotate(-10deg); }
        100% { transform: translate(-600px, -50px) rotate(8deg); }
      }
      
      @keyframes carrot-grow {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-15px) scale(1.12); }
      }
      
      @keyframes corn-sway {
        0%, 100% { transform: rotate(-6deg) scale(1); }
        50% { transform: rotate(6deg) scale(1.06); }
      }
      
      @keyframes mushroom-bob {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.08) rotate(-3deg); }
        50% { transform: scale(1.12) rotate(0deg); }
        75% { transform: scale(1.08) rotate(3deg); }
      }
      
      @keyframes rainbow-shimmer {
        0%, 100% { transform: scale(1); filter: brightness(1) hue-rotate(0deg); }
        50% { transform: scale(1.1); filter: brightness(1.3) hue-rotate(20deg); }
      }
      
      @keyframes well-pulse {
        0%, 100% { transform: scale(1); filter: brightness(1); }
        50% { transform: scale(1.08); filter: brightness(1.15); }
      }
      
      @keyframes fence-shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-2deg); }
        75% { transform: rotate(2deg); }
      }
      
      @keyframes cloud-small {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(50px); }
      }
      
      @keyframes pumpkin-bounce {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-18px) rotate(-8deg); }
        50% { transform: translateY(-25px) rotate(0deg); }
        75% { transform: translateY(-12px) rotate(8deg); }
      }
      
      @keyframes star-shine {
        0%, 100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
        50% { transform: scale(1.3) rotate(180deg); filter: brightness(1.6); }
      }
      
      @keyframes hay-shake {
        0%, 100% { transform: rotate(-4deg); }
        50% { transform: rotate(4deg); }
      }
      
      @keyframes ladybug-crawl {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(30px, 10px) rotate(15deg); }
        50% { transform: translate(60px, 0) rotate(0deg); }
        75% { transform: translate(30px, -10px) rotate(-15deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
      
      .animate-cloud-float-1 { animation: cloud-float-1 20s ease-in-out infinite; }
      .animate-cloud-float-2 { animation: cloud-float-2 25s ease-in-out infinite; animation-delay: 2s; }
      .animate-cloud-float-3 { animation: cloud-float-3 22s ease-in-out infinite; animation-delay: 5s; }
      .animate-cloud-float-4 { animation: cloud-float-4 28s ease-in-out infinite; animation-delay: 7s; }
      .animate-sun-shine { animation: sun-shine 50s linear infinite; }
      .animate-building-glow { animation: building-glow 7s ease-in-out infinite; }
      .animate-house-bounce { animation: house-bounce 6s ease-in-out infinite; }
      .animate-wheat-wave { animation: wheat-wave 5s ease-in-out infinite; }
      .animate-tractor-move { animation: tractor-move 12s ease-in-out infinite; }
      .animate-tree-sway-natural { animation: tree-sway-natural 7s ease-in-out infinite; }
      .animate-flower-grow { animation: flower-grow 8s ease-in-out infinite; }
      .animate-worker-build { animation: worker-build 3.5s ease-in-out infinite; }
      .animate-farmer-walk { animation: farmer-walk 14s ease-in-out infinite; }
      .animate-bird-soar { animation: bird-soar 30s linear infinite; }
      .animate-monument-pulse { animation: monument-pulse 6s ease-in-out infinite; }
      .animate-apple-swing { animation: apple-swing 4.5s ease-in-out infinite; }
      .animate-bush-rustle { animation: bush-rustle 4s ease-in-out infinite; }
      .animate-flower-bloom { animation: flower-bloom 7s ease-in-out infinite; animation-delay: 1s; }
      .animate-butterfly-flutter { animation: butterfly-flutter 25s ease-in-out infinite; }
      .animate-rabbit-hop { animation: rabbit-hop 7s ease-in-out infinite; }
      .animate-bee-buzz { animation: bee-buzz 2.5s ease-in-out infinite; }
      .animate-gem-sparkle { animation: gem-sparkle 5s ease-in-out infinite; }
      .animate-windmill-spin { animation: windmill-spin 8s linear infinite; }
      .animate-light-shimmer { animation: light-shimmer 5s ease-in-out infinite; }
      .animate-star-twinkle-1 { animation: star-twinkle-1 3s ease-in-out infinite; }
      .animate-star-twinkle-2 { animation: star-twinkle-2 4s ease-in-out infinite; animation-delay: 1.5s; }
      .animate-star-twinkle-3 { animation: star-twinkle-3 5s ease-in-out infinite; animation-delay: 2.5s; }
      .animate-star-twinkle-4 { animation: star-twinkle-4 3.5s ease-in-out infinite; animation-delay: 0.5s; }
      .animate-star-twinkle-5 { animation: star-twinkle-5 4.5s ease-in-out infinite; animation-delay: 2s; }
      .animate-star-twinkle-6 { animation: star-twinkle-6 3.8s ease-in-out infinite; animation-delay: 1s; }
      .animate-duck-waddle { animation: duck-waddle 8s ease-in-out infinite; }
      .animate-balloon-float { animation: balloon-float 10s ease-in-out infinite; }
      .animate-cat-walk { animation: cat-walk 16s ease-in-out infinite; }
      .animate-chicken-peck { animation: chicken-peck 2.5s ease-in-out infinite; }
      .animate-bird-fly-2 { animation: bird-fly-2 28s linear infinite; }
      .animate-carrot-grow { animation: carrot-grow 6.5s ease-in-out infinite; }
      .animate-corn-sway { animation: corn-sway 5.5s ease-in-out infinite; }
      .animate-mushroom-bob { animation: mushroom-bob 4.5s ease-in-out infinite; }
      .animate-rainbow-shimmer { animation: rainbow-shimmer 8s ease-in-out infinite; }
      .animate-well-pulse { animation: well-pulse 5s ease-in-out infinite; }
      .animate-fence-shake { animation: fence-shake 6s ease-in-out infinite; }
      .animate-cloud-small { animation: cloud-small 18s ease-in-out infinite; }
      .animate-pumpkin-bounce { animation: pumpkin-bounce 5.5s ease-in-out infinite; }
      .animate-star-shine { animation: star-shine 6s ease-in-out infinite; }
      .animate-hay-shake { animation: hay-shake 4.8s ease-in-out infinite; }
      .animate-ladybug-crawl { animation: ladybug-crawl 12s ease-in-out infinite; }
    `}</style>
  );
}
