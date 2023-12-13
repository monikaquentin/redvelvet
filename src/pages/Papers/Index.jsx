import PropTypes from 'prop-types'

import Container from '@/components/global/Container'
import AnIntroduction from '@/pages/Papers/AnIntroduction'
import PovCs from '@/pages/Papers/PerspectiveOfComputerScience'
import ThesisI from '@/pages/Papers/ThesisI'
import Tinyseed from '@/pages/Papers/Tinyseed'

import { useLocation } from 'react-router-dom'

const papers = {
  'an-introduction': AnIntroduction,
  'perspective-of-computer-science': PovCs,
  'thesis-i': ThesisI,
  tinyseed: Tinyseed
}

const IndexPaper = ({ redL }) => {
  const location = useLocation()
  const currentPaper = location.pathname.match(/\/([^/]+)$/)?.[1]
  const Paper = papers[currentPaper]
  return (
    <Container header={{ title: redL.title, subtitle: redL.subtitle }}>
      <main className="page-paper-index">{Paper && <Paper redL={redL} />}</main>
    </Container>
  )
}

IndexPaper.propTypes = {
  redL: PropTypes.object
}

export default IndexPaper
