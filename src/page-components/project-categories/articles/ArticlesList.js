import React, { useState } from 'react'

import CheckBox from '../../../components/layouts/CheckBox'
import { Settings } from '../../../ui/icons'
import ArticleListItem from './ArticlesListItem'
import { Table } from '../../../components/layouts/Table'

function ArticlesList(props) {
  const { articles, perpage } = props

  const [articleList, setArticleList] = useState(articles)
  const [page, setPage] = useState(1)
  const [checkAllArticles, setCheckAllArticles] = useState(false)

  const tickAllArticles = (va) => {
    let a = articleList;
    let b = [];
    for (let i = 0; i < articles.length; i++) {
      a[i].checked = va;
      b.push(a[i]);
    }
    setArticleList(b)
  }

  const tickAnArticle = (index, va) => {
    let a = articleList
    a[index].checked = va
    setArticleList(a)
  }

  function checkAllArticlesHandler(va) {
    setCheckAllArticles(va);
    tickAllArticles(va);
  }

  return (
    <>
      <div className="mt-8">
        <Table>
          <Table.Head>
            <Table.Row className="cursor-default">
              <Table.TH className='pl-0 cursor-pointer w-[41.5px]'>
                <div className="flex items-center justify-center" onClick={() => checkAllArticlesHandler(!checkAllArticles)}>
                  <CheckBox checked={checkAllArticles} />
                </div>
              </Table.TH>
              <Table.TH main={true} style={{ width: '50%', minWidth: '397px' }}>
                <span className="capitalize">
                  Articles
                </span>
              </Table.TH>
              <Table.TH style={{ width: '27%', minWidth: '169px' }}>
                <span className='flex items-center space-x-1'>
                  <span className="capitalize">
                    Tags
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                  </span>
                </span>
              </Table.TH>
              <Table.TH style={{ width: '12%', minWidth: '144px' }}>
                <span className="capitalize">
                  Date
                </span>
              </Table.TH>
              <Table.TH style={{ minWidth: '50px' }}>
                <Settings className="mx-auto h-[18px] w-[18px] dark:text-white text-black" />
              </Table.TH>
            </Table.Row>
          </Table.Head>
          <tbody>
            {
              articleList.length <= 10 ? articleList.map((item, index) => {
                return <ArticleListItem
                  item={item}
                  key={index}
                  articleIndex={index}
                  handleTick={tickAnArticle}
                />
              }) : articleList.slice((page - 1) * 10, page * 10).map((item, index) => {
                return <ArticleListItem
                  item={item}
                  key={index}
                  articleIndex={index}
                  handleTick={tickAnArticle}
                />
              })
            }
          </tbody>
        </Table>
      </div>
      <div className="dark:bg-darkMode-bg bg-white border border-t-0 dark:border-darkMode-border border-ash border-solid">
        <div className="flex justify-between pl-11 pr-10 py-4">
          <span className="font-poppins text-sm align-middle">
            {(page - 1) * 10 + 1}-{page * 10} of {articles.length} articles
          </span>
          <div className="flex items-center">
            <button
              className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash ${page == 1 && 'cursor-not-allowed'
                }`}
              disabled={page == 1}
              onClick={() => setPage(page - 1)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-chevron-left'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <polyline points='15 6 9 12 15 18' />
              </svg>
            </button>
            <p className="text-sm mx-4 font-poppins">
              {page}
            </p>
            <button
              className={`py-1 px-2 border border-solid dark:border-darkMode-border border-ash ${page == Math.ceil(articles.length / 10) && 'cursor-not-allowed'
                }`}
              disabled={page == Math.ceil(articles.length / 10)}
              onClick={() => setPage(page + 1)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-chevron-right'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <polyline points='9 6 15 12 9 18' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticlesList