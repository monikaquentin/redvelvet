import PropTypes from 'prop-types'

import Container from '@/components/global/Container'

import { Link } from 'react-router-dom'

Write.propTypes = {
  t: PropTypes.func,
  papers: PropTypes.array
}

function Write({ t, papers }) {
  const header = {
    title: t('pages.write')
  }
  return (
    <Container header={header}>
      <div className="writinglist">
        {papers.map((paper, index) => (
          <Link key={index} className="writinglist-item" to={paper.url}>
            <h2 className="writinglist-item-title">{paper.title}</h2>
            <h2 className="writinglist-item-date">{paper.date}</h2>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default Write
