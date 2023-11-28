import Home from '@/pages/Home'
import Write from '@/pages/Write'
import Paper from '@/pages/Paper'
import Curve25519Single from '@/pages/Curve25519/single'
import Curve25519Multiple from '@/pages/Curve25519/multiple'
import Curve25519Decrypt from '@/pages/Curve25519/decrypt'
import BuyMeACoffee from '@/pages/BuyMeACoffee'
import NotFound from '@/pages/NotFound'

import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const Endpoint = () => {
  const { t } = useTranslation()
  const papers = []
  const RoutePapers = []
  t('pages.paper.lists', { returnObjects: true }).map((data, index) => {
    papers.push(JSON.parse(JSON.stringify(data)))
    RoutePapers.push(<Route key={index} path={data.url} name={data.title} element={<Paper data={data} />} />)
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
      <Endpoint />
    </BrowserRouter>
  )
}
