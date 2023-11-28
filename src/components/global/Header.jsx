import PropTypes from 'prop-types'

import RedRose from '@/assets/png/redrose.png'
import Navigation from '@/components/global/Navigation'

const Header = ({ title, subtitle }) => {
  return (
    <div className="header-wrapper">
      <img src={RedRose} alt="RedVelvet" />
      <Navigation />
      <h1>{title}</h1>
      <h3>
        <a href="mailto:re@redvelvet.me">Rivane Rasetiansyah</a>
        {subtitle && (
          <span>
            <br />
            {subtitle}
          </span>
        )}
      </h3>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default Header
