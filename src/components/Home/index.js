import {Component} from 'react'
import HomeContent from '../HomeContent'
import Trending from '../Trending'
import Gaming from '../Gaming'
import SavedVideos from '../SavedVideos'
import TabItem from '../TabItem'
import Header from '../Header'
import './index.css'

const tabsList = [
  {tabId: 'Home', value: 'Home'},
  {tabId: 'TRENDING', value: 'Trending'},
  {tabId: 'GAMING', value: 'Gaming'},
  {tabId: 'SAVEDVIDEOS', value: 'Saved Videos'},
]

class Home extends Component {
  state = {activeTabId: tabsList[0].tabId}

  alterTabItem = id => {
    this.setState({activeTabId: id})
  }

  getTabItemContent = () => {
    const {activeTabId} = this.state
    switch (activeTabId) {
      case 'Home':
        return <HomeContent />
      case 'TRENDING':
        return <Trending />
      case 'GAMING':
        return <Gaming />
      case 'SAVEDVIDEOS':
        return <SavedVideos />
      default:
        return null
    }
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div>
        <Header />
        <section className="homeSection">
          <div className="tabAndContactSection">
            <div className="tabsSection">
              <ul>
                {tabsList.map(eachItem => (
                  <TabItem
                    tabItem={eachItem}
                    key={eachItem.tabId}
                    activeTab={eachItem.tabId === activeTabId}
                    alterTabItem={this.alterTabItem}
                  />
                ))}
              </ul>
            </div>
            <div className="contactSection">
              <h3>CONTACT US</h3>
              <div className="platformLogos">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <p>Enjoy! Now to see your channels and recommendations.</p>
            </div>
          </div>
          {this.getTabItemContent()}
        </section>
      </div>
    )
  }
}

export default Home
