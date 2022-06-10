import React from 'react';

const EditorContainer = ({ children }) => {
  return (
    <div className="generator-container nb">
      <div className="content">{children}</div>
    </div>
  );
};

export default EditorContainer;
