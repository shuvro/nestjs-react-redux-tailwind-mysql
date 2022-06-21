import React from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";

import Button from "../../components/forms/button.component";
import TextInput from "../../components/forms/text.input";
import { validateEmail } from "../../utils/regex.util";
import { signin } from "../../services/auth.service";
import { login, useLogin } from "../../utils/auth.utils";
import { setListing } from "../../utils/movie.utils";


const SigninScreen = () => {
  const history = useHistory();
  const { isLogin } = useLogin();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    if (!validateEmail(email)) {
      setErrorMsg("Credentials incorrect");
      return;
    }

    setLoading(true);
    const res = await signin(email, password);
    setLoading(false);

    if (res.statusCode === 200) {
      await login(res.data.token);
      await setListing();
      history.push("/movies");
    } else {
      setErrorMsg("Credentials incorrect");
    }
  };

  if (isLogin) return <Redirect to="/movies" />;

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <TextInput
                  placeholder="Email"
                  onChange={text => setEmail(text)}
                  required={true}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <TextInput
                  placeholder="Password"
                  onChange={text => setPassword(text)}
                  errorMsg={errorMsg}
                  required={true}
                  password={true}
                />
              </div>

              <div>
                <Button loading={loading} text="Sign In" color="primary" onClick={submit} />
              </div>
            </div>
            {errorMsg && <div className="mt-6 text-center"><span className="bg-red-500">{errorMsg}</span></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninScreen;
