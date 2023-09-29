import PropTypes from 'prop-types'

import Container from '@/components/global/Container'

import { useState } from 'react'

Paper.propTypes = {
  data: PropTypes.object
}

function Paper({ data }) {
  const [read, setRead] = useState(false)
  return (
    <Container header={{ title: data.title, subtitle: data.subtitle }}>
      <hr className="mt-4" />
      {data.warning ? (
        <div>
          <p className="paragraph text-justify !font-semibold border border-secondary border-r-8 p-2 mt-4">
            {data.warning}
          </p>
          <div className="paragraph text-justify !text-secondary mt-4">
            {!read ? (
              <span className="cursor-pointer" onClick={() => setRead(!read)}>
                {data.read_more}...
              </span>
            ) : (
              <div>
                <span className="cursor-pointer" onClick={() => setRead(!read)}>
                  {data.close}
                </span>
                <p className="paragraph text-justify mt-4">{data.content}</p>
                <p className="paragraph text-justify !font-semibold border border-gray-100 border-r-8 p-2 mt-4">
                  {data.resolution}
                </p>
                <p className="paragraph text-justify mt-4">{data.resolution_content}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="paragraph text-justify mt-4">
          {data.content}
          {data.repo_link && (
            <span>
              &nbsp;
              <a href={data.repo_link} target="_blank" rel="noopener noreferrer nofollow">
                {data.repo}
              </a>
            </span>
          )}
        </div>
      )}
    </Container>
  )
}

export default Paper
