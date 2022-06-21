import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { logout, useLogin } from "../../utils/auth.utils";
import { Link } from "react-router-dom";
import Button from "../../components/forms/button.component";
import { setListing, useListing } from "../../utils/movie.utils";


const ListScreen = () => {
  const history = useHistory();
  const { isLogin } = useLogin();
  const { movies } = useListing();

  useEffect(() => {
    setListing();
  }, [])

  const disconnect = () => {
    logout();
    history.push("/");
  };

  if (!isLogin) return <Redirect to="/" />;

  return (
    <>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Movies</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the movies
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to={'/movies/create'}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add movie
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Year Released
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      IMDB
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Language
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {movies.map((movie) => (
                    <tr key={movie.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movie.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{movie.yearReleased}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{movie.imdb ?? 'N/A'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{movie.language ?? 'N/A'}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={`/movies/${movie.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {movie.name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-sm mx-auto mt-10">
        <Button text="Logout" color="primary" onClick={disconnect} />
      </div>
    </>
  );
};

export default ListScreen;
