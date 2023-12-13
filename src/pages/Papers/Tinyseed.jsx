import PropTypes from 'prop-types'

import { useState } from 'react'

const TinySeed = ({ redL }) => {
  const [read, setRead] = useState(false)
  return (
    <div className="paper-tinyseed">
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
            <br />
            <p className="info-paragraph">{redL.resolution}</p>
            <p className="content-margin">{redL.resolution_content}</p>
          </div>
        )}
      </div>
    </div>
  )
}

TinySeed.propTypes = {
  redL: PropTypes.object
}

export default TinySeed
