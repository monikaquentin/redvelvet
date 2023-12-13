import PropTypes from 'prop-types'

import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

const Container = ({ sectionClass, children, header }) => {
  return (
    <div className="container">
      <section className={sectionClass}>
        <div className="content-wrapper">
          <Header title={header.title} subtitle={header?.subtitle} />
          <hr />
          {children}
          <Footer />
        </div>
      </section>
    </div>
  )
}

Container.propTypes = {
  sectionClass: PropTypes.string,
  children: PropTypes.any,
  header: PropTypes.object
}

export default Container
