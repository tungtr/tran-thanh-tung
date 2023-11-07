// Essentials
import { useState, useEffect } from 'react';

// Components
import Form from "./components/form/Form";
import ParticleHandler from "./components/particles/ParticleHandler";

// Interfaces
import { IToken } from "@interfaces/Interfaces";

// Styling
import './App.css';

// Types
import { Dispatch, SetStateAction } from 'react';

const getTokens = async (setTokens: Dispatch<SetStateAction<IToken[]>>) => {
  const response = await fetch('https://interview.switcheo.com/prices.json');
  const tokens = await response.json();
  setTokens(tokens);
};

const App = () => {
  const [tokens, setTokens] = useState<IToken[]>([]);

  useEffect(() => {
    getTokens(setTokens);
  }, []);

  return (
    <div className='master-container'>
      <ParticleHandler />
      {tokens.length > 0 &&
        <div className='content-container'>
          <Form tokens={tokens} />
        </div>
      }
    </div>
  );
}

export default App;
