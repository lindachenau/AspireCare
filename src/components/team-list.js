import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MemberCard from './member-card'
import { MDBRow } from 'mdbreact'
import kai from "../images/kai.jpg"
import linda from "../images/linda.jpg"
import dennis from "../images/dennis.jpg"
import mich from "../images/mich.jpg"
import angela from "../images/angela.jpg"
import melody from "../images/melody.jpg"
import yvonne from "../images/yvonne.jpg"
import james from "../images/james.jpg"
import carol from "../images/carol.jpg"

const avatars = {
  "kai": kai,
  "linda": linda,
  "dennis": dennis,
  "mich": mich,
  "angela": angela,
  "melody": melody,
  "yvonne": yvonne,
  "james": james,
  "carol": carol
}

const TeamList = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: {fields: [frontmatter___sequence], order: ASC}, filter: {fileAbsolutePath: {regex: "/(team)/"}}) {
        edges {
          node {
            id
            frontmatter {
              sequence
              title
              role
              job
              image
              school
              qualification1
              qualification2
              languages
              availability
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
          <MemberCard key={node.id}
            title={node.frontmatter.title}
            role={node.frontmatter.role}
            job={node.frontmatter.job}
            image={avatars[node.frontmatter.image]}
            school={node.frontmatter.school}
            qualification1={node.frontmatter.qualification1}
            qualification2={node.frontmatter.qualification2}
            languages={node.frontmatter.languages}
            availability={node.frontmatter.availability}
            bio={node.html} />
        ))}
      </MDBRow>
    </div>
  )
}

export default TeamList
