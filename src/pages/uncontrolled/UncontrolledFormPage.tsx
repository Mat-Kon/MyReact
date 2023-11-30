import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import InputImage from '../../components/InputImg';

const UncontrolledFormPage: React.FC = () => {
  const [isValide, setValide] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstPasRef = useRef<HTMLInputElement>(null);
  const secondPasRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const handlerFile = (event: ChangeEvent) => {
    const targetElem = event.target as HTMLInputElement;
    const selectFile = targetElem.files && targetElem.files[0];

    if(selectFile) {
      console.log(selectFile);
    }
  }

  const handlerSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      firstPassword: firstPasRef.current?.value,
      secondPassword: secondPasRef.current?.value,
      gender: genderRef.current?.checked,
      accept: acceptRef.current?.checked,
      picture: pictureRef,
      country: countryRef.current?.value,
    }
    console.log(formData);
  }

  return (
    <>
      <h1>Uncontrolled form</h1>
      <Link to={'/'} className='back-btn'>Back</Link>
      <div className='form-container'>
        <form className='controlled' onSubmit={handlerSubmit}>
          <label htmlFor='name'> Name:
            <input type='text' name='name' id='name' ref={nameRef}/>
          </label>

          <label htmlFor='age'>Age:
            <input type='text' name='age' id='age' ref={ageRef}/>
          </label>

          <label htmlFor='email'>Email:
            <input type='text' name='email' id='email' ref={emailRef}/>
          </label>

          <fieldset className='passwords'>
            <legend>Passwords</legend>
            <label htmlFor='passwords-1'> Base:
              <input type='password' name='passwords-1' id='passwords-1' ref={firstPasRef}/>
            </label>
            <label htmlFor='password-2'>Confirm:
              <input type='password' name='password-2' id='password-2' ref={secondPasRef}/>
            </label>
          </fieldset>

          <fieldset className='gender'>
            <legend>Gender</legend>
            <label htmlFor='man'>
              <input type='radio' name='gender' id='man' ref={genderRef}/>
              Man
            </label>
            <label htmlFor='woman'>
              <input type='radio' name='gender' id='woman' ref={genderRef}/>
              Woman
            </label>
          </fieldset>

          <label htmlFor='accept'>Accept
            <input type='radio' name='accept' id='accept' ref={acceptRef}/>
            I agree with <Link to={'?accept'}>that</Link>
          </label>

          <InputImage />

          <div>
            <label htmlFor="countrySelect">Выберите страну:</label>
            <select id="countrySelect" ref={countryRef}>
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
          <input type='submit' value={'Submit'}/>
        </form>
      </div>
    </>
  );
};

export default UncontrolledFormPage;
