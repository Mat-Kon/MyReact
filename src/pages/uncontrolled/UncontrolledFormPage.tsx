import React, { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import InputImage from '../../components/InputImg';
import { userSchema } from '../../validation/yupValid';
import { ValidationError } from 'yup';
import { IErrors, IFormData } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHoks';
import { setForm } from '../../redux/slices/formSlice';

const UncontrolledFormPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const formData = useAppSelector((store) => store.form.form);
  const [errors, setErrors] = useState<Partial<IErrors>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstPasRef = useRef<HTMLInputElement>(null);
  const secondPasRef = useRef<HTMLInputElement>(null);
  const manRef = useRef<HTMLInputElement>(null);
  const womanRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData: IFormData = {
      name: nameRef.current?.value ?? '',
      age: ageRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      firstPassword: firstPasRef.current?.value ?? '',
      secondPassword: secondPasRef.current?.value ?? '',
      gender: manRef.current?.checked ? 'man' : womanRef.current?.checked ? 'woman' : '',
      accept: acceptRef.current?.checked ?? false,
      country: countryRef.current?.value ?? '',
    }
    checkingForm(formData);
  }

  const checkingForm = async (formData: IFormData ) => {
    try {
      await userSchema.validate(formData, { abortEarly: false });
      setErrors({});
      dispatch(setForm(formData));
      navigate('/');
    } catch(errors: unknown) {
      if (errors instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        errors.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        })
        setErrors(newErrors);
      }
    }
  }

  return (
    <>
      <h1>Uncontrolled form</h1>
      <Link to={'/'} className='back-btn'>Back</Link>
      <div className='form-container'>
        <form className='controlled' onSubmit={handlerSubmit}>
          <label htmlFor='name'> Name:
            <input type='text' name='name' id='name' ref={nameRef} autoComplete='name'/>
            {errors.name ? <p className='error-message'>{errors.name}</p> : null}
          </label>

          <label htmlFor='age'>Age:
            <input type='text' name='age' id='age' ref={ageRef}/>
            {errors.age ? <p className='error-message'>{errors.age}</p> : null}
          </label>

          <label htmlFor='email'>Email:
            <input type='text' name='email' id='email' ref={emailRef}/>
            {errors.email ? <p className='error-message'>{errors.email}</p> : null}
          </label>

          <fieldset className='passwords'>
            <legend>Passwords</legend>
            <label htmlFor='passwords-1'> Base:
              <input type='password' name='passwords-1' id='passwords-1' ref={firstPasRef}/>
              {errors.firstPassword ? <p className='error-message'>{errors.firstPassword}</p> : null}
            </label>
            <label htmlFor='password-2'>Confirm:
              <input type='password' name='password-2' id='password-2' ref={secondPasRef}/>
              {errors.secondPassword ? <p className='error-message'>{errors.secondPassword}</p> : null}
            </label>
          </fieldset>

          <fieldset className='gender'>
            <legend>Gender</legend>
            <label htmlFor='gender'>
              <input type='radio' name='gender' id='man' ref={manRef} value={'men'}/>
              Man
            </label>
            <label htmlFor='gender'>
              <input type='radio' name='gender' id='woman' ref={womanRef} value={'women'}/>
              Woman
            </label>
            {errors.gender ? <p className='error-message'>{errors.gender}</p> : null}
          </fieldset>

          <label htmlFor='accept'>Accept
            <input type='radio' name='accept' id='accept' ref={acceptRef}/>
            I agree with <Link to={'?accept'}>that</Link>
          </label>
            {errors.accept ? <p className='error-message'>{errors.accept}</p> : null}

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
            {errors.country ? <p className='error-message'>{errors.country}</p> : null}
          </div>
          <input type='submit' value={'Submit'}/>
        </form>
      </div>
    </>
  );
};

export default UncontrolledFormPage;
