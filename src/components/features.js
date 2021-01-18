import React from "react";
import { MDBRow, MDBCol, MDBIcon, MDBContainer } from "mdbreact";

const Features = () => {
  return (
  <MDBContainer tag="section" className="text-center my-5">
    <h2 className="h1-responsive font-weight-bold my-5" id="why-us">
      Welcome to Aspire Medical Centre Eastwood
    </h2>
    <p className="lead w-responsive mx-auto mb-5">
      We are a modern fully accredited medical centre focused on putting patients first. Our experienced 
      team of female and male doctors are passionately committed to delivering the highest standard of service and 
      offer a range of specialties that allows us to provide comprehensive, life-long care for patients young and old. 
      <br/><br/>
      Centrally located in Eastwood shopping district opposite to Eastwood Landmark Hotel, we are minutes away from 
      Eastwood Train Station and street parking is available just in front of our medical centre. 
    </p>
    <MDBRow>
      <MDBCol md="4">
        <MDBIcon icon="medkit" size="3x" className="red-text" />
        <h5 className="font-weight-bold my-4">A true devotion to healing.</h5>
        <p className="mb-md-0 mb-5">
          Where Healing, Teaching & Discovery Come Together.
        </p>
      </MDBCol>
        <MDBCol md="4">
          <MDBIcon icon="comments" size="3x" className="cyan-text" />
          <h5 className="font-weight-bold my-4">The human dimension in medicine.</h5>
          <p className="mb-md-0 mb-5">
            Putting the Person Into Personalised Medicine.
          </p>
        </MDBCol>
        <MDBCol md="4">
          <MDBIcon icon="hands" size="3x" className="orange-text" />
          <h5 className="font-weight-bold my-4">Inspiring better health.</h5>
          <p className="mb-md-0 mb-5">
            Eat well, stay active mentally and physically.
          </p>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  );
}

export default Features;
