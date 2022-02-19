import React, { Component } from 'react'
import dynamic from "next/dynamic"

import ArticleLayout from '../../../../../../components/app/article/ArticleLayout'
import DashboardLayout from '../../../../../../components/app/DasboardLayout'
import styles from '../../../../../../styles/Article.module.css'
import accountStyles from '../../../../../../styles/Account.module.css'
// import ArticleEditor from '../../../../components/app/article/ArticleEditor'

export class EditArticle extends Component {

  constructor(props) {
    super(props)

    this.state = {
      titleChange: false,
      tagsChange: false,
      title: 'How to start the agency',
      reserveTitle: 'How to start the agency',
      tags: ['Graphic design', 'digital marketing'].join(', '),
      reserveTags: ['Graphic design', 'digital marketing'].join(', '),
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

  render() {
    const ArticleEditor = dynamic(
      () => {
        return import('../../../../components/app/article/ArticleEditor')
      },
      { ssr: false }
    )
    const { stats } = this.state
    return (
      <DashboardLayout>
        <div className="-mt-11">
          <ArticleLayout crumbs={[' How to start the agency']}>
            <div className="mt-16">
              <div className="grid md:grid-cols-[auto_auto] grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  {!this.state.titleChange ? (
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
                          <button className="btn btn-primary" onClick={() => { this.setState({ titleChange: false }) }}>
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
                    !this.state.tagsChange ? (
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
                <div className="flex justify-end">
                  <div className="flex flex-col mr-7 justify-center">
                    <p className={styles.articleHeaderOverscore}>
                      Word Count
                    </p>
                    <p className={styles.articleHeaderOverscoreStats}>
                      {stats.wordCount} Words
                    </p>
                  </div>
                  <div className="flex flex-col mr-7 justify-center">
                    <p className={styles.articleHeaderOverscore}>
                      Plagiarism Score
                    </p>
                    <p className={styles.articleHeaderOverscoreStats}>
                      {stats.plagiarism}% Plagiarized
                    </p>
                  </div>
                  <div className="flex flex-col mr-7 justify-center">
                    <p className={styles.articleHeaderOverscore}>
                      Keywords Density
                    </p>
                    <p className={styles.articleHeaderOverscoreStats}>
                      {stats.density}% Density
                    </p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className={styles.articleHeaderOverscore}>
                      Grammatical Score
                    </p>
                    <p className={styles.articleHeaderOverscoreStats}>
                      {stats.fluency}% Fluent
                    </p>
                  </div>
                </div>
              </div>
              <div className="generator-container relative md:pt-[25px] pt-[70px] pb-[25px] md:px-[70px] px-4">
                <div className="content">
                  {!this.state.showEditor ? (<>{this.articleContent}</>) : (
                    // <ArticleEditor articleContent={this.state.stateArticleContent} setArticleContent={this.setStateArticleContent} />
                    <></>
                  )}
                </div>
                <div className="absolute top-6 right-6 cursor-pointer" onClick={this.showEditorHandler}>
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
                </div>
                {this.state.showEditor && <div className='flex'>
                  <button className="mx-auto btn btn-primary mt-[140px] text-black border-[#dcd8e780] bg-[#dcd8e780] font-bold">
                    Generate Content
                  </button>
                </div>}
              </div>
              <div className="md:flex grid grid-cols-1 gap-5 mt-5 md:justify-end">
                <button className="btn btn-reset" style={{ marginRight: '6.54px', fontFamily: 'Poppins' }}>
                  Download
                </button>
                <button className="btn btn-primary text-white" style={{ fontSize: '16px' }}>
                  Publish to Wordpress
                </button>
              </div>
            </div>
          </ArticleLayout>
        </div>
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

export default EditArticle