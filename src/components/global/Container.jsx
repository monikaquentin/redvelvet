import PropTypes from 'prop-types'

import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

Container.propTypes = {
  children: PropTypes.object,
  header: PropTypes.object
}

function Container({ children, header }) {
  return (
    <div className="container">
      <div className="mt-64">
        <Header title={header.title} date={header?.date} />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Container
