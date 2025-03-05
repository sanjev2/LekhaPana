"use client"

import type React from "react"
import { ErrorMessage, Field, Formik } from "formik"
import { Button } from "primereact/button"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { useRegisterUserMutation } from "../provider/queries/Auth.query"
import { toast } from "sonner"
import { motion } from "framer-motion"

const Register: React.FC = () => {
  const [registerUser, registerUserResponse] = useRegisterUserMutation()
  const navigate = useNavigate()

  type User = {
    name: string
    email: string
    password: string
  }

  const initialValues: User = {
    name: "",
    email: "",
    password: "",
  }

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email must be valid").required("Email is required"),
    password: yup.string().min(5, "Password must be greater than 5 characters").required("Password is required"),
  })

  const OnSubmitHandler = async (e: User, { resetForm }: any) => {
    try {
      const { data, error }: any = await registerUser(e)

      if (error) {
        toast.error(error.data.message)
        return
      }

      console.log(data, error)


      resetForm()
      navigate("/login")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      console.log("hello")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={OnSubmitHandler}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg overflow-hidden">
              <div className="p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-blue-700">Create Account</h2>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Your Name"
                  />
                  <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Email Address"
                  />
                  <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="*****"
                  />
                  <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
                </div>
                <div>
                  <Button
                    type="submit"
                    loading={registerUserResponse.isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out flex justify-center items-center text-center"
                  >
                    {registerUserResponse.isLoading ? "Registering..." : "Register"}
                  </Button>
                </div>
              </div>
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </motion.div>
    </div>
  )
}

export default Register

