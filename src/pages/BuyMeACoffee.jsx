import PropTypes from 'prop-types'

import Container from '@/components/global/Container'

const BuyMeACoffee = ({ t }) => {
  return (
    <Container header={{ title: t('pages.bmac.title'), subtitle: t('pages.bmac.last_update') }}>
      <main className="page-buy-me-a-coffee">
        <hr />
        <p>
          <b>BTC (SegWit/Bech32):</b>
          <span>{import.meta.env.VITE_BMAC_BTC}</span>

          <b>ETH or Stablecoin (ERC20/BEP20):</b>
          <span>{import.meta.env.VITE_BMAC_SC}</span>

          <b>TRX (TRC20):</b>
          <span>{import.meta.env.VITE_BMAC_TRX}</span>

          <em>{t('pages.bmac.greeting')}</em>
        </p>
      </main>
    </Container>
  )
}

BuyMeACoffee.propTypes = {
  t: PropTypes.func
}

export default BuyMeACoffee
