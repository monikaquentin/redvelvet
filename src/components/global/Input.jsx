import PropTypes from 'prop-types'

const Input = ({ attr }) => {
  return (
    <div className={`default-input ${!attr.disabled && '!ring-secondary'}`}>
      <span>{attr.label}: </span>
      <input
        id={attr.id}
        type={attr.type}
        name={attr.name}
        placeholder={attr.placeholder}
        disabled={attr.disabled}
        value={attr.value}
        autoComplete={attr.autoComplete}
        onChange={attr.onChange}
      />
    </div>
  )
}

Input.propTypes = {
  attr: PropTypes.object
}

export default Input
