import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import TechItem from '../TechItem'
import './index.css'

class Home extends Component {
  state = {courseData: [], apiStatus: 'initial'}

  componentDidMount = () => {
    this.getData()
  }

  renderData = data => (
    <>
      <h1 className="heading">Courses</h1>
      <ul className="courses-list">
        {data.map(eachItem => (
          <TechItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    </>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  getData = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const fetchedData = await response.json()

    const formattedData = fetchedData.courses.map(eachItem => ({
      id: eachItem.id,
      logoUrl: eachItem.logo_url,
      name: eachItem.name,
    }))
    console.log(formattedData)
    if (response.ok === true) {
      this.setState({courseData: formattedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

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
    this.setState({apiStatus: 'initial'}, this.getData)
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
        <div className="container">{renderedItem}</div>
      </>
    )
  }
}

export default Home
