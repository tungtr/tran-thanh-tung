// Components
import ParticleHandler from "./components/particles/ParticleHandler";

// Styling
import './App.css';

const App = () => {
  return (
    <div className='master-container'>
      <ParticleHandler />
      <div className='content-container'>
        Fancy form
      </div>
    </div>
  );
}

export default App;
