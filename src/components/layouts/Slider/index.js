import React from 'react'
import ReactSlider from 'react-slider'
import tw from 'tailwind-styled-components'

const StyledSlider = tw(ReactSlider)`
  w-full
  h-2
`

const StyledThumb = tw.div`
  h-6
  w-6
  bg-white
  ring-1
  ring-black
  rounded-full
  cursor-grab
  -top-[9px]
`

const StyledTrack = tw.div`
  ${props => (props.index === 1 ? 'bg-[#C4C4C4]' : 'bg-primary')}
  top-0
  bottom-0
  rounded-none
`

const Thumb = (props) => <StyledThumb {...props} />

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const Slider = ({ setSliderValue, defaultValue }) => {
  return (
    <StyledSlider
      renderThumb={Thumb}
      renderTrack={Track}
      onAfterChange={setSliderValue}
      defaultValue={[defaultValue]}
    />
  )
}

export { Slider }