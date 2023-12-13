import Home from '@/pages/Home'
import Write from '@/pages/Write'
import Paper from '@/pages/Papers/Index'
import Curve25519Single from '@/pages/Curve25519/single'
import Curve25519Multiple from '@/pages/Curve25519/multiple'
import Curve25519Decrypt from '@/pages/Curve25519/decrypt'
import BuyMeACoffee from '@/pages/BuyMeACoffee'
import NotFound from '@/pages/NotFound'

import { ConfigProvider as Ant } from 'antd'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const style = {
  token: {
    colorBgBase: '#fdfdfd',
    colorBgLayout: '#f5f5f5',
    colorPrimary: '#7f2a3c',
    colorLink: '#1b96a7',
    colorTextPlaceholder: '#9ca3af',
    colorBgSpotlight: '#001529',
    colorWhite: '#f9f9f9'
  }
}

export const Endpoint = () => {
  const { t } = useTranslation()
  const papers = []
  const RoutePapers = []
  t('pages.paper.lists', { returnObjects: true }).map((redL, index) => {
    papers.push(JSON.parse(JSON.stringify(redL)))
    RoutePapers.push(<Route key={index} path={redL.url} name={redL.title} element={<Paper redL={redL} />} />)
  })
  return (
    <Routes>
      <Route path="/" name="Home" element={<Home t={t} />} />
      <Route path="/write" name="Write" element={<Write t={t} papers={papers} />} />
      <Route path="/curve25519" name="Curve25519 Single" element={<Curve25519Single t={t} />} />
      <Route path="/curve25519-multiple" name="Curve25519 Multiple" element={<Curve25519Multiple t={t} />} />
      <Route path="/curve25519-decrypt" name="Curve25519 Decrypt" element={<Curve25519Decrypt t={t} />} />
      <Route path="/bmac" name="Buy Me a Coffee" element={<BuyMeACoffee t={t} />} />
      {RoutePapers}
      <Route path="*" name="NotFound" element={<NotFound t={t} />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Ant theme={style}>
        <Endpoint />
      </Ant>
    </BrowserRouter>
  )
}
