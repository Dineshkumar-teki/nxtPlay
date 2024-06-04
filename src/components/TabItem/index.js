import {Link} from 'react-router-dom'
import {IoHome} from 'react-icons/io5'
import {FaFireAlt} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import './index.css'

const TabItem = props => {
  const {tabItem, activeTab, alterTabItem} = props
  const activeTabItem = activeTab ? 'highlightTab' : ''
  const {tabId, value} = tabItem
  const tabSpecificIcon = () => {
    switch (tabId) {
      case 'Home':
        return <IoHome className={`tabIcon ${activeTabItem}`} />
      case 'TRENDING':
        return <FaFireAlt className={`tabIcon ${activeTabItem}`} />
      case 'GAMING':
        return <SiYoutubegaming className={`tabIcon ${activeTabItem}`} />
      case 'SAVEDVIDEOS':
        return <BiListPlus className={`tabIcon ${activeTabItem}`} />
      default:
        return null
    }
  }

  const onChangeTabItem = () => {
    alterTabItem(tabId)
  }

  return (
    <li className={`tabIconCard ${activeTabItem} `} onClick={onChangeTabItem}>
      <button>
        {tabSpecificIcon()}
        <p className="tabName">{value}</p>
      </button>
    </li>
  )
}

export default TabItem
