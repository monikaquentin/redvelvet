import PropTypes from 'prop-types'

Input.propTypes = {
  attr: PropTypes.object
}

function Input({ attr }) {
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

export default Input
