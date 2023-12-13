import PropTypes from 'prop-types'

import Container from '@/components/global/Container'

import { useState } from 'react'
import { Button, QRCode, Space } from 'antd'

const TinySeed = ({ t }) => {
  const [qrText, setQrText] = useState('')

  const btc = import.meta.env.VITE_BMAC_BTC
  const trimBtc = `${btc.substring(0, 5)}...${btc.substring(37, 42)}`

  const xmr = import.meta.env.VITE_BMAC_XMR
  const trimXmr = `${xmr.substring(0, 10)}...${xmr.substring(90, 95)}`

  const eth = import.meta.env.VITE_BMAC_SC
  const trimEth = `${eth.substring(0, 6)}...${eth.substring(38, 42)}`

  const trx = import.meta.env.VITE_BMAC_TRX
  const trimTrx = `${trx.substring(0, 5)}...${trx.substring(29, 34)}`

  return (
    <Container
      header={{ title: 'Art of Flourishing in Small Spaces: Tinyseed', subtitle: t('pages.bmac.last_update') }}
    >
      <main className="page-buy-me-a-coffee">
        <p>
          <Button className="mb-2.5" type="default" size="small" onClick={() => setQrText(btc)}>
            {trimBtc}
          </Button>
          &nbsp;
          <Button className="mb-2.5" type="default" size="small" onClick={() => setQrText(xmr)}>
            {trimXmr}
          </Button>
          &nbsp;
          <Button className="mb-2.5" type="default" size="small" onClick={() => setQrText(eth)}>
            {trimEth}
          </Button>
          &nbsp;
          <Button className="mb-2.5" type="default" size="small" onClick={() => setQrText(trx)}>
            {trimTrx}
          </Button>
          {qrText && (
            <div className="flex items-center mt-1.5">
              <Space direction="vertical" align="center" className="mr-2.5">
                <QRCode type="canvas" value={qrText} errorLevel="H" />
              </Space>
              {qrText === btc && <b>Bitcoin (SegWit/Bech32)</b>}
              {qrText === xmr && <b>Monero (XMR)</b>}
              {qrText === eth && <b>Ethereum or Stablecoin (ERC20/BEP20)</b>}
              {qrText === trx && <b>Tron (TRC20)</b>}
            </div>
          )}
          <em>{t('pages.bmac.greeting')}</em>
        </p>
      </main>
    </Container>
  )
}

TinySeed.propTypes = {
  t: PropTypes.func
}

export default TinySeed
