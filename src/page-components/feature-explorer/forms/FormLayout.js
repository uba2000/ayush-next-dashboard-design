import React from 'react'
import { useRouter } from 'next/router'

const FormLayout = ({ children, subText, data }) => {

  const { query } = useRouter()

  const generateContent = () => {
    generate({ slug: query.slug, data })
  }

  return (
    <>
      <div>
        <span className='text-lg dark:text-darkMode-subText text-ash'>
          {subText}
        </span>
      </div>
      <div>
        {children}
        <button onClick={generateContent} className="btn btn-primary w-full font-medium text-base">
          Generate
        </button>
      </div>
    </>
  )
}

export default FormLayout