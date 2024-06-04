import {formatDistanceToNow} from 'date-fns'
import './index.css'

const GameVideoItem = props => {
  const {eachVideo} = props
  const {id, thumbnailUrl, title, viewCount} = eachVideo
  return (
    <li className="eachVideoCard">
      <img src={thumbnailUrl} alt="id" />
      <div className="content">
        <h4>{title}</h4>
        <p>{viewCount} Watching Worldwide</p>
      </div>
    </li>
  )
}

export default GameVideoItem
