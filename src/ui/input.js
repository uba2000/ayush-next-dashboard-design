import React from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const Outer = tw.input`
  flex-grow 
  placeholder:text-darkMode-subText
  flex-shrink
  border-none
  pl-6 py-3
  rounded-none
  h-[40px]
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
        onChange={(e) => onChange(e.target.value)}
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
              : ''
          }
          ${className} 
        `}
      />
    );
  }
);

Input.displayName = 'Input';
