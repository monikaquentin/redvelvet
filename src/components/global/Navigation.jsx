import Language from '@/components/global/Language'

import { Link, useLocation } from 'react-router-dom'
import { HomeOutlined, EditOutlined, CoffeeOutlined } from '@ant-design/icons'

const Navigation = () => {
  const location = useLocation()
  const currentPath = location.pathname.match(/\/([^/]+)$/)?.[1]

  return (
    <nav className="nav-wrapper">
      <Link className={`item ${!currentPath ? 'item--active' : ''}`} title="Home" to="/">
        <HomeOutlined />
      </Link>
      <Link className={`item ${currentPath === 'write' ? 'item--active' : ''}`} title="Write" to="/write">
        <EditOutlined />
      </Link>
      <Link className={`item ${currentPath === 'bmac' ? 'item--active' : ''}`} title="Buy Me a Coffee" to="/bmac">
        <CoffeeOutlined />
      </Link>
      <Language />
    </nav>
  )
}

export default Navigation
