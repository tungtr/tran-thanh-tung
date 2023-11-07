// Essentials
import moment from "moment";

// Interfaces
import { IToken } from "@interfaces/Interfaces";

// Styling
import './TokenInfo.css';

// Types
import { Dispatch, SetStateAction } from "react";

const TokenInfo = ({
  currentToken,
  tokens,
  setToken
}: {
  currentToken: IToken,
  tokens: IToken[]
  setToken: Dispatch<SetStateAction<IToken>>
}) => {
  return (
    <div className="token-container">
      <span className='token-info'>
        <div className='token-header'>
          <img src={`tokens/${currentToken.currency}.svg`} width={24} height={24} />
          <span className='token-currency'><b>Price: </b>{currentToken.price}</span>
        </div>
        <div className='token-date'>
          Date: {moment(currentToken.date).format('DD/MM/YYYY hh:mm:ss')}
        </div>
      </span>
      <select name='token-select' onChange={(event) => setToken(tokens[event.target.selectedIndex])}>
        {tokens.map((token, idx) => (
          <option key={idx} value={token.currency}>
            {token.currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TokenInfo;