import { object, string, number, date, boolean, ref } from 'yup';

const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

export const userSchema = object({
  name: string()
        .matches(/^[A-Z][a-zA-Z]*$/, 'Name should start with an uppercase letter')
        .required('Name is required'),
  age: string().matches(/^[0-9]+$/).required(),
  email: string().email().required(),
  firstPassword: string()
                .required('Password is required')
                .matches(passwordRegex)
                .oneOf([ref('secondPassword')], 'Passwords must match'),
  secondPassword: string()
                .required('Please confirm your password')
                .oneOf([ref('firstPassword')], 'Passwords must match'),
  gender: boolean(),
  accept: boolean(),
  country: string(),
});