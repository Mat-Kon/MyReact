import React from 'react';
import { Link } from 'react-router-dom';

const ControlledFormPage: React.FC = () => {
  return (
    <>
      <h1>Controlled form</h1>
      <Link to={'/'} className='back-btn'>Back</Link>
      <div className='form-container'>
        <form className='controlled' action=''>
          <label htmlFor='name'> Name:
            <input type='text' name='name' id='name' />
          </label>

          <label htmlFor='age'>Age:
            <input type='number' name='age' id='age' />
          </label>

          <label htmlFor='email'>Email:
            <input type='email' name='email' id='email' />
          </label>

          <fieldset className='passwords'>
            <legend>Passwords</legend>
            <label htmlFor='passwords-1'> Base:
              <input type='password' name='passwords-1' id='password-1' />
            </label>
            <label htmlFor='password-2'>Confirm:
              <input type='password' name='password-2' id='password-2' />
            </label>
          </fieldset>

          <fieldset className='gender'>
            <legend>Gender</legend>
            <label htmlFor='man'>
              <input type='radio' name='man' id='man' />
              Man
            </label>
            <label htmlFor='woman'>
              <input type='radio' name='woman' id='woman' />
              Woman
            </label>
          </fieldset>

          <label htmlFor='accept'>Accept
            <input type='radio' name='accept' id='accept' />
            I agree with <Link to={'?accept'}>that</Link>
          </label>

          <label htmlFor='file'>Choose a picture
            <input type="file" accept=".png,.jpeg" name='file' id='file'/>
          </label>

          <div>
            <label htmlFor="countrySelect">Выберите страну:</label>
            <select id="countrySelect">
              <option value="">Выберите страну</option>
                <option value="latvia">
                  Latvia
                </option>
                <option value="georgia">
                  Georgia
                </option>
                <option value="canada">
                  Canada
                </option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
};

export default ControlledFormPage;
