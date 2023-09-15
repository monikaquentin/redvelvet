import PropTypes from 'prop-types'

import Container from '@/components/global/Container'
import PublicKeys from '@/components/home/PublicKeys'

Home.propTypes = {
  t: PropTypes.func
}

function Home({ t }) {
  const header = {
    title: t('pages.home')
  }
  return (
    <Container header={header}>
      <p className="paragraph mt-4">
        {t('maintenance.p1')}&nbsp;
        <a href="mailto:re@redvelvet.me">re@redvelvet.me</a>.<em className="text-gray-100">{t('maintenance.p2')}</em>
      </p>
      <hr className="border-t mt-4" />
      <PublicKeys />
    </Container>
  )
}

export default Home
