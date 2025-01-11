import { getErrorMessage } from "@/lib/utils";
import { FirebaseError } from "firebase/app";
import { Formik } from "formik";
import { FC } from "react";
import { Link } from "react-router";

const LoginForm: FC<{
  sumbitHandler: (values: { email: string; password: string }) => {};
  error: FirebaseError | null;
}> = ({ sumbitHandler, error }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        await sumbitHandler(values);
      }}
    >
      {(props) => {
        const { values, isSubmitting, handleChange, handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            </div>

            <div>
              Dont have an account? Click{" "}
              <Link to="/register" className="underline font-bold">
                here
              </Link>{" "}
              to register.
            </div>

            {error && (
              <div className="bg-red-500 text-white p-2 rounded-lg">
                {getErrorMessage(error)}
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="border-2 border-gray-500 rounded-lg p-4 w-full"
              >
                Submit
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
