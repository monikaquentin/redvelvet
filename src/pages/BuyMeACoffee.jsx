import PropTypes from 'prop-types'

import Container from '@/components/global/Container'

import React, { useState } from 'react'
import { Button, QRCode, Space } from 'antd'

const BuyMeACoffee = ({ t }) => {
  const [qrText, setQrText] = useState('')
  const currencies = [
    { type: 'btc', trimStart: [0, 4], trimEnd: [55, 62] },
    { type: 'xmr', trimStart: [0, 10], trimEnd: [90, 95] },
    { type: 'sc', trimStart: [0, 6], trimEnd: [37, 42] },
    { type: 'trx', trimStart: [0, 9], trimEnd: [30, 34] }
  ]
  const getAddress = (currency) => import.meta.env[`VITE_BMAC_${currency.toUpperCase()}`]
  const handleCurrency = (currency) => setQrText(getAddress(currency))
  return (
    <Container header={{ title: t('pages.bmac.title'), subtitle: t('pages.bmac.last_update') }}>
      <main className="page-buy-me-a-coffee">
        <p>
          {currencies.map((currency) => (
            <React.Fragment key={currency.type}>
              <Button type="default" size="small" onClick={() => handleCurrency(currency.type)}>
                {`${getAddress(currency.type).substring(currency.trimStart[0], currency.trimStart[1])}...${getAddress(
                  currency.type
                ).substring(currency.trimEnd[0], currency.trimEnd[1])}`}
              </Button>
              &nbsp;
            </React.Fragment>
          ))}
          {qrText && (
            <div className="qrcode">
              <Space direction="vertical" align="center" className="space">
                <QRCode type="canvas" value={qrText} errorLevel="H" />
              </Space>
              {currencies.map((currency) => (
                <React.Fragment key={currency.type}>
                  {qrText === getAddress(currency.type) && (
                    <b>
                      {t(`pages.bmac.currency.${currency.type}`)}:
                      <br />
                      <span>
                        <pre className="pre">
                          {currency.type === 'btc' &&
                            qrText.match(/.{1,31}/g).map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          {currency.type === 'xmr' &&
                            qrText.match(/.{1,32}/g).map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          {currency.type !== 'btc' && currency.type !== 'xmr' && qrText}
                        </pre>
                      </span>
                    </b>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
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
