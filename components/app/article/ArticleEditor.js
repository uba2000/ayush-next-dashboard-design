import React, { useState } from 'react'
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function ArticleEditor({ articleContent, setEditorState }) {

  const [editorState, setEditorsState] = useState(articleContent)

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={setEditorState}
    />
  )
}

export default ArticleEditor