import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import GameVideoItem from '../GameVideoItem'
import './index.css'

class Trending extends Component {
  state = {allVideos: []}

  componentDidMount() {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    const jwtToken = Cookies.get('jwt-token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {videos} = data
      const formatedData = videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({allVideos: formatedData})
    }
  }

  render() {
    const {allVideos} = this.state
    return (
      <div className="homeTabSection">
        <div className="gameBanner">
          <div className="gameIconContainer">
            <SiYoutubegaming className="gameIcon" />
          </div>
          <h1>Gaming</h1>
        </div>
        <ul className="videoDisplay">
          {allVideos.map(eachVideo => (
            <GameVideoItem eachVideo={eachVideo} key={eachVideo.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Trending
