import React, { useState } from "react"
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact"
import { Link } from 'gatsby'
import './footer.css'
import ContactForm from './contact-form'

const Footer = () => {
  const [triggerContact, setTriggerContact] = useState(false)

  return (
    <MDBFooter className="font-small pt-0 dark-grey-text">
      <MDBContainer>
        <MDBRow className="pt-5 mb-0 text-center d-flex justify-content-center">
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
              <Link to='/' className="dark-grey-text">Home</Link>
            </h6>
          </MDBCol>
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
              <Link to='/our-team' className="dark-grey-text">Our team</Link>
            </h6>
          </MDBCol>
          <MDBCol md="2" className="b-3">
            <a onClick={() => setTriggerContact(!triggerContact)}>
              <h6 className="title font-weight-bold">Contact us</h6>
            </a>
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex text-left justify-content-center mb-md-0 mb-4">
          <MDBCol md="8" sm="12" className="mt-4">
            <blockquote className="blockquote blockquote-custom p-3 shadow rounded">
              <div className="blockquote-custom-icon button-primary"><i className="fa fa-quote-left white-text"></i></div>
              <p className="mb-0 mt-0 font-italic">
                “A physician is not angry at the intemperance of a mad patient, nor does he take it ill to be railed 
                at by a man in fever. Just so should a wise man treat all mankind, as a physician does his patient, 
                and look upon them only as sick and extravagant.”
              </p>
              <footer className="blockquote-footer pt-3 mt-2 border-top">Lucius Annaeus Seneca in
                <cite title="Source Title"> BrainyQuote</cite>
              </footer>
            </blockquote>
          </MDBCol>
        </MDBRow>
        <hr className="clearfix d-md-none rgba-black-light" style={{ margin: "10% 15% 5%" }} />
        <MDBRow className="py-3 d-flex justify-content-center">
          <MDBCol md="4" >
            <div className="text-center">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <a href='https://www.google.com/maps/place/2+Hillview+Rd,+Eastwood+NSW+2122/@-33.7904974,151.0815816,15z/data=!4m5!3m4!1s0x6b12a439e4dfcc77:0x3184686087efe006!8m2!3d-33.790906!4d151.0815375' 
                alt="" target='_blank' rel="noreferrer" className="dark-grey-text">
                2 Hillview Rd, Eastwood 2122, NSW
              </a>
            </div>
          </MDBCol>
          <MDBCol md="4" >
            <div className="text-center">
              <i className="fas fa-briefcase mr-2"></i>
              <span>ABN 70 146 472 380</span>
            </div>
          </MDBCol>          
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright dark-grey-text text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright
          <a href="https://digitransform.com.au" alt="" className="dark-grey-text">&nbsp;Aspire Medical Centre Eastwood.&nbsp;</a>
          <span>All Rights Reserved.</span>
        </MDBContainer>
      </div>
      <ContactForm triggerOpen={triggerContact} initOpen={false}/>
    </MDBFooter>
  )
}

export default Footer