import PropTypes from 'prop-types'

const TextArea = ({ attr }) => {
  return (
    <div className="default-textarea">
      <label htmlFor={attr.htmlFor}>{attr.label}</label>
      <div className="mt-2">
        <textarea
          className={!attr.disabled && '!ring-secondary'}
          id={attr.id}
          name={attr.name}
          rows={attr.rows}
          placeholder={attr.placeholder}
          disabled={attr.disabled}
          value={attr.value}
          onChange={attr.onChange}
        ></textarea>
      </div>
      <div className="description">
        <p className="paragraph">{attr.description}</p>
      </div>
    </div>
  )
}

TextArea.propTypes = {
  attr: PropTypes.object
}

export default TextArea
