import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './Components/Home'
import DisplayedCourseItem from './Components/DisplayedCourseItem'
import NotFound from './Components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={DisplayedCourseItem} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
