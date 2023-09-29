import HomeIcon from '@/components/default/icons/home'
import PencilIcon from '@/components/default/icons/pencil'

import Language from '@/components/global/Language'

import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const pathname = useLocation().pathname

  return (
    <nav className="nav-wrapper">
      <Link className={`item ${pathname === '/' ? 'item--active' : ''}`} title="Home" to="/">
        <HomeIcon />
      </Link>
      <Link className={`item ${pathname === '/write' ? 'item--active' : ''}`} title="Write" to="/write">
        <PencilIcon />
      </Link>
      <Language />
    </nav>
  )
}

export default Navigation
