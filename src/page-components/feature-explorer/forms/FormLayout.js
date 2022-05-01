import React from 'react'
import { useRouter } from 'next/router'

const FormLayout = ({ isDefault = false, children, subText, data, generate }) => {

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
        {!isDefault && (
          <button onClick={generateContent} className="btn btn-primary w-full font-medium text-base">
            Generate
          </button>
        )}
      </div>
    </>
  )
}

export default FormLayout