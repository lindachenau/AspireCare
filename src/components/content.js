import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"

const Content = ({ titleImg, title, titleColor="white", tagline='', children }) => {
  return (
    <>
      <div style={{ 
        width: '100%', 
        height: '250px', 
        backgroundImage: `Url(${titleImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: '50% 0',
        backgroundRepeat: 'no-repeat'}}>
        <MDBContainer maxWidth="md" style={{paddingTop: "5vh"}}>
          <MDBRow >
            <MDBCol md="12" className="text-left">
              <h1 className={`h1-responsive font-weight-bold pt-3 ${titleColor}-text`} >{title}</h1>
              {tagline &&
              <h4 className={`h4-responsive font-weight-bold ${titleColor}-text`} >{tagline}</h4>}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>     
      <MDBContainer maxWidth="md" style={{paddingTop: "5vh", paddingBottom: "10vh"}}>
        <MDBRow >
          <MDBCol md="12" className="dark-grey-text text-left">
            {children}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default Content