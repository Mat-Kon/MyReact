import React, { ChangeEvent, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IControlledFormData } from '../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { controlledFormSchema } from '../../validation/yupValid';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHoks';
import { setForm } from '../../redux/slices/formsSlice';
import { setImg } from '../../redux/slices/imgsSlice';


const ControlledFormPage: React.FC = () => {
  const countriesList = useAppSelector((store) => store.countries.countries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } =
    useForm<IControlledFormData>({
      mode: 'onChange',
      resolver: yupResolver(controlledFormSchema),
  });
  const [country, setCountry] = useState('');
  const [curCountries, setCurCountries] = useState<string[]>([]);

  const onSubmit: SubmitHandler<IControlledFormData> = (data) => {
    const sendData = { ...data };
    const files = sendData.img as FileList;
    const imgFile = files[0];

    if (imgFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = () => {
        const base64Image = reader.result as string;
        dispatch(setImg(base64Image));
      };
    }
    console.log()

    if (data.img && (data.img as FileList)[0] && (data.img as FileList)[0].name) {
      sendData.img = (data.img as FileList)[0].name;
    }

    dispatch(setForm(sendData));
    navigate('/');
  };

  const error: SubmitErrorHandler<IControlledFormData> = (data) => console.log(data);

  const handlerInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value.toLocaleLowerCase());
    const curValue = event.target.value.toLocaleLowerCase();
    const curCountries = countriesList.filter(country => country.slice(0, curValue.length).toLowerCase().includes(curValue)) ?? null;
    if (curValue.length) {
      setCurCountries(curCountries);
    } else {
      setCurCountries([]);
    }
  };

  const handlerRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
    setCurCountries([]);
  };

  return (
    <>
      <h1>Controlled form</h1>
      <Link to={'/'} className='back-btn'>Back</Link>
      <div className='form-container'>
        <form className='controlled' onSubmit={handleSubmit(onSubmit, error)}>
          <label htmlFor='name'> Name:
            <input type='text' id={'name'} {...register('name', { required: true })}/>
            {errors.name ? <p className='error-message'>{errors.name.message}</p> : null}
          </label>

          <label htmlFor='age'>Age:
            <input type='text' id='age' {...register('age')}/>
            {errors.age ? <p className='error-message'>{errors.age.message}</p> : null}
          </label>

          <label htmlFor='email'>Email:
            <input type='text' id='email' {...register('email')}/>
            {errors.email ? <p className='error-message'>{errors.email.message}</p> : null}
          </label>

          <fieldset className='passwords'>
            <legend>Passwords</legend>
            <label htmlFor='password-1'> Base:
              <input type='password' id='password-1' {...register('firstPassword')}/>
              {errors.firstPassword ? <p className='error-message'>{errors.firstPassword.message}</p> : null}
            </label>
            <label htmlFor='password-2'>Confirm:
              <input type='password' id='password-2' {...register('secondPassword')}/>
              {errors.secondPassword ? <p className='error-message'>{errors.secondPassword.message}</p> : null}
            </label>
          </fieldset>

          <fieldset className='gender'>
            <legend>Gender</legend>
            <label htmlFor='man'>
              <input type='radio' id='man' {...register('gender')}/>
              Man
            </label>
            <label htmlFor='woman'>
              <input type='radio' id='woman' {...register('gender')}/>
              Woman
            </label>
            {errors.gender ? <p className='error-message'>{errors.gender.message}</p> : null}
          </fieldset>

          <label className="accept" htmlFor='accept'>Accept
            <input type='radio' id='accept' {...register('accept')}/>
            I agree with my self
            {errors.accept ? <p className='error-message'>{errors.accept.message}</p> : null}
          </label>

          <label htmlFor='file'>Choose a picture
            <input type="file" accept=".png,.jpeg" id='file' {...register('img')}/>
            {errors.img ? <p className='error-message'>{errors.img.message}</p> : null}
          </label>

          <div className='country-container'>
            <label className="input__country" htmlFor="country">
              <input type="text" id="inputValue" value={country} {...register('country')} onChange={handlerInput} placeholder='start typing'/>
              <ul className='country-list'>
                {curCountries.length ? (curCountries.map((country) => (
                  <li key={country} value={country.toLocaleLowerCase()}>
                    <label className='country-item' htmlFor={country.toLocaleLowerCase()}>
                      <input type='radio' id={country.toLocaleLowerCase()} value={country} onChange={handlerRadio}/>
                      {country}
                    </label>
                  </li>
                ))) : null}
              </ul>
            </label>
            {errors.country ? <p className='error-message'>{errors.country.message}</p> : null}
          </div>
          <input className="input__submit" type='submit' value={'Submit'} disabled={!isValid}/>
        </form>
      </div>
    </>
  );
};

export default ControlledFormPage;
