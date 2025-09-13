import * as Yup from "yup"
export const registerSchema = () =>
  Yup.object({
    fullName: Yup.string().required("user name is required!").min(5),
    email: Yup.string().email("email-invalid").required("email-required"),
    password: Yup.string().min(6,"password-invalid").required("password-required"),
  })

export const loginSchema = () =>
  Yup.object({
    email: Yup.string().email("email-invalid").required("email-required"),
    password: Yup.string().min(6, "password-invalid").required("password-required"),
  })
