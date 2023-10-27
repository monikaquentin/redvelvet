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
  const handleReverse = () => setIsLatestFirst(!isLatestFirst)
  const displayedPapers = isLatestFirst ? papers.slice().reverse() : papers
  return (
    <Container header={{ title: t('pages.write') }}>
      <div className="writinglist-wrapper">
        <div className="button-wrapper">
          <button onClick={handleReverse}>{isLatestFirst ? t('oldest') : t('latest')}</button>
        </div>
        <hr />
        {displayedPapers.map((paper, index) => (
          <Link key={index} to={paper.url}>
            <h2 className="title">{paper.title}</h2>
            <h2 className="date">{paper.date}</h2>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default Write
