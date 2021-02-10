import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import InfoCard from './info-card'
import { MDBRow } from 'mdbreact'
import img1 from "../images/booking-consultations.jpg"
import img2 from "../images/communication-assistance.jpg"
import img3 from "../images/consultation-fees.jpg"
import img4 from "../images/cancellation.jpg"

const avatars = {
  "Booking Consultations": img1,
  "Communication Assistance": img2,
  "Consultation Fees and Billing": img3,
  "Cancellation": img4
}

const InfoList = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: {fields: [frontmatter___sequence], order: ASC}, filter: {fileAbsolutePath: {regex: "/(general-information)/"}}) {
        edges {
          node {
            id
            frontmatter {
              sequence
              title
              group
              overview
            }
            html
          }
        }
      }
    }`)

  return (
    <div>
      <MDBRow className="m-0" center>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <InfoCard key={node.id}
            title={node.frontmatter.title}
            group={node.frontmatter.group}
            image={avatars[node.frontmatter.title]}
            overview={node.frontmatter.overview}
            details={node.html} />
        ))}
      </MDBRow>
    </div>
  )
}

export default InfoList
