import React, { useState } from 'react'

import styles from '../../../styles/Account.module.css'
import { Pencil } from '../../../ui/icons'

const GeneratorMainSection = ({ children }) => {

  const [editTitle, setEditTitle] = useState(false)
  const [articleTitle, setArticleTitle] = useState('What Is E-Commerce SEO?')

  return (
    <div className="generator-box">
      <header className='bg-white generator-box-header-box py-[17.5px] pl-[25px] pr-[20px] flex justify-between'>
        <p className='text-base leading-7 font-poppins capitalize flex items-center space-x-1'>
          <span className='font-bold mr-1'>Title:</span>
          {!editTitle ? (<>{articleTitle}</>) : (
            <input type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} className={styles.formGroupInput} style={{ maxWidth: '384px', width: '100%', height: '35px' }} />
          )}
        </p>
        {!editTitle ? (<span className='cursor-pointer' onClick={() => setEditTitle(!editTitle)}>
          <Pencil />
        </span>) : (
          <>
            <div className="">
              <button className="btn btn-reset py-[9px] px-[20px]">Reset</button>
              <button className="btn btn-primary py-[9px] px-[20px]" onClick={() => setEditTitle(!editTitle)}>Save</button>
            </div>
          </>
        )}
      </header>
      <div className="space-y-[20px] bg-[#FCFCFC] py-[27.5px] px-[25px]">
        {children}
      </div>
    </div>
  )
}

export default GeneratorMainSection