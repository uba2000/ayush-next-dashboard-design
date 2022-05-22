import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import axios from 'axios'
import queryString from 'query-string'

const FormLayout = ({ isDefault = false, children, subText, data: featureData, generate }) => {

  const { query } = useRouter()
  const { data: user } = useSession();

  const generateContent = async () => {
    const generateData = {
      slug: query.slug,
      featureData: queryString.stringify(featureData),
      accessToken: user.user.accessToken
    }
    const { data } = await axios.post('/api/generate-feature-content', generateData)
    console.log(data);
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