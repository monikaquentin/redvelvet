import PropTypes from 'prop-types'

import Container from '@/components/global/Container'
import PublicKeys from '@/components/home/PublicKeys'

const Home = ({ t }) => {
  return (
    <Container header={{ title: t('pages.home') }}>
      <main className="page-home">
        <p>
          {t('maintenance.p1')}&nbsp;
          <a href="mailto:re@redvelvet.me">re@redvelvet.me</a> /{' '}
          <a href="mailto:rasetiansyah@pm.me">rasetiansyah@pm.me</a> -{' '}
          <a href="https://gitlab.com/monikaquentin.gpg" target="_blank" rel="noopener noreferrer nofollow">
            OpenPGP
          </a>
          .<em>{t('maintenance.p2')}</em>
        </p>
        <hr />
        <PublicKeys />
      </main>
    </Container>
  )
}

Home.propTypes = {
  t: PropTypes.func
}

export default Home
