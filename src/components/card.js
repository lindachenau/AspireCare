import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact'
import { navigate } from "gatsby"
import Button from '@material-ui/core/Button'
import Img from 'gatsby-image'

const Card = ({image, title, description, link}) => {
    return (
        <MDBCol style={{ maxWidth: "22rem", minWidth: "300px" }}>
            <MDBCard style={{ marginBottom: "20px" }}>
            <Img className="img-fluid" fluid={image.fluid} alt={title}  waves />
                <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>{description}</MDBCardText>
                    <Button color='primary' variant="contained" onClick={() => navigate(link)}>More</Button>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default Card
