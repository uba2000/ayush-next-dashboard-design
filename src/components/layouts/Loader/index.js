import React from 'react'

export const Loader = React.forwardRef(
  ({ className, ...rest }, ref) => (
    <div
      className={`spinning-loader w-9 h-9 mx-auto ${className ? className : ''}`}
      role="status"
      {...rest}
      ref={ref}
    ></div>
  )
)

Loader.displayName = 'Loader';