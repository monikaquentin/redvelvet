import PropTypes from 'prop-types'

import Container from '@/components/global/Container'

import { useState } from 'react'
import { Link } from 'react-router-dom'

const Write = ({ t, papers }) => {
  const [isLatestFirst, setIsLatestFirst] = useState(false)
  const handleReverse = () => setIsLatestFirst(!isLatestFirst)
  const displayedPapers = isLatestFirst ? papers.slice().reverse() : papers
  return (
    <Container header={{ title: t('pages.write.title') }}>
      <main className="page-write">
        <div className="button-wrapper">
          <button onClick={handleReverse}>{isLatestFirst ? t('pages.write.oldest') : t('pages.write.latest')}</button>
        </div>
        <hr />
        {displayedPapers.map((paper, index) => (
          <Link key={index} to={paper.url}>
            <h2 className="title">{paper.title}</h2>
            <h2 className="date">{paper.date}</h2>
          </Link>
        ))}
      </main>
    </Container>
  )
}

Write.propTypes = {
  t: PropTypes.func,
  papers: PropTypes.array
}

export default Write
