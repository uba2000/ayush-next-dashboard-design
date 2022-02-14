import React, { Component } from 'react'
import ArticleLayout from '../../../../components/app/article/ArticleLayout'
import DashboardLayout from '../../../../components/app/DasboardLayout'
import styles from '../../../../styles/Article.module.css'

export class EditArticle extends Component {
  render() {
    return (
      <DashboardLayout>
        <div className="-mt-11">
          <ArticleLayout crumbs={[' How to start the agency']}>
            <div className="mt-16">
              <div className="grid md:grid-cols-[37.31%_auto] grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <div className="flex mb-2">
                    <div className="mr-2">
                      <h3 className={styles.articleEditHeaderTitle}>
                        How to start the agency
                      </h3>
                    </div>
                    <div className="">
                      {/* pencil */}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-2">
                      <h5 className={styles.articleEditHeaderTags}>
                        Graphic design, digital marketing
                      </h5>
                    </div>
                    <div className="">
                      {/* pencil */}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col mr-7 justify-center">
                    <p className={styles.articleHeaderOverscore}>
                      Word Count
                    </p>
                    <p className={styles.articleHeaderOverscoreStats}>
                      1000 Words
                    </p>
                  </div>
                  <div className="flex flex-col mr-7 justify-center">
                    <p className={styles.articleHeaderOverscore}>
                      Plagiarism Score
                    </p>
                    <p className={styles.articleHeaderOverscoreStats}>
                      0% Plagiarized
                    </p>
                  </div>
                  <div className="flex flex-col mr-7 justify-center">
                    <p className={styles.articleHeaderOverscore}>
                      Keywords Density
                    </p>
                    <p className={styles.articleHeaderOverscoreStats}>
                      96% Density
                    </p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className={styles.articleHeaderOverscore}>
                      Grammatical Score
                    </p>
                    <p className={styles.articleHeaderOverscoreStats}>
                      96% Fluent
                    </p>
                  </div>
                </div>
              </div>
              <div className="generator-container relative" style={{ padding: '25px 50px' }}>
                <div className="content">
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
                </div>
                <div className="absolute top-6 right-6">
                  {/* pencil */}
                </div>
              </div>
              <div className="flex mt-5 justify-end">
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
}

export default EditArticle