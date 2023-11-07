// Essentials
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Components
import TokenInfo from './TokenInfo';

// Interfaces
import { IToken, IForm } from "@interfaces/Interfaces";

// Styling
import './Form.css';

const Form = ({
  tokens
}: {
  tokens: IToken[]
}) => {
  const [sendToken, setSendToken] = useState<IToken>(tokens[0]);
  const [receiveValue, setReceiveValue] = useState(0);
  const [receiveToken, setReceiveToken] = useState<IToken>(tokens[0]);
  const calcReceive = (data: IForm) => setReceiveValue((data.send * sendToken.price) / receiveToken.price);

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
          {errors.send && errors.send.type === 'required' &&
            <p className='alert'>*This field is required</p>
          }
          <TokenInfo currentToken={sendToken} tokens={tokens} setToken={setSendToken} />
        </div>

        <button>
          Swap
        </button>

        <div className="input-container">
          <label>
            Amount to receive
          </label>
          <input value={receiveValue} readOnly />
          <TokenInfo currentToken={receiveToken} tokens={tokens} setToken={setReceiveToken} />
        </div>
      </form>
    </div>
  );
}

export default Form;