import React from 'react';

export default React.forwardRef(
  ({ children, className, type, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={`${className} ${
        type
          ? type == 'black'
            ? 'dark:bg-black bg-white dark:text-white text-black border-ash dark:border-darkMode-border'
            : ''
          : 'dark:bg-darkMode-bg bg-white dark:text-white text-black border-ash dark:border-darkMode-border'
      } border border-solid`}
    >
      {children}
    </div>
  )
);
