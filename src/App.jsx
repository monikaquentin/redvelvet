import Home from '@/pages/Home'
import Write from '@/pages/Write'
import Paper from '@/pages/Paper'
import NotFound from '@/pages/NotFound'

import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function Endpoint() {
  const { t } = useTranslation()
  const papers = []
  const RoutePapers = []
  t('paper_list', { returnObjects: true }).map((data, index) => {
    papers.push(JSON.parse(JSON.stringify(data)))
    RoutePapers.push(<Route key={index} path={data.url} name={data.title} element={<Paper data={data} />} />)
  })
  return (
    <Routes>
      <Route path="/" name="Home" element={<Home t={t} />} />
      <Route path="/write" name="Write" element={<Write t={t} papers={papers} />} />
      {RoutePapers}
      <Route path="*" name="NotFound" element={<NotFound />} />
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
