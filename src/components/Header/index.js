import {FaMoon} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const userLogout = () => {
    Cookies.remove('jwt-token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt=""
      />
      <div className="profileCard">
        <button type="button" className="themeChanger">
          <FaMoon className="icon" />
        </button>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />
        <button className="logoutBtn" onClick={userLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
