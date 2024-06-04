import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute path="/" component={Home} />
    <ProtectedRoute path="/videos/:id" component={VideoItemDetails} />
  </Switch>
)

export default App
