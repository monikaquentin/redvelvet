import PropTypes from 'prop-types'

import RedRose from '@/assets/png/redrose.png'
import Navigation from '@/components/global/Navigation'

const Header = ({ title, subtitle, noprint }) => {
  return (
    <div className="header-wrapper">
      <img src={RedRose} alt="RedVelvet" />
      <Navigation />
      <h1>{title}</h1>
      <h3 className={`${noprint?.title && 'no-print'}`}>
        <a href="mailto:re@redvelvet.me">Rivane Rasetiansyah</a>
        {subtitle && (
          <span className={`${noprint?.title && 'no-print'}`}>
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
  subtitle: PropTypes.string,
  noprint: PropTypes.object
}

export default Header
