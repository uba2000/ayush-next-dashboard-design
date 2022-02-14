import React from 'react'

function OverallScore() {
  const scoreText = {
    lineHeight: '120%',
    letterSpacing: '0.005em',
    opacity: '0.8',
    fontSize: '10.8108px',
  }
  const btn = {
    fontSize: '8.17394px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
    padding: '8.68px 12.77px'
  }
  return (
    <div className="flex flex-col">
      <div className="generator-container">
        <div className="mb-3">
          <p className="generator-title mb-0">
            Overall Score
          </p>
        </div>
        <div className="">
          <div className='mb-5'>
            <p style={scoreText} className="font-bold mb-1">Word Count</p>
            <p style={scoreText} className="text-primary">1000 Words</p>
          </div>
          <div className='mb-5'>
            <p style={scoreText} className="font-bold mb-1">Plagiarism Score</p>
            <p style={scoreText} className="text-primary">0% Plagiarized</p>
          </div>
          <div className='mb-5'>
            <p style={scoreText} className="font-bold mb-1">Keywords Density</p>
            <p style={scoreText} className="text-primary">96% Density</p>
          </div>
          <div>
            <p style={scoreText} className="font-bold mb-1">Grammatical Score</p>
            <p style={scoreText} className="text-primary">96% Fluent</p>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <button className="btn btn-primary text-white mb-[6.54px]" style={{ ...btn, marginRight: '6.54px' }}>
          Publish to Wordpress
        </button>
        <button className="btn btn-primary--outline  mb-[6.54px]" style={btn}>
          Download
        </button>
      </div>
    </div>
  )
}

export default OverallScore