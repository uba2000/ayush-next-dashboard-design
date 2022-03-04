import Link from 'next/link'
import React, { useState } from 'react'

import ArticleLayout from '../../../../../components/app/article/ArticleLayout'
import ArticlesList from '../../../../../components/app/article/ArticlesList'
import DashboardLayout from '../../../../../components/app/DasboardLayout'
import SearchInput from '../../../../../components/SearchInput'

function index() {
  const populateArticle = () => {
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
    return articles
  }

  const [articles, setArticles] = useState(populateArticle())

  return (
    <DashboardLayout>
      <div className="-mt-11">
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
                <SearchInput />
              </div>
            </div>
            <ArticlesList articles={articles} />
          </div>
        </ArticleLayout>
      </div>
    </DashboardLayout>
  )
}

export default index