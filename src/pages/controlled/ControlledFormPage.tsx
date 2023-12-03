import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IControlledFormData } from '../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { controlledFormSchema } from '../../validation/yupValid';
import { useAppDispatch } from '../../hooks/reduxHoks';
import { setForm } from '../../redux/slices/formsSlice';
import { setImg } from '../../redux/slices/imgsSlice';


const ControlledFormPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } =
    useForm<IControlledFormData>({
      mode: 'onChange',
      resolver: yupResolver(controlledFormSchema),
  });

  const onSubmit: SubmitHandler<IControlledFormData> = (data) => {
    const sendData = { ...data };
    const files = sendData.img as FileList;
    const imgFile = files[0];

    if (imgFile) {
      console.log(imgFile.type)
      // if (imgFile.type !== 'image/png' && selectedFile.type !== 'image/jpeg') {
      //   setErrMessage('Only .png and .jpeg formats are allowed');
      // }
      // if (imgFile.size > maxSizeInBytes) {
      //   setValid(false);
      //   setErrMessage('Maximum of 5 MB');
      // }
      // setValid(true);

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

          <label htmlFor="countrySelect">Выберите страну:
            <input type="text" {...register('country')}/>
            {errors.country ? <p className='error-message'>{errors.country.message}</p> : null}
          </label>
          <input className="input__submit" type='submit' value={'Submit'} disabled={!isValid}/>
        </form>
      </div>
    </>
  );
};

export default ControlledFormPage;
