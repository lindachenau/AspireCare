import React from 'react'
import { MDBContainer, MDBBtn, MDBIcon, MDBRow, MDBCol } from "mdbreact"
import "./layout.css"

const Intro = ({ children }) => {
  return (
    <MDBContainer style={{marginTop: "25vh", marginBottom: "50vh"}}>
      <MDBRow >
        <MDBCol md="12" className="black-text text-center">
          <h2 className="h1-responsive font-weight-bold mb-0 pt-md-5 pt-5">Medicine with Commitment, Compassion, and Care.</h2>
          <hr className="hr-dark my-4 w-90" />
          <h4 className="subtext-header h4-responsive mt-2 mb-4">
            Together, we are working toward a healthier community.
          </h4>
          <MDBBtn className="button-primary" floating="true" href="#why-us"><MDBIcon icon="home" className="mr-2" /> Visit us</MDBBtn>                 
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Intro
