import React from 'react'
import tw from "tailwind-styled-components"

const Input = ({ type, ...rest }) => {
  return (
    <StyledInput {...rest} type={`${type ? type : 'text'}`} />
  )
}

const StyledInput = tw.input`
  flex-grow 
  flex-shrink 
  border 
  border-solid
  dark:focus:text-white
  focus:text-black
  dark:border-darkMode-border 
  border-ash 
  pl-6 
  py-3 
  rounded-none 
  dark:bg-black 
  h-[40px] 
  bg-white
`;

export default Input