import { InferType } from "yup";
import { controlledFormSchema } from "../validation/yupValid";

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

export interface IUncontrolledFormData {
  name: string,
  age: string,
  email: string,
  firstPassword: string,
  secondPassword: string,
  gender: string,
  accept: boolean,
  country: string,
  img: string,
}


export type IControlledFormData = InferType<typeof controlledFormSchema>