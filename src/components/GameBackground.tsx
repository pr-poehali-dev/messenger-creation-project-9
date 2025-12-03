import BackgroundSky from './background/BackgroundSky';
import BackgroundBuildings from './background/BackgroundBuildings';
import BackgroundNature from './background/BackgroundNature';
import BackgroundAnimations from './background/BackgroundAnimations';

export default function GameBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-cyan-300 to-emerald-200">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-700 via-green-600 to-transparent"></div>
          
          <BackgroundSky />
          <BackgroundBuildings />
          <BackgroundNature />
        </div>
      </div>

      <BackgroundAnimations />
    </>
  );
}
