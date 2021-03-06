import React from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const Outer = tw.input`
  flex-grow 
  placeholder:text-darkMode-border
  flex-shrink
  border-none
  pl-6 py-3
  rounded-none
  h-[40px]
  outline-none
`;

export const Input = React.forwardRef(
  (
    {
      className = '',
      type = 'text',
      placeholder = '',
      value = '',
      variant = 'normal',
      onChange = () => {},
      returnEvent = false,
      ...rest
    },
    ref
  ) => {
    return (
      <Outer
        ref={ref}
        type={type}
        placeholder={placeholder}
        {...rest}
        value={value}
        onChange={(e) => {
          returnEvent ? onChange(e) : onChange(e.target.value);
        }}
        className={`
          ${
            variant == 'normal'
              ? 'dark:bg-darkMode-bg bg-white'
              : variant == 'dark'
              ? `dark:bg-black bg-white 
                dark:border-darkMode-border 
                border-ash h-[40px]
                border border-solid`
              : variant == 'dark-small'
              ? `dark:bg-black bg-white 
                dark:border-darkMode-border 
                border-ash
                border border-solid`
              : variant == 'auth'
              ? `font-poppins px-5 py-3 text-base border
                border-white border-solid rounded-md focus:outline-none 
                dark:bg-black bg-black focus:border-green-600 h-auto`
              : variant == 'dark-nb'
              ? `dark:bg-black bg-white`
              : ''
          }
          ${className} 
        `}
      />
    );
  }
);

Input.displayName = 'Input';
