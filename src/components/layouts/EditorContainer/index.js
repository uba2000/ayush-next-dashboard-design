import React from 'react';

export const EditorContainer = React.forwardRef(
  ({ children, ...rest }, ref) => (
    <div className="generator-container nb" ref={ref} {...rest}>
      <div className="content">{children}</div>
    </div>
  )
);

EditorContainer.displayName = 'EditorContainer';
