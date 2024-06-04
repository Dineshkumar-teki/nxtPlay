import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {eachVideo} = props
  const {id, publishedAt, thumbnailUrl, title, viewCount, channel} = eachVideo
  const formatedChanel = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name, profileImageUrl} = formatedChanel
  const dataDistance = formatDistanceToNow(new Date(publishedAt))
    .split(' ')
    .slice(1)
    .join(' ')
  return (
    <Link to={`/videos/${id}`}>
      <li className="eachVideoCard">
        <img src={thumbnailUrl} alt="id" />
        <div className="profileAndContent">
          <img src={profileImageUrl} alt="id" />
          <div className="content">
            <h4>{title}</h4>
            <p>{name}</p>
            <div className="viewsAndTime">
              <p>{viewCount} views</p>
              <p>. {dataDistance} ago</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoItem
