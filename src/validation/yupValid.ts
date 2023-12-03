import { object, string, boolean, ref, mixed, } from 'yup';

const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
const countriesList = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Italy',
  'Brazil',
  'Spain',
  'China',
  'India',
  'Russia',
  'South Korea',
  'Netherlands',
  'Mexico',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark'
]

export const uncontrolledFormSchema = object({
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
  accept: boolean().required('Accept is required').oneOf([true], 'Choose a accept'),
  country: string().required('Country is required').oneOf(countriesList, 'Choose a country'),
  img: string().required(),
});


export const controlledFormSchema = object({
  name: string()
        .matches(/^[A-Z][a-zA-Z]*$/, 'Name should start with an uppercase letter')
        .required('Name is required'),
  age: string().matches(/^[0-9]+$/, "Only the numbers").required('Age is required'),
  email: string().email('Use the correct email').required('Email is required'),
  firstPassword: string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'The password must contain at least 1 digit, 1 uppercase letter, 1 lowercase letter, 1 special character, at least 8 characters'
    ),
  secondPassword: string()
    .required('Please confirm your password')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.firstPassword === value;
    }),
  gender: string().required('Gender is required').oneOf(['on'], 'Choose a gender'),
  accept: string().required('Accept is required').oneOf(['on'], 'Choose a accept'),
  country: string().required('Country is required'),
  img: mixed()
    .required('Image is required')
    .test('fileCount', 'Only one image', (value) => value instanceof FileList && value.length === 1),
});