import PropTypes from 'prop-types'

import Container from '@/components/global/Container'

import { Link } from 'react-router-dom'
import React, { useState } from 'react'

Write.propTypes = {
  t: PropTypes.func,
  papers: PropTypes.array
}

function Write({ t, papers }) {
  const [isLatestFirst, setIsLatestFirst] = useState(false)
  const header = {
    title: t('pages.write')
  }
  const handleReverse = () => {
    setIsLatestFirst(!isLatestFirst)
  }
  const displayedPapers = isLatestFirst ? papers.slice().reverse() : papers
  return (
    <Container header={header}>
      <div className="writinglist">
        <div className="writinglist-button-wrapper">
          <button onClick={handleReverse} className="writinglist-sort-button">
            {isLatestFirst ? t('oldest') : t('latest')}
          </button>
          <hr />
        </div>
        <div className="writinglist-wrapper">
          {displayedPapers.map((paper, index) => (
            <Link key={index} className="writinglist-item" to={paper.url}>
              <h2 className="writinglist-item-title">{paper.title}</h2>
              <h2 className="writinglist-item-date">{paper.date}</h2>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Write
