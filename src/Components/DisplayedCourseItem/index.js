import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

class DisplayedCourseItem extends Component {
  state = {courseData: [], apiStatus: 'initial'}

  componentDidMount = () => {
    this.getCourseData()
  }

  getCourseData = async () => {
    const {match} = this.props
    const url = `https://apis.ccbp.in/te/courses/${match.params.id}`
    const response = await fetch(url)
    const fetchedData = await response.json()

    const formattedData = {
      id: fetchedData.course_details.id,
      name: fetchedData.course_details.name,
      logoUrl: fetchedData.course_details.image_url,
      description: fetchedData.course_details.description,
    }

    if (response.ok === true) {
      this.setState({courseData: formattedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  renderData = data => (
    <div className="selected-course">
      <img src={data.logoUrl} alt={data.name} className="course-img" />
      <div className="data-container">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  onClickRetry = () => {
    this.setState({apiStatus: 'initial'}, this.getCourseData)
  }

  render() {
    const {courseData, apiStatus} = this.state
    let renderedItem

    switch (apiStatus) {
      case 'success':
        renderedItem = this.renderData(courseData)
        break
      case 'failed':
        renderedItem = this.renderFailureView()
        break
      default:
        renderedItem = this.renderLoader()
    }

    return (
      <>
        <Navbar />
        <div className="container">
          <div className="item-container">{renderedItem}</div>
        </div>
      </>
    )
  }
}

export default DisplayedCourseItem
