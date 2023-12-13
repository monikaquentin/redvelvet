import PropTypes from 'prop-types'

import Container from '@/components/global/Container'

import { useState } from 'react'
import { Link } from 'react-router-dom'

const Write = ({ t, papers }) => {
  const [isLatestFirst, setIsLatestFirst] = useState(false)
  const handleReverse = () => setIsLatestFirst(!isLatestFirst)
  const latestPapers = isLatestFirst ? papers.slice().reverse() : papers
  const pinnedPapers = [3]
  return (
    <Container header={{ title: t('pages.write.title') }}>
      <div className="page-write">
        <div className="button-wrapper">
          <button className="button-pinned">{t('pages.write.pinned')}</button>
        </div>
        {papers.map(
          (paper, index) =>
            pinnedPapers.includes(index) && (
              <Link key={index} to={paper.url}>
                <h2 className="title">{paper.title}</h2>
                <h2 className="date">{paper.date}</h2>
              </Link>
            )
        )}
      </div>
      <main className="page-write">
        <div className="button-wrapper">
          <button className="button-sort" onClick={handleReverse}>
            {isLatestFirst ? t('pages.write.oldest') : t('pages.write.latest')}
          </button>
        </div>
        <hr />
        {latestPapers.map((paper, index) => (
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
