import React, { useState } from 'react'

function Refresh(props) {

  const [load, setLoad] = useState(false)
  const { isPrimary } = props

  const refreshHandler = () => {
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
    }, 1000);
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={refreshHandler}>
      <svg width="20" height="14" className={load && 'spinning-loader'} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 0C6.94665 0 1.4852 4.66999 0.258727 10.8633H4.00617C5.16083 6.69951 8.96857 3.63868 13.5 3.63868C16.2241 3.63868 18.6857 4.74557 20.4675 6.53247L16.1367 10.8633H27V0L23.0449 3.95507C20.6022 1.51157 17.2282 0 13.5 0ZM0 16.1367V27L3.95507 23.0449C6.39779 25.4884 9.7718 27 13.5 27C20.0534 27 25.5148 22.33 26.7413 16.1367H22.9938C21.8392 20.3005 18.0314 23.3613 13.5 23.3613C10.7759 23.3613 8.31434 22.2544 6.53247 20.4675L10.8633 16.1367H0Z" fill={isPrimary ? '#00a141' : 'black'} />
      </svg>
    </div>
  )
}

export default Refresh