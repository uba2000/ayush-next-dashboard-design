export function Dots({ ...rest }) {
  return (
    <svg
      {...rest}
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-dots'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <circle cx='5' cy='12' r='1' />
      <circle cx='12' cy='12' r='1' />
      <circle cx='19' cy='12' r='1' />
    </svg>
  )
}