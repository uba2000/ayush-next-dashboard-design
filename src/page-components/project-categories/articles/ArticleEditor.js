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
    // console.log(convertToRaw(editorState.getCurrentContent()
    // ));
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
    options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'image', 'remove', 'history'],
    inline: {
      visible: true,
      inDropdown: false,
      bold: { visible: true, icon: '/svg/editor/bold.svg', },
      italic: { visible: true, icon: '/svg/editor/italic.svg', },
      underline: { visible: true, icon: '/svg/editor/underline.svg', },
      strikethrough: { visible: true, icon: '/svg/editor/strike.svg', },
      monospace: { visible: false, icon: 'xxx.png', }
    },
    list: {
      visible: true,
      inDropdown: false,
      unordered: { visible: true, icon: '/svg/editor/unordered.svg', },
      ordered: { visible: true, icon: '/svg/editor/ordered.svg', },
      indent: { visible: false, icon: 'xxx.png', },
      outdent: { visible: false, icon: 'xxx.png', }
    },
    textAlign: {
      visible: true,
      inDropdown: false,
      left: { visible: true, icon: '/svg/editor/left.svg', },
      center: { visible: true, icon: '/svg/editor/center.svg', },
      right: { visible: true, icon: '/svg/editor/right.svg', },
      justify: { visible: false, icon: 'xxx.png', }
    },
    link: {
      visible: true,
      inDropdown: false,
      addLink: { visible: true, icon: '/svg/editor/link.svg', },
      removeLink: { visible: true, icon: '/svg/editor/link.svg', },
    },
    image: {
      visible: true,
      icon: '/svg/editor/image.svg',
      fileUpload: true,
      url: true,
    },
    history: {
      visible: true,
      inDropdown: false,
      undo: { visible: true, icon: '/svg/editor/undo.svg', },
      redo: { visible: true, icon: '/svg/editor/redo.svg', },
    },
    blockType: {
      inDropdown: false,
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