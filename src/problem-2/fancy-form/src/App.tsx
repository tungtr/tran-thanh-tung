// Components
import Form from "./components/form/Form";
import ParticleHandler from "./components/particles/ParticleHandler";

// Styling
import './App.css';

const App = () => {
  return (
    <div className='master-container'>
      <ParticleHandler />
      <div className='content-container'>
        <Form />
      </div>
    </div>
  );
}

export default App;
