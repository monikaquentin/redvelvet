import PropTypes from 'prop-types'

import Container from '@/components/global/Container'

import { useNavigate } from 'react-router-dom'

const NotFound = ({ t }) => {
  const navigate = useNavigate()
  const handleBack = () => {
    // 💡 Verify if previous page exists before using router.back
    window.history.length > 1 ? navigate(-1) : navigate('/')
  }
  return (
    <Container header={{ title: 'RedVelvet' }}>
      <main className="page-not-found">
        <div className="wrapper">
          <p>404</p>
          <h1>{t('pages.notfound.title')}</h1>
          <div className="link-items">
            <a onClick={handleBack}>{t('pages.notfound.links.l1')}</a>
            <a href="mailto:re@redvelvet.me">
              {t('pages.notfound.links.l2')} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </Container>
  )
}

NotFound.propTypes = {
  t: PropTypes.func
}

export default NotFound
