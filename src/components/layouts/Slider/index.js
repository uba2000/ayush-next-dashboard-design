import React, { useEffect, useRef, useState } from 'react'
import tw from 'tailwind-styled-components'

const StyledInput = tw.input`
  bg-[#C4C4C4] 
  cursor-pointer 
  dark:bg-[#C4C4C4] 
  h-2 
  rounded-none 
  transition-none
  w-full
  outline-none
  z-50
  bg-gradient-to-r from-primary to-primary
  bg-no-repeat
  border-none
`

const Slider = ({ setSliderValue, defaultValue = 1, min = 0, max = 100, steps = 1 }) => {

  const inputSlider = useRef(null)

  const [inputSliderValue, setInputSliderValue] = useState(defaultValue)

  const onInputFunction = (onChange) => {
    let value = inputSlider.current.value
    setInputSliderValue(value)
    inputSlider.current.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
    return onChange(parseInt(value))
  }

  useEffect(() => {
    inputSlider.current.style.backgroundSize = (defaultValue - min) * 100 / (max - min) + '% 100%'
  }, [])

  return (
    <>
      <div class="range">
        <div class="field">
          <StyledInput
            type="range"
            onInput={() => onInputFunction(setSliderValue)}
            min={min}
            max={max}
            value={inputSliderValue}
            steps={steps}
            ref={inputSlider}
          />
        </div>
      </div>
    </>
  )
}

export default Slider