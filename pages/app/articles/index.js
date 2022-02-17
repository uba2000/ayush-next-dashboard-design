import Link from 'next/link'
import React, { Component } from 'react'
import ArticleLayout from '../../../components/app/article/ArticleLayout'
import ArticlesList from '../../../components/app/article/ArticlesList'
import DashboardLayout from '../../../components/app/DasboardLayout'

export class index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    const article = {
      title: 'How to start agency',
      tags: ['Graphic design', 'digital marketing'],
      date: '2 days ago',
      checked: false
    }
    let articles = []
    for (let i = 0; i < 40; i++) {
      articles.push(article)
    }
    this.setState({
      articles: articles
    })
  }


  render() {
    return (
      <DashboardLayout>
        <ArticleLayout>
          <div className='mt-8'>
            <div className="flex justify-end mb-8">
              <Link href='/app/projects/new-project/features'>
                <a className="block w-fit btn btn-primary bg-primary text-white font-poppins">
                  Write New Article
                </a>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="">
                <p className="text-wild capitalize font-semibold font-poppins">
                  All Articles
                </p>
              </div>
              <div className="flex items-center justify-end">
                <p className="mr-4 text-wild capitalize font-semibold font-poppins">
                  Search
                </p>
                <input type="text" className="input-search max-w-[293px]" placeholder='How To...' />
              </div>
            </div>
            <ArticlesList articles={this.state.articles} />
          </div>
        </ArticleLayout>
      </DashboardLayout>
    )
  }
}

export default index