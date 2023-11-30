import { object, string, boolean, ref} from 'yup';

const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

export const userSchema = object({
  name: string()
        .matches(/^[A-Z][a-zA-Z]*$/, 'Name should start with an uppercase letter')
        .required('Name is required'),
  age: string().matches(/^[0-9]+$/).required('Age is required'),
  email: string().email('Use the correct email').required('Email is required'),
  firstPassword: string()
                .required('Password is required')
                .matches(passwordRegex, 'The password must contain at least 1 digit, 1 uppercase letter, 1 lowercase letter, 1 special character, at least 8 characters')
                .oneOf([ref('secondPassword')], 'Passwords must match'),
  secondPassword: string()
                .required('Please confirm your password')
                .oneOf([ref('firstPassword')], 'Passwords must match'),
  gender: string().required('Gender is required').oneOf(['man', 'woman'], 'Choose a gender'),
  accept: boolean().required().oneOf([true], 'Choose a accept'),
  country: string().required().oneOf(['latvia', 'georgia', 'canada'], 'Choose a country'),
});