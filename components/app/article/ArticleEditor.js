import React from 'react'

function ArticleEditor({ articleContent, setArticleContent }) {
  return (
    <div className="generator-container relative md:pt-[25px] pt-[70px] pb-[25px] md:px-[70px] px-4">
      <div className="content">
        {articleContent}
      </div>
      <div className="absolute top-6 right-6">
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
    </div>
  )
}

export default ArticleEditor