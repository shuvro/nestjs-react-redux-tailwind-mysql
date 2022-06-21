import React from 'react';

type TextInputProps = {
    onChange?: (text: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    password?: boolean;
    number?: boolean
    value?: string | number;
    style?: Object;
    errorMsg?: string;
    successMsg?: string;
    required?: boolean
}

const TextInput = (props: TextInputProps) => {
    return (
      <div className="mt-1">
          <input
            type={props.password ? "password" : props.number ? "number": ""}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            required={props.required}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
      </div>
    )
}

export default TextInput;
