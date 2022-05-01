import React, { Component } from 'react'
import { EditorState } from "draft-js";
import dynamic from 'next/dynamic';
// import apiClient from '../api/api_client'
import { convertFromRaw, convertToRaw } from 'draft-js';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import articleContent from '../../../_mock/article-content';

export default class ArticleEditor extends Component {
  constructor(props) {
    super(props);

    const DBEditorState = convertFromRaw(JSON.parse(this.props.content))

    this.state = {
      editorState: EditorState.createWithContent(
        DBEditorState
      )
      // editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(convertToRaw(editorState.getCurrentContent()
    ));
    this.props.handleContent(
      JSON.stringify(convertToRaw(editorState.getCurrentContent())
      ));
  };

  uploadImageCallBack = async (file) => {
    // const imgData = await apiClient.uploadInlineImageForArticle(file);
    // return Promise.resolve({
    //   data: {
    //     link: `${process.env.NEXT_PUBLIC_API_URL}${imgData[0].formats.small.url}`
    //   }
    // });
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
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={this.onEditorStateChange}
        // toolbarOnFocus
        toolbar={this.toolbarObject}
      />
    )
  }
}