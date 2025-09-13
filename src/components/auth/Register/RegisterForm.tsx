"use client"
import { registerUser } from "@/features/auth/registerThunks"
import { RootState, AppDispatch } from "@/store/index"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useFormik } from "formik"
import Cookies from "js-cookie" 
import { registerInitialValues } from "../formikLogic/formInitialValues"
import { registerSchema } from "../formikLogic/authValidation"
import ButtonForm from "../BodyCodeForAuth/ButtonForm"
import FloatingInput from "../BodyCodeForAuth/FloatingInput"
const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { loading, message, error } = useSelector((state: RootState) => state.register)

  useEffect(() => {
    if (message) {
      router.push("/Activate")
    }
  }, [message, router])

  const validationSchema = registerSchema()

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema,
    onSubmit: (values) => {
      Cookies.set("Register_email", values.email , { expires: 1 }) 
      dispatch(registerUser({ email: values.email, password: values.password, username: values.fullName }))
    },
  })

  return (
    <div className="">
    <div className="container flex justify-center gap-5 m-auto py-[180px]">
      <div className="w-full sm:w-[400px] rounded-md shadow mainShadow p-8">
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">Sign up with email</h1>
        <form onSubmit={formik.handleSubmit}>
          <FloatingInput
            name="fullName"
            type="text"
            label={"Full name"}
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ""}
          />
          <FloatingInput
            name="email"
            type="email"
            label={"Email"}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
          />
          <FloatingInput
            name="password"
            type="password"
            label={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
          />
          <ButtonForm loading={loading} />
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {!error && message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
    </div>
  )
}

export default RegisterForm
