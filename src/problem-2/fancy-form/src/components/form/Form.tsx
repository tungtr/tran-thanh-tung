// Essentials
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Interfaces
import { IToken } from "@interfaces/Interfaces";

// Styling
import './Form.css';

interface IForm {
  send: number;
};

const Form = ({
  tokens
}: {
  tokens: IToken[]
}) => {
  const [sendToken, setSendToken] = useState<IToken>(tokens[0]);
  const [receiveValue, setReceiveValue] = useState(0);
  const [receiveToken, setReceiveToken] = useState<IToken>(tokens[0]);
  const calcReceive = (data: IForm) => setReceiveValue((data.send * receiveToken.price) / sendToken.price);

  const { register, getValues, handleSubmit, formState: { errors } } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => calcReceive(data);

  useEffect(() => {
    calcReceive({ send: getValues('send') });
  }, [sendToken, receiveToken]);

  return (
    <div className='form-container'>
      <h1>Currency Swap</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="input-container">
          <label>
            Amount to send
          </label>
          <input {...register('send', { required: true })} />
          <span className='space' />
          <select name='token-select' onChange={(event) => setSendToken(tokens[event.target.selectedIndex])}>
            {tokens.map((token, idx) => (
              <option key={idx} value={token.currency}>
                {token.currency}
              </option>
            ))}
          </select>
          {errors.send && errors.send.type === 'required' &&
            <p className='alert'>*This field is required</p>
          }
        </div>

        <button>
          Swap
        </button>

        <div className="input-container">
          <label>
            Amount to receive
          </label>
          <input value={receiveValue} readOnly />
          <span className='space' />
          <select name='token-select' onChange={(event) => setReceiveToken(tokens[event.target.selectedIndex])}>
            {tokens.map((token, idx) => (
              <option key={idx} value={token.currency}>
                {token.currency}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

export default Form;