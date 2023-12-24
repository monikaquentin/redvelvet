import Language from '@/components/global/Language'

import { Link, useLocation } from 'react-router-dom'
import { HomeOutlined, EditOutlined, CoffeeOutlined } from '@ant-design/icons'

const Navigation = () => {
  const location = useLocation()
  const currentPath = location.pathname.match(/\/([^/]+)$/)?.[1]
  const navItems = [
    { path: '/', icon: <HomeOutlined />, title: 'Home' },
    { path: '/write', icon: <EditOutlined />, title: 'Write' },
    { path: '/bmac', icon: <CoffeeOutlined />, title: 'Buy Me a Coffee' }
  ]

  return (
    <nav className="nav-wrapper">
      {navItems.map((item) => (
        <Link
          key={item.path}
          className={`no-print item ${
            (!currentPath && item.path === '/') || currentPath === item.path.slice(1) ? 'item--active' : ''
          }`}
          title={item.title}
          to={item.path}
        >
          {item.icon}
        </Link>
      ))}
      <Language />
    </nav>
  )
}

export default Navigation
