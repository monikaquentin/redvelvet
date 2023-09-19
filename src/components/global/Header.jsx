import PropTypes from 'prop-types'

import RedRose from '@/assets/png/redrose.png'
import Navigation from '@/components/global/Navigation'

Header.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string
}

function Header({ title, date }) {
  return (
    <div>
      <img src={RedRose} alt="RedVelvet" className="rose-img" />
      <Navigation />
      <h1 className="tracking-tight text-3xl font-bold mt-5">{title}</h1>
      <h3 className="tracking-tight text-lg mt-2">
        <a href="mailto:re@redvelvet.me">Rivane Rasetiansyah</a>
      </h3>
      {date ? <h3 className="text-sm text-gray-100 mt-2">{date}</h3> : null}
    </div>
  )
}

export default Header
