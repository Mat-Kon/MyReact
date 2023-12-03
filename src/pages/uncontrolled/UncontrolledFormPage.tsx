import React, { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputImage from '../../components/InputImg';
import { uncontrolledFormSchema } from '../../validation/yupValid';
import { ValidationError } from 'yup';
import { IErrors, IUncontrolledFormData } from '../../types/types';
import { useAppDispatch } from '../../hooks/reduxHoks';
import { setForm } from '../../redux/slices/formsSlice';
import InputCountry from '../../components/InputCountry';

const UncontrolledFormPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Partial<IErrors>>({});
  const [disableBtn, setDisableBtn] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstPasRef = useRef<HTMLInputElement>(null);
  const secondPasRef = useRef<HTMLInputElement>(null);
  const manRef = useRef<HTMLInputElement>(null);
  const womanRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData: IUncontrolledFormData = {
      name: nameRef.current?.value ?? '',
      age: ageRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      firstPassword: firstPasRef.current?.value ?? '',
      secondPassword: secondPasRef.current?.value ?? '',
      gender: manRef.current?.checked ? 'man' : womanRef.current?.checked ? 'woman' : '',
      accept: acceptRef.current?.checked ?? false,
      country: countryRef.current?.value ?? '',
      img: imgRef.current?.value ?? '',
    }
    checkingForm(formData);
  }

  const handlerSubmitBtn = () => {
    const linsNumber = 9;
    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      firstPassword: firstPasRef.current?.value,
      secondPassword: secondPasRef.current?.value,
      gender: manRef.current?.checked ? 'man' : womanRef.current?.checked ? 'woman' : '',
      accept: acceptRef.current?.checked ?? false,
      country: countryRef.current?.value ?? '',
      img: imgRef.current?.value ?? '',
    }

    const isFormCompleted = Object.entries(formData).filter(([_, value]) => {
      if (value === false || !String(value).length) {
        return false;
      } else {
        return true;
      }
    }).length === linsNumber;

    if (isFormCompleted) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }
  
  const checkingForm = async (formData: IUncontrolledFormData ) => {
  
    try {
      await uncontrolledFormSchema.validate(formData, { abortEarly: false });
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
        <form className='uncontrolled' onSubmit={handlerSubmit} onChange={handlerSubmitBtn} autoComplete='username'>
          <label className="input__name" htmlFor='name'> Name:
            <input type='text' name='username' id='name' ref={nameRef} autoComplete='on' placeholder='name'/>
            {errors.name ? <p className='error-message'>{errors.name}</p> : null}
          </label>

          <label className='input__age' htmlFor='age'>Age:
            <input type='text' name='age' id='age' ref={ageRef} placeholder='age' autoComplete='age'/>
            {errors.age ? <p className='error-message'>{errors.age}</p> : null}
          </label>

          <label className="input__email" htmlFor='email'>Email:
            <input type='text' name='email' id='email' ref={emailRef} placeholder='email@dom' autoComplete='email'/>
            {errors.email ? <p className='error-message'>{errors.email}</p> : null}
          </label>

          <fieldset className='passwords'>
            <legend>Passwords</legend>
            <label className="input__passwords" htmlFor='password-1'> Base:
              <input type='password' name='passwords-1' id='password-1' ref={firstPasRef} placeholder='password' autoComplete='password'/>
              {errors.firstPassword ? <p className='error-message'>{errors.firstPassword}</p> : null}
            </label>
            <label className="input__passwords" htmlFor='password-2'>Confirm:
              <input type='password' name='password-2' id='password-2' ref={secondPasRef} placeholder='confirm password' autoComplete='password'/>
              {errors.secondPassword ? <p className='error-message'>{errors.secondPassword}</p> : null}
            </label>
          </fieldset>

          <fieldset className='gender'>
            <legend>Gender</legend>
            <label className="input__genders" htmlFor='man'>
              <input type='radio' name='gender' id='man' ref={manRef} value={'men'}/>
              Man
            </label>
            <label className="input__genders" htmlFor='woman'>
              <input type='radio' name='gender' id='woman' ref={womanRef} value={'women'}/>
              Woman
            </label>
            {errors.gender ? <p className='error-message'>{errors.gender}</p> : null}
          </fieldset>

          <label className="input__accept" htmlFor='accept'>Accept
            <input type='radio' name='accept' id='accept' ref={acceptRef}/>
            I agree with my self
            {errors.accept ? <p className='error-message'>{errors.accept}</p> : null}
          </label>

          <InputImage imgRef={imgRef} errors={errors}/>
          <InputCountry selectRef={countryRef} errors={errors} />
          <input className="input__submit" type='submit' value={'Submit'} disabled={disableBtn} />
        </form>
      </div>
    </>
  );
};

export default UncontrolledFormPage;
