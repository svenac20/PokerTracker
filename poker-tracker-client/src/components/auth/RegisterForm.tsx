import { Formik } from "formik";
import { FC } from "react";
import { Link } from "react-router";
import * as Yup from "yup";

const RegisterForm: FC<{
  sumbitHandler: (values: {
    email: string;
    password: string;
    username: string;
  }) => {};
}> = ({ sumbitHandler }) => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={async (values) => {
        await sumbitHandler(values);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email must be a valid email")
          .required("Email is required"),
        username: Yup.string().required("Username is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleSubmit,
          handleChange,
        } = props;
        return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className=" block font-bold">
                Username:
              </label>
              <input
                id="username"
                placeholder="Enter your username"
                type="text"
                value={values.username}
                onChange={handleChange}
                className="p-2 rounded-lg border-gray-500 border-2 w-full"
              />
              {errors.username && touched.username && (
                <div className="text-red-400 text-sm font-bold">
                  {errors.username}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="rounded-lg  block font-bold">
                Email:
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                className=" p-2 border-gray-500 border-2 rounded-lg w-full"
              />
              {errors.email && touched.email && (
                <div className="text-sm text-red-400 font-bold">
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="rounded-lg  block font-bold">
                Password:
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="p-2 border-gray-500 border-2 rounded-lg w-full"
              />
              {errors.password && touched.password && (
                <div className="text-sm font-bold text-red-400">
                  {errors.password}
                </div>
              )}
            </div>

            <div>
              Already have an account? Click <Link to="/login" className="underline font-bold">here</Link>{" "} to login.
            </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className="border-2 border-gray-500 rounded-lg p-4"
            >
              Submit
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
