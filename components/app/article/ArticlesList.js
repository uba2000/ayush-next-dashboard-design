import React, { useState } from 'react'
import ArticleListItem from './ArticlesListItem'

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
        <table>
          <thead>
            <tr>
              <th className='pl-0 cursor-pointer' style={{ width: '1%', minWidth: '50px' }}>
                <div className="flex items-center justify-center" onClick={() => checkAllArticlesHandler(!checkAllArticles)}>
                  {!checkAllArticles ? (
                    <div className='h-5 w-5 rounded border border-solid border-[#767676]'></div>
                  ) : (
                    <div className="pop-in-animation">
                      <svg width="20" height="20" className='tick-svg' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.49988 0.833984C5.51075 0.833984 3.6031 1.58026 2.19658 2.90864C0.790054 4.23703 -0.00012207 6.0387 -0.00012207 7.91732V22.084C-0.00012207 23.9626 0.790054 25.7643 2.19658 27.0927C3.6031 28.421 5.51075 29.1673 7.49988 29.1673H22.4999C24.489 29.1673 26.3967 28.421 27.8032 27.0927C29.2097 25.7643 29.9999 23.9626 29.9999 22.084V7.91732C29.9999 6.0387 29.2097 4.23703 27.8032 2.90864C26.3967 1.58026 24.489 0.833984 22.4999 0.833984H7.49988ZM20.5949 13.1363C20.7296 13.0005 20.8347 12.841 20.9042 12.6668C20.9736 12.4926 21.0061 12.3073 20.9997 12.1212C20.9932 11.9352 20.9481 11.7522 20.8668 11.5827C20.7855 11.4132 20.6697 11.2604 20.5259 11.1332C20.3821 11.0059 20.2132 10.9066 20.0287 10.8411C19.8443 10.7755 19.648 10.7448 19.4511 10.7509C19.2541 10.7569 19.0604 10.7995 18.8809 10.8763C18.7014 10.9531 18.5396 11.0625 18.4049 11.1983L13.7804 15.8592L11.4959 13.9424C11.1966 13.7074 10.8123 13.5915 10.4241 13.6191C10.036 13.6468 9.67445 13.8159 9.41586 14.0906C9.15727 14.3654 9.02189 14.7243 9.03831 15.0916C9.05474 15.4589 9.22168 15.8057 9.50388 16.0589L12.8789 18.8922C13.1709 19.1372 13.5526 19.265 13.9428 19.2483C14.333 19.2316 14.701 19.0719 14.9684 18.803L20.5934 13.1363H20.5949Z" fill="#00A141" />
                      </svg>
                    </div>
                  )}
                </div>
              </th>
              <th style={{ width: '50%', minWidth: '397px' }}>
                <span className="capitalize">
                  Articles
                </span>
              </th>
              <th style={{ width: '27%', minWidth: '169px' }}>
                <span className="capitalize">
                  Article Tags
                </span>
              </th>
              <th style={{ width: '12%', minWidth: '144px' }}>
                <span className="capitalize">
                  Date
                </span>
              </th>
              <th style={{ minWidth: '50px' }}></th>
            </tr>
          </thead>
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
        </table>
      </div>
      <div className="mt-10">
        {/* Pagination */}
        <div className="flex justify-between">
          <span className="text-gray-500 font-poppins text-sm">
            {(page - 1) * 10 + 1} - {page * 10} of {articles.length} Projects
          </span>
          <div className="flex items-center">
            <button
              className={`py-1 px-2 border border-solid border-gray-900 ${page == 1 && 'cursor-not-allowed'
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
                stroke='#2c3e50'
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
              className={`
                py-1 px-2 border border-solid border-gray-900
                ${page == Math.ceil(articles.length / 10) && 'cursor-not-allowed'
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
                stroke='#2c3e50'
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