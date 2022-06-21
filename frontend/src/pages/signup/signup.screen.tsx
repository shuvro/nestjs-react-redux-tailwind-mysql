import React from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";

import Button from "../../components/forms/button.component";
import TextInput from "../../components/forms/text.input";
import { validateEmail } from "../../utils/regex.util";
import { signin, signup } from "../../services/auth.service";
import { login, useLogin } from "../../utils/auth.utils";


const SignupScreen = () => {
  const history = useHistory();
  const { isLogin } = useLogin();
  const [email, setEmail] = React.useState("");
  const [pseudo, setPseudo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [, setLoading] = React.useState(false);

  const submit = async () => {
    setErrorMsg("");
    if (!email || !password || !pseudo || !passwordConfirmation) {
      setErrorMsg("All fields are mandatory");
      return;
    }
    if (password !== passwordConfirmation) {
      setErrorMsg("Passwords are not the same");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg("Email invalid");
      return;
    }

    setLoading(true);
    const res = await signup({
      email,
      password,
      pseudo
    });
    if (res.statusCode === 200) {
      if (res.data.success) {
        const res = await signin(email, password);
        if (res.data.token) {
          login(res.data.token);
          history.push("/movies");
        }
      } else {
        setErrorMsg("Email already use");
      }
    }
    setLoading(false);
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
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
                  onChange={text => setEmail(text)}
                  placeholder="Email"
                  required={true}
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <TextInput
                  onChange={text => setPseudo(text)}
                  placeholder={"Name"}
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
                  required={true}
                  password={true}
                />
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Password confirmation
                </label>
                <TextInput
                  onChange={text => setPasswordConfirmation(text)}
                  placeholder={"Password confirmation"}
                  required={true}
                  password={true}
                />
              </div>

              <div>
                <Button text="Sign Up" color="primary" onClick={submit} />
              </div>
            </div>
            {errorMsg && <div className="mt-6 text-center"><span className="text-red-700">{errorMsg}</span></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupScreen;
