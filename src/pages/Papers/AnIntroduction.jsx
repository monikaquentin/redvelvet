import PropTypes from 'prop-types'

import avatar from '@/assets/jpg/avatar_default_1-20230707-0001.jpg'
import photo from '@/assets/jpg/avatar_default_1-20230707-0002.jpg'

import { Avatar, Card } from 'antd'
import { GithubOutlined, GitlabOutlined, LinkedinOutlined } from '@ant-design/icons'

const { Meta } = Card

const AnIntroduction = ({ redL }) => {
  return (
    <div className="paper-an-introduction">
      <Card
        className="bio-card"
        hoverable
        style={{ width: 267 }}
        actions={[
          <a key="github" href={redL.github_link} target="_blank" rel="noopener noreferrer nofollow">
            <GithubOutlined />
          </a>,
          <a key="gitlab" href={redL.gitlab_link} target="_blank" rel="noopener noreferrer nofollow">
            <GitlabOutlined />
          </a>,
          <a key="linkedin" href={redL.linkedin_link} target="_blank" rel="noopener noreferrer nofollow">
            <LinkedinOutlined />
          </a>
        ]}
        cover={<img alt="example" src={photo} />}
      >
        <Meta
          title={redL.about_me}
          avatar={<Avatar src={avatar} style={{ borderRadius: '10px' }} />}
          description={redL.about_me_content}
        />
      </Card>
      <div className="bio-site">
        <h1>{redL.about_site}</h1>
        <p>{redL.about_site_content}</p>
        <h1>{redL.about_darknet}</h1>
        <p>
          {redL.about_darknet_content}
          <a href={redL.about_darknet_link.link} target="_blank" rel="noopener noreferrer nofollow">
            {redL.about_darknet_link.label}
          </a>
          .
        </p>
      </div>
    </div>
  )
}

AnIntroduction.propTypes = {
  redL: PropTypes.object
}

export default AnIntroduction
