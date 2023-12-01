export interface IErrors {
  name?: string,
  age?: string,
  email?: string,
  firstPassword?: string,
  secondPassword?: string,
  gender?: string,
  accept?: string,
  country?: string,
  img?: string,
}

export interface IFormData {
  name: string,
  age: string,
  email: string,
  firstPassword: string,
  secondPassword: string,
  gender: string,
  accept: boolean,
  country: string,
  img?: string,
}
