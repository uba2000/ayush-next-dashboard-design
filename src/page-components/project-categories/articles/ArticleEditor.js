import React, { Component } from 'react'
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export class ArticleEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  toolbarObject = {
    options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough'],
      // bold: { icon: bold, className: undefined },
      // italic: { icon: italic, className: undefined },
      // underline: { icon: underline, className: undefined },
      // strikethrough: { icon: strikethrough, className: undefined },
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3'],
    },
  }


  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={this.toolbarObject}
      />
    )
  }
}

export default ArticleEditor