// Essentials
import { useState, useEffect } from 'react';

// Components
import Form from "./components/form/Form";
import ParticleHandler from "./components/particles/ParticleHandler";

// Styling
import './App.css';

// Types
import { Dispatch, SetStateAction } from 'react';

const getCoinTypes = async (setCoinTypes: Dispatch<SetStateAction<any>>) => {
  const response = await fetch('https://interview.switcheo.com/prices.json');
  const coinTypes = await response.json();
  setCoinTypes(coinTypes);
};

const App = () => {
  const [coinTypes, setCoinTypes] = useState([]);

  useEffect(() => {
    getCoinTypes(setCoinTypes);
  }, []);

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
