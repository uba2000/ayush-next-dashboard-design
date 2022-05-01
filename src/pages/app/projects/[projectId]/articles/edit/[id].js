import React, { Component } from 'react'
import dynamic from "next/dynamic"
import { withRouter } from 'next/router'

import ArticleLayout from '../../../../../../page-components/project-categories/ArticleLayout'
import DashboardLayout from '../../../../../../components/app/DasboardLayout'
import styles from '../../../../../../styles/Article.module.css'
import accountStyles from '../../../../../../styles/Account.module.css'
import { AppContext } from '../../../../../../context/state'
import Box from '../../../../../../components/layouts/Box'

class EditArticle extends Component {

  static contextType = AppContext

  constructor(props) {
    super(props)

    this.state = {
      titleChange: false,
      tagsChange: false,
      title: 'How do you make money from scalping?',
      reserveTitle: 'How to start the agency',
      tags: ['money', 'trading'].join(', '),
      reserveTags: ['money', 'trading'].join(', '),
      stateArticleContent: this.articleContent,
      showEditor: false,
      stats: {
        wordCount: 1000,
        plagiarism: 0,
        density: 96,
        fluency: 98
      }
    }
  }


  setStateArticleContent(article) {
    this.setState({
      stateArticleContent: article
    })
  }

  showEditorHandler = () => {
    this.setState((prevState) => {
      return {
        showEditor: !prevState.showEditor
      }
    })
  }

  saveArticle = () => {
    this.showEditorHandler();
  }

