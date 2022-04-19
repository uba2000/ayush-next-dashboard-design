import React from 'react'
import Link from 'next/link'

import styles from '../../../styles/Article.module.css'

function ArticleLayout({ children, crumbs }) {
  let hCrumbs = crumbs ? crumbs : []
  return (
    <div className="w-full">
      <ul className={styles.breadcrumbs}>
        <li>
          <Link href="/app/dashboard">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/app/projects">
            <a>Projects</a>
          </Link>
        </li>
        <li>
          <Link href="/app/projects/123/articles">
            <a>Articles</a>
          </Link>
        </li>
        {
          hCrumbs.map((crumb, index) => {
            return (
              <li key={index}>
                {index != (hCrumbs.length - 1) ? (<Link href={crumb.link}>
                  <a>{crumb.txt}</a>
                </Link>) : (
                  <>
                    {crumb.txt}
                  </>
                )
                }
              </li>
            )
          })}
      </ul>
      <div>
        {children}
      </div>
    </div>
  )
}

export default ArticleLayout