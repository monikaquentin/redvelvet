import PropTypes from 'prop-types'

import { useState } from 'react'

const PerspectiveOfComputerScience = ({ redL }) => {
  const [read, setRead] = useState(false)
  return (
    <div className="paper-perspective-of-computer-science">
      <p className="warning-paragraph">{redL.warning}</p>
      <div className="content-section">
        {!read ? (
          <span className="readmore-button" onClick={() => setRead(!read)}>
            {redL.read_more}...
          </span>
        ) : (
          <div>
            <span className="readmore-button" onClick={() => setRead(!read)}>
              {redL.close}
            </span>
            <p className="content-margin">{redL.content}</p>
            <p className="info-paragraph">{redL.resolution}</p>
            <p className="content-margin">{redL.resolution_content}</p>
          </div>
        )}
      </div>
    </div>
  )
}

PerspectiveOfComputerScience.propTypes = {
  redL: PropTypes.object
}

export default PerspectiveOfComputerScience
