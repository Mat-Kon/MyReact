import { ChangeEvent, useState } from "react";
import { ValidationError, string} from 'yup';

const nameVerification = string()
                        .matches(/^[A-Z][a-zA-Z]*$/, 'Name should start with an uppercase letter')
                        .required('Name is required');

const InputName = () => {
  const [name, setName] = useState('');
  const [isValid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlerInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const curName = event.target.value;
    setName(curName);

    try {
      await nameVerification.validate(curName);
      setValid(true);
    } catch (error: unknown) {
      setValid(false);
      if (error instanceof ValidationError) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <label htmlFor='name'> Name:
      <input type='text' name='name' id='name' onChange={handlerInput} value={name}/>
      {!isValid ? <p className='error-message'>{errorMessage}</p> : null}
    </label>
  );
};

export default InputName;