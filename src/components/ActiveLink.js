import React from 'react'
import { useRouter } from 'next/router'

function ActiveLink({ href, children }) {

  const router = useRouter()

  const style = {
    backgroundColor: router.asPath == href ? '#f7f9fa' : 'transparent'
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink