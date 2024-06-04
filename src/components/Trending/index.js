import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaFireAlt} from 'react-icons/fa'
import VideoItem from '../VideoItem'

const views = {
  initialView: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Trending extends Component {
  state = {allVideos: [], trendingView: views.initialView}

  componentDidMount() {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    this.setState({trendingView: views.loading})
    const jwtToken = Cookies.get('jwt-token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        channel: eachVideo.channel,
      }))
      this.setState({allVideos: formatedData, trendingView: views.success})
    } else {
      this.setState({trendingView: views.failure})
    }
  }

  retryView = () => {
    this.getAllVideos()
  }

  alterTrendingView = () => {
    const {trendingView, allVideos} = this.state
    console.log(trendingView)
    switch (trendingView) {
      case views.success:
        return (
          <div className="homeTabSection">
            <div className="gameBanner">
              <div className="gameIconContainer">
                <FaFireAlt className="gameIcon" />
              </div>
              <h1>Trending</h1>
            </div>
            <ul className="videoDisplay">
              {allVideos.map(eachVideo => (
                <VideoItem eachVideo={eachVideo} key={eachVideo.id} />
              ))}
            </ul>
          </div>
        )
      case views.failure:
        return (
          <div className="failureView">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <h1>No Search Results Found</h1>
            <p>Try different key words or remove search filters</p>
            <button type="button" onClick={this.retryView} className="RetryBtn">
              Retry
            </button>
          </div>
        )
      case views.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="lightblue" height="50" width="50" />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {allVideos} = this.state
    return <>{this.alterTrendingView()}</>
  }
}

export default Trending
