// Styling
import './Form.css';

const Form = () => {
  return (
    <div className='form-container'>
      <h1>Currency Swap</h1>
      <form>
        <div className="input-container">
          <label>
            Amount to send
          </label>
          <input />
        </div>
        <button>
          Swap
        </button>
        <div className="input-container">
          <label>
            Amount to receive
          </label>
          <input readOnly />
        </div>
      </form>
    </div>
  );
}

export default Form;