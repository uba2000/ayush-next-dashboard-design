import React from 'react'
import Link from 'next/link'

import styles from '../../styles/Article.module.css'

function ArticleLayout({ children, crumbs, hasOtherContent, otherContent }) {
  let hCrumbs = crumbs ? crumbs : []
  return (
    <div className="w-full">
      <div className="flex justify-between fixed top-[168.1px]">
        <ul className={styles.breadcrumbs}>
          <li>
            <Link href="/app/dashboard">
              <a className='dark:text-darkMode-subText text-ash'>Home</a>
            </Link>
            <span className='absolute -right-1 dark:text-darkMode-subText text-ash'>/</span>
          </li>
          <li>
            <Link href="/app/projects">
              <a className='dark:text-darkMode-subText text-ash'>Projects</a>
            </Link>
            <span className='absolute -right-1 dark:text-darkMode-subText text-ash'>/</span>
          </li>
          {
            hCrumbs.map((crumb, index) => {
              return (
                <li key={index}>
                  {index != (hCrumbs.length - 1) ? (<><Link href={crumb.link}>
                    <a className='dark:text-darkMode-subText text-ash'>{crumb.txt}</a>
                  </Link>
                    <span className='absolute -right-1 dark:text-darkMode-subText text-ash'>/</span></>) : (
                    <>
                      <span className='dark:text-white text-black'>
                        {crumb.txt}
                      </span>
                    </>
                  )
                  }
                </li>
              )
            })}
        </ul>
        {hasOtherContent && (
          { otherContent }
        )}
      </div>
      <div className='mt-[63px]'>
        {children}
      </div>
    </div>
  )
}

export default ArticleLayout