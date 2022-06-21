import React from 'react';

type ButtonProps = {
    text: string;
    color?: "primary" | "secondary" | "light" | "transparent";
    style?: Object;
    onClick?: () => void;
    loading?: boolean;
};

const Button = (props: ButtonProps) => {
    return (
      <button
        onClick={props.onClick}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {props.text}
      </button>
    )
}

export default Button;
