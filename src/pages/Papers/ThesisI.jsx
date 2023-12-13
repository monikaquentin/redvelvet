import PropTypes from 'prop-types'

const Thesis = ({ redL }) => {
  return (
    <div className="paper-thesis">
      <p className="warning-paragraph">{redL.warning}</p>
    </div>
  )
}

Thesis.propTypes = {
  redL: PropTypes.object
}

export default Thesis
