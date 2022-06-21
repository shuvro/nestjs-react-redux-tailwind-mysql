import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";

import Button from "../../components/forms/button.component";
import TextInput from "../../components/forms/text.input";
import { useLogin } from "../../utils/auth.utils";
import { getMovieById, updateMovie } from "../../services/movie.service";


const EditScreen = () => {
  const history = useHistory();
  const { isLogin } = useLogin();
  const [name, setName] = React.useState("");
  const [yearReleased, setYearReleased] = React.useState<number>();
  const [imdb, setImdb] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [, setLoading] = React.useState(false);
  const {id} = useParams()

  const getMovie = async () => {
    const {data} = await getMovieById(id);
    if (data) {
      setName(data?.name)
      setYearReleased(data?.yearReleased)
      setImdb(data?.imdb)
      setLanguage(data?.language)
    }
  }

  useEffect(() => {
    getMovie();
  }, [id])


  const submit = async () => {
    setErrorMsg("");
    if (!name || !yearReleased) {
      setErrorMsg("Name and Year Release field is mandatory");
      return;
    }

    setLoading(true);
    const res = await updateMovie(id, {
      name,
      yearReleased,
      imdb,
      language
    });
    if (res.data) {
      history.push('/movies')
    }
  };

  if (!isLogin) return <Redirect to="/" />;

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Update Movie</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/movies" className="font-medium text-indigo-600 hover:text-indigo-500">
              Go back to listing
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <TextInput
                  onChange={text => setName(text)}
                  value={name}
                  placeholder="Name"
                  required={true}
                />
              </div>

              <div>
                <label htmlFor="year_released" className="block text-sm font-medium text-gray-700">
                  Year Released *
                </label>
                <TextInput
                  onChange={text => setYearReleased(Number(text))}
                  value={yearReleased}
                  placeholder={"Year released"}
                  required={true}
                  number={true}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  IMDB URL
                </label>
                <TextInput
                  placeholder="Valid IMDB Url"
                  onChange={text => setImdb(text)}
                  value={imdb}
                  required={true}
                />
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Password confirmation
                </label>
                <TextInput
                  onChange={text => setLanguage(text)}
                  placeholder={"Language"}
                  value={language}
                  required={true}
                />
              </div>

              <div>
                <Button text="Submit" color="primary" onClick={submit} />
              </div>
            </div>
            {errorMsg && <div className="mt-6 text-center"><span className="text-red-700">{errorMsg}</span></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditScreen;
