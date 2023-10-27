import PropTypes from 'prop-types'

import Container from '@/components/global/Container'
import PublicKeys from '@/components/home/PublicKeys'

Home.propTypes = {
  t: PropTypes.func
}

function Home({ t }) {
  return (
    <Container header={{ title: t('pages.home') }}>
      <p className="paragraph mt-4">
        {t('maintenance.p1')}&nbsp;
        <a href="mailto:re@redvelvet.me">re@redvelvet.me</a> /{' '}
        <a href="mailto:rasetiansyah@pm.me">rasetiansyah@pm.me</a> -{' '}
        <a href="https://gitlab.com/monikaquentin.gpg" target="_blank" rel="noopener noreferrer nofollow">
          OpenPGP
        </a>
        .<em className="text-gray-100">{t('maintenance.p2')}</em>
      </p>
      <hr className="border-t mt-4" />
      <PublicKeys />
    </Container>
  )
}

export default Home
