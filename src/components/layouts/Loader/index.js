import React from 'react';

export const Loader = React.forwardRef(
  ({ className, w = '36px', h = '36px', ...rest }, ref) => (
    <div
      className={`spinning-loader mx-auto ${className ? className : ''}`}
      style={{
        width: w,
        height: h,
      }}
      role="status"
      {...rest}
      ref={ref}
    ></div>
  )
);

Loader.displayName = 'Loader';
