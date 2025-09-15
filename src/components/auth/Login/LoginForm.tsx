"use client"
import ButtonForm from "../BodyCodeForAuth/ButtonForm"
import { RootState, AppDispatch } from "@/store/index"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { loginSchema } from "../formikLogic/authValidation"
import { loginInitialValues } from "../formikLogic/formInitialValues"
import Cookies from "js-cookie" 
import FloatingInput from "../BodyCodeForAuth/FloatingInput"
import { loginUser } from "@/features/auth/LoginThunks"
import ForgetPasswordModel from "./ForgetPasswordModel"
const LoginForm = () => {
  const [ModelActive, setModelActive] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { loading, message, error, user } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    if (user?.id) {
        Cookies.set("user_data", JSON.stringify(user), { expires: 1 })
      router.push("/")
    }
  }, [message, router,user])
  const validationSchema = loginSchema()
  const formik = useFormik({
    initialValues:loginInitialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser({ email: values.email, password: values.password }))
    },
  })
 
  return (
    <div className="relative z-10">
    <div className="container flex justify-center gap-5 m-auto py-[180px]">
      <div className="w-full sm:w-[400px] rounded-md shadow mainShadow p-8 ">
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">Sign up with email</h1>
        <form onSubmit={formik.handleSubmit}>
          <FloatingInput
            name="email"
            type="email"
            label={"email"}
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
        <button type={"button"} className="mt-5 cursor-pointer underline hover:bg-activeColor hover:text-white px-2" onClick={()=>setModelActive(true)}>
          forgetPassword
        </button>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {!error && message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {ModelActive && <ForgetPasswordModel model={setModelActive} /> }
      </div>
    </div>
    </div>
  )
}

export default LoginForm
