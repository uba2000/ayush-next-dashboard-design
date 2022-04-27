import React from 'react'
import { useRouter } from 'next/router'
import tw from 'tailwind-styled-components'

function ActiveLink({ href, children }) {

  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className={`${router.asPath == href ? 'dark:bg-darkMode-bg bg-gray-1000' : 'dark:bg-black bg-white'}`}>
      {children}
    </a>
  )
}

export default ActiveLink