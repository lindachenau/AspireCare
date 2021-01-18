import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import InfoCard from './info-card'
import { MDBRow } from 'mdbreact'

const avatars = {
  "Booking Consultations": require("../images/booking-consultations.jpg"),
  "Communication Assistance": require("../images/communication-assistance.jpg"),
  "Consultation Fees and Billing": require("../images/consultation-fees.jpg"),
  "Cancellation": require("../images/cancellation.jpg"),
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
