import {Link} from 'react-router-dom'
import './index.css'

const TechItem = props => {
  const {eachItem} = props
  return (
    <Link to={`/courses/${eachItem.id}`} className="link-item">
      <li className="course-item">
        <img
          src={eachItem.logoUrl}
          alt={eachItem.name}
          className="course-logo"
        />
        <p className="course-name">{eachItem.name}</p>
      </li>
    </Link>
  )
}

export default TechItem
