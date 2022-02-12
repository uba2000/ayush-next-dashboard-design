import React from 'react'
import styles from '../../../styles/Article.module.css'

function ArticleLayout({ children, crumbs }) {
  let hCrumbs = crumbs ? crumbs : []
  return (
    <div className="w-full">
      <ul className={styles.breadcrumbs}>
        <li>
          Home
        </li>
        <li>
          Projects
        </li>
        <li>
          Articles
        </li>
        {
          hCrumbs.map(crumb => {
            return (
              <li>
                {crumb}
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