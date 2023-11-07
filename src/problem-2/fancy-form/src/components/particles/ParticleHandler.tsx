// Essentials
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// Constants
import particleOptions from '../../utils/constants/particleOptions.json';

// Types
import type { Engine } from 'tsparticles-engine';

const ParticleHandler = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles 
      init={particlesInit}
      options={particleOptions}
    />
  );
}

export default ParticleHandler;