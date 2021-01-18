import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
import Content from '../components/content'
import titleImg from '../images/bg9.jpg'
import shopFront from '../images/shop.jpg'

const LocationContact = (theme) => {
  const useStyles = makeStyles(theme => ({
    shopImg: {
      display: 'flex',
      margin: 40
    }  
  }))

  const classes = useStyles(theme)
  
  return (
    <Layout>
      <Content title='Location & contact' titleImg={titleImg}>
        <p>Our clinic can be easily located on the street. It is a 2 story newly renovated red brick building on your right if you are on 
          the roundabout in front of Eastwood Library facing south. We are opposite to Eastwood Landmark Hotel. 
          There are a few 1/2 hour parkings right in front of our building and bus stops are just across the street.</p>
        <p>Our address is shown in the Google Map link below.</p>
        <i className="fas fa-map-marker-alt mr-2"></i>
        <a href='https://www.google.com/maps/place/2+Hillview+Rd,+Eastwood+NSW+2122/@-33.7904974,151.0815816,15z/data=!4m5!3m4!1s0x6b12a439e4dfcc77:0x3184686087efe006!8m2!3d-33.790906!4d151.0815375' 
          alt="" target='_blank' rel="noreferrer" className="dark-grey-text">
          2 Hillview Rd, Eastwood 2122, NSW
        </a>
        <img className={classes.shopImg} src={shopFront}></img>
        <p>Our contact is shown below. Please call us if you have any enquiries or to make an appointment.</p>
        <span><b>Phone number</b> (02) 98052803</span>
        <br/>
        <span><b>Fax number</b> (02) 98052803</span>
        <br/><br/>
        <span><b>Find our doctors' availability or make appointments online</b></span><br/>
        <Button color='primary' variant="contained" onClick={() => navigate("/appointment-browser")}>Book Online</Button>
        <br/><br/>
        <span><b>In the event of emergency</b> call 000 or or visit your nearest emergency department in Ryde, Hornsby or Westmead hospitals.</span>
        <br/><br/>
        <span><b>After Hours Care (Home Visits)</b> 137425 (13SICK)</span><br/>
        <Button color='primary' variant="contained" href="https://homedoctor.com.au/">Learn more</Button>
        <br/><br/>
        <span><b>After Hours GP Helpline</b> 1800022222</span><br/>
        <Button color='primary' variant="contained" href="https://www.healthdirect.gov.au/after-hours-gp-helpline">Learn more</Button>
      </Content>
    </Layout>
  )
}

export default LocationContact