import React, { Component } from 'react'
import dynamic from "next/dynamic"

import Refresh from '../../../Refresh'
import { Pencil } from '../../../../ui/icons'

export class GeneratorMain extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showEditor: false,
    }
  }

  showEditorHandler = () => {
    this.setState((prevState) => {
      return {
        showEditor: !prevState.showEditor
      }
    })
  }

  render() {
    const ArticleEditor = dynamic(
      () => {
        return import('../ArticleEditor')
      },
      { ssr: false }
    )
    return (
      <div className="generator-container md:px-8 px-4 mb-5 generator-main" style={{ padding: '30px 32px' }}>
        <div className="relative">
          <div className="mb-4 flex justify-between">
            <div className='mr-4 md:mr-0'>
              <h2 className="md:text-3xl text-xl leading-9 font-bold capitalize text-black">
                What is SEO and how it works?
              </h2>
            </div>
            <div className='flex items-center'>
              <div className="mr-3">
                <Refresh isPrimary={true} />
              </div>
              <div className="cursor-pointer" onClick={this.showEditorHandler}>
                <Pencil />
              </div>
            </div>
          </div>
          <div className="generator-container nb" >
            <div className="content">
              {!this.state.showEditor ? (<>{this.articleContent}</>) : (
                <ArticleEditor />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  articleContent = `
    I’ve always been way too interested in music theory. I was one of those students who wouldn’t accept a new musical concept or idea unless I knew exactly how it worked. This meant I got really good at music theory, and when I ended up studying music at university, I found the theory papers easy. I’d do a class test in 20 minutes knowing I’d aced it, and leave my classmates for another hour, drawing piano keyboards and charts on their test paper, struggling to finish in time. The advantage I had was that I could do it all in my head. I didn’t have to work out the answers to the questions by using a chart or drawing a piano keyboard on the page. I’d been doing music for over 10 years, and during that time I’d become familiar with the language to the point where I didn’t have to think about it. Aside from passing tests at uni.
  `;
}

export default GeneratorMain