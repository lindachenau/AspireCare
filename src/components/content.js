import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"

const Content = ({ title, titleColor="dark-grey", children }) => {
    return (
        <MDBContainer maxWidth="md" style={{paddingTop: "10vh", paddingBottom: "15vh"}}>
            <MDBRow >
                <MDBCol md="12" className="mdb-color-text text-left">
                    <h1 className={`h1-responsive font-weight-bold text-center mb-0 pt-md-5 pt-5 ${titleColor}-text`} >{title}</h1>
                    <hr className="hr-dark my-4 w-80" />
                    {children}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Content