import React, { Component, PropTypes } from 'react'
import dynamic from "next/dynamic"

import { PencilWhite, Pencil, Wordpress, Docs } from '../../../ui/icons'
import styles from '../../../styles/Account.module.css'
import Refresh from '../../Refresh'

export class GeneratorMainBody extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: 'What Is E-Commerce SEO?',
      checked: false,
      showEditor: false,
      showEditTitle: false,
    }
  }

  showEditorHandler = () => {
    this.setState((prevState) => {
      return {
        showEditor: !prevState.showEditor
      }
    })
  }

  editTitleHandler = () => {
    this.setState((prevState) => {
      return {
        showEditTitle: !prevState.showEditTitle
      }
    })
  }

  checkedHandler = () => {
    this.setState((prevState) => {
      return {
        checked: !prevState.checked
      }
    })
  }

  render() {
    const ArticleEditor = dynamic(
      () => {
        return import('./ArticleEditor')
      },
      { ssr: false }
    )

    const articleContent = `
      I’ve always been way too interested in music theory. I was one of those students who wouldn’t accept a new musical concept or idea unless I knew exactly how it worked. This meant I got really good at music theory, and when I ended up studying music at university, I found the theory papers easy. I’d do a class test in 20 minutes knowing I’d aced it, and leave my classmates for another hour, drawing piano keyboards and charts on their test paper, struggling to finish in time. The advantage I had was that I could do it all in my head. I didn’t have to work out the answers to the questions by using a chart or drawing a piano keyboard on the page. I’d been doing music for over 10 years, and during that time I’d become familiar with the language to the point where I didn’t have to think about it. Aside from passing tests at uni.
    `;

    return (
      <div className="generator-box bg-white">
        <header className='generator-box-header-box flex justify-between py-[13px] px-[25px]'>
          {!this.state.showEditTitle ? (<><p className="generator-main-title relative text-base leading-7 font-poppins font-bold capitalize flex h-[27.99px]">
            {/* <span className='text-primary mr-1'>H1:</span> */}
            <span className='flex-grow flex-shrink line-clamp-1 main-title' data-heading-t={this.props.headingT ? `${this.props.headingT}:` : 'H1:'}>{this.state.title}{' '}</span>
            <span onClick={this.editTitleHandler} className='cursor-pointer block absolute -top-2 right-[-24px]'>
              <Pencil />
            </span>
          </p>
            <p className='whitespace-nowrap'>
              <span>{articleContent.split(' ').length}</span> words
            </p></>) : (
            <>
              {/*  */}
              <p className="items-center relative text-base leading-7 font-poppins font-bold capitalize flex flex-grow flex-shrink">
                <span className='text-primary mr-1'>H1:</span>
                <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} className={styles.formGroupInput} style={{ maxWidth: '384px', width: '100%', height: '35px' }} />
              </p>
              <div className="">
                <button className="btn btn-reset py-[9px] px-[20px]">Reset</button>
                <button className="btn btn-primary py-[9px] px-[20px]" onClick={this.editTitleHandler}>Save</button>
              </div>
            </>
          )}
        </header>
        <div className="generator-body-section py-[15px] px-[25px]">
          {!this.state.showEditor ? (<p className="content line-clamp-6 block text-base leading-8 font-poppins">
            {articleContent}
          </p>) : (
            <ArticleEditor content={articleContent} />
          )}
        </div>
        <footer className='border-t border-solid border-[#dcd8e7] py-[18.5px] px-[25px]'>
          <div className="flex space-x-[10px] justify-end">
            {!this.state.showEditor ? (<><button onClick={this.showEditorHandler} className='justify-center items-center cursor-pointer flex bg-primary border border-[#DCD8E7] border-solid btn py-2 px-[13px]'>
              <span className='mr-[9px]'>
                <PencilWhite />
              </span>
              <span className='text-white text-[12px] leading-[120%] font-semibold font-poppins'>
                Edit
              </span>
            </button>
              <button className='justify-center items-center cursor-pointer flex bg-white border border-[#DCD8E7] border-solid btn py-2 px-[13px]'>
                <span className='mr-[9px]'>
                  <Refresh className="w-[22px] h-[15px]" />
                </span>
                <span className='text-[12px] leading-[120%] font-semibold font-poppins'>
                  Refresh
                </span>
              </button></>) : (
              <>
                <button className="btn btn-reset py-[9px] px-[20px]">Reset</button>
                <button className="btn btn-primary py-[9px] px-[20px]" onClick={this.showEditorHandler}>Save</button>
              </>
            )}
          </div>
        </footer>
      </div>
    )
  }
}

export default GeneratorMainBody