import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import VideoItem from '../VideoItem'
import './index.css'

const views = {
  initialView: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  successButEmpty: 'EMPTY',
}

class HomeContent extends Component {
  state = {allVideos: [], userSearch: '', homeView: views.initialView}

  componentDidMount() {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    this.setState({homeView: views.loading})
    const {userSearch} = this.state
    const jwtToken = Cookies.get('jwt-token')
    const url = `https://apis.ccbp.in/videos/all?search=${userSearch}`
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
      if (videos.length !== 0) {
        const formatedData = videos.map(eachVideo => ({
          id: eachVideo.id,
          publishedAt: eachVideo.published_at,
          thumbnailUrl: eachVideo.thumbnail_url,
          title: eachVideo.title,
          viewCount: eachVideo.view_count,
          channel: eachVideo.channel,
        }))
        this.setState({allVideos: formatedData, homeView: views.success})
      } else {
        this.setState({
          homeView: views.successButEmpty,
        })
      }
    } else {
      this.setState({homeView: views.failure})
    }
  }

  userInput = event => {
    this.setState({userSearch: event.target.value}, this.getAllVideos)
  }

  retryView = () => {
    this.getAllVideos()
  }

  alterHomeView = () => {
    const {homeView, allVideos} = this.state
    switch (homeView) {
      case views.success:
        return (
          <ul className="videoDisplay">
            {allVideos.map(eachVideo => (
              <VideoItem eachVideo={eachVideo} key={eachVideo.id} />
            ))}
          </ul>
        )
      case views.successButEmpty:
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
      case views.failure:
        return (
          <div className="failureView">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt=""
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having some trouble to complete your request.</p>
            <p>Please try Again</p>
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
    return (
      <div className="homeTabSection">
        <div className="searchEle">
          <input
            type="search"
            placeholder="Search"
            className="searchInput"
            onChange={this.userInput}
          />
          <button className="searchBtn">
            <FaSearch />
          </button>
        </div>
        {this.alterHomeView()}
      </div>
    )
  }
}

export default HomeContent