  render() {
    const ArticleEditor = dynamic(
      () => {
        return import('../../../../../../page-components/project-categories/articles/ArticleEditor')
      },
      { ssr: false }
    )

    let { titleChange, tagsChange, showEditor } = this.state
    const { layout } = this.context
    const { router } = this.props

    if (layout.toEditArticle) {
      titleChange = true
      tagsChange = true
      showEditor = true
    }

    return (
      <DashboardLayout>
        <ArticleLayout crumbs={[{ txt: 'Article', link: `/app/projects/${router.query.projectId}` }, { txt: this.state.title }]}>
          <div className="mt-16">
            <div className="grid md:grid-cols-[auto_auto] grid-cols-1 gap-4 mb-6">
              <div className="flex flex-col">
                {!titleChange ? (
                  <>
                    <div className="flex mb-2">
                      <div className="mr-2">
                        <h3 className={styles.articleEditHeaderTitle}>
                          {this.state.title}
                        </h3>
                      </div>
                      <div className="cursor-pointer" onClick={() => { this.setState({ titleChange: true }) }}>
                        {/* pencil */}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-pencil ml-2'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          strokeWidth='1'
                          stroke='white'
                          fill='#00A141'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path
                            stroke='none'
                            d='M0 0h24v24H0z'
                            fill='none'
                          ></path>
                          <path d='M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4'></path>
                          <line x1='13.5' y1='6.5' x2='17.5' y2='10.5'></line>
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid md:grid-cols-[auto_auto] grid-cols-1 gap-2 mb-2">
                      <div className="">
                        <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} className={accountStyles.formGroupInput} style={{ minWidth: '273.6px', height: '53px' }} />
                      </div>
                      <div className='flex'>
                        <button className="btn btn-primary" onClick={() => { layout.setToEditArticle(true) }}>
                          Save
                        </button>
                        <button className="btn btn-reset" onClick={() => {
                          this.setState({ title: this.state.reserveTitle, })
                        }}>
                          Reset
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {
                  !tagsChange ? (
                    <>
                      <div className="flex">
                        <div className="mr-2">
                          <h5 className={styles.articleEditHeaderTags}>
                            {this.state.tags}
                          </h5>
                        </div>
                        <div className="cursor-pointer" onClick={() => { this.setState({ tagsChange: true }) }}>
                          {/* pencil */}
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-pencil ml-2'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            strokeWidth='1'
                            stroke='white'
                            fill='#00A141'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path
                              stroke='none'
                              d='M0 0h24v24H0z'
                              fill='none'
                            ></path>
                            <path d='M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4'></path>
                            <line x1='13.5' y1='6.5' x2='17.5' y2='10.5'></line>
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-[auto_auto] grid-cols-1 gap-2 mb-2">
                        <div className="">
                          <input type="text" value={this.state.tags} onChange={(e) => this.setState({ tags: e.target.value })} className={accountStyles.formGroupInput} style={{ minWidth: '273.6px', height: '53px' }} />
                        </div>
                        <div className='flex'>
                          <button className="btn btn-primary" onClick={() => { this.setState({ tagsChange: false }) }}>
                            Save
                          </button>
                          <button className="btn btn-reset" onClick={() => {
                            this.setState({ tags: this.state.reserveTags, })
                          }}>
                            Reset
                          </button>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
              <div className="flex justify-end items-end">
                <span className='text-xs text-right font-medium'>
                  1682 Words
                </span>
              </div>
            </div>
            <Box type="black" className={`generator-container relative ${!showEditor ? 'md:pt-[25px] pt-[70px] md:px-[70px] px-4' : ''}  pb-[25px]`}>
              <div className="content">
                {!showEditor ? (<>{this.articleContent}</>) : (
                  <ArticleEditor />
                )}
              </div>
              {!showEditor && <div className="absolute top-6 right-6 cursor-pointer" onClick={this.showEditorHandler}>
                {/* pencil */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-pencil'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='1'
                  stroke='white'
                  fill='#00A141'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path
                    stroke='none'
                    d='M0 0h24v24H0z'
                    fill='none'
                  ></path>
                  <path d='M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4'></path>
                  <line x1='13.5' y1='6.5' x2='17.5' y2='10.5'></line>
                </svg>
              </div>}
            </Box>
            <div className="md:flex grid grid-cols-1 gap-5 mt-6 md:justify-end">
              {!showEditor && (<>
                <button className="btn btn-primary text-white text-base">
                  Publish to Wordpress
                </button></>)}
            </div>
          </div>
        </ArticleLayout>
      </DashboardLayout>
    )
  }

  articleContent = `
    This means offering your services at a monthly or yearly rate. This way, your client doesn’t have to pay you for hours worked or the number of projects you work on. All they have to do is pay a flat sum to avail your services.

        The easiest way to determine a flat-rate for your services is to analyze client needs and the amount of work you’ll have to put in to get the job done.
        However, this business plan might not work when clients decide to scale up. While you’ll be doing more work, you’ll still be paid the same! To avoid this, always revise contracts before you renew them. You can easily find an agency contract template online to get started.
        Here, you only get paid after your clients make money off of a sale.

        For example, if your SEO agency optimizes a client’s webpage, you can get a portion of the revenue they generate from that page.

        However, this model comes with a few issues:
        It’s not applicable to all services. For example, there’s no way to get a commission for designing a website banner for a client.
        It’s hard to bill your clients without closely keeping track of their sales. For example, if you are a marketing agency, you need to know exactly how much revenue your strategies generated to get an accurate commission.
        C. Hourly Rates
        This business model is perfect for new businesses.
        Here, you bill clients for the time you spent working on their projects at a fixed hourly rate.
        While manually keeping track of the hours you spend on work can be taxing, you can use time trackers to help you out. As they automatically track the hours worked by your staff on each project, billing clients on an hourly basis becomes simple!This means offering your services at a monthly or yearly rate. This way, your client doesn’t have to pay you for hours worked or the number of projects you work on. All they have to do is pay a flat sum to avail your services.

        The easiest way to determine a flat-rate for your services is to analyze client needs and the amount of work you’ll have to put in to get the job done.
        However, this business plan might not work when clients decide to scale up. While you’ll be doing more work, you’ll still be paid the same! To avoid this, always revise contracts before you renew them. You can easily find an agency contract template online to get started.
        Here, you only get paid after your clients make money off of a sale.

        For example, if your SEO agency optimizes a client’s webpage, you can get a portion of the revenue they generate from that page.

        However, this model comes with a few issues:
        It’s not applicable to all services. For example, there’s no way to get a commission for designing a website banner for a client.
        It’s hard to bill your clients without closely keeping track of their sales. For example, if you are a marketing agency, you need to know exactly how much revenue your strategies generated to get an accurate commission.
        C. Hourly Rates
        This business model is perfect for new businesses.
        Here, you bill clients for the time you spent working on their projects at a fixed hourly rate.
        While manually keeping track of the hours you spend on work can be taxing, you can use time trackers to help you out. As they automatically track the hours worked by your staff on each project, billing clients on an hourly basis becomes simple!However,

        his model comes with a few issues:
        It’s not applicable to all services. For example, there’s no way to get a commission for designing a website banner for a client.
        It’s hard to bill your clients without closely keeping track of their sales. For example, if you are a marketing agency, you need to know exactly how much revenue your strategies generated to get an accurate commission.
        C. Hourly Rates
        This business model is perfect for new businesses.
        Here, you bill clients for the time you spent working on theirt heir
  `
}

export default withRouter(EditArticle)