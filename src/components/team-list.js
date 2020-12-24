import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MemberCard from './member-card'
import { MDBRow } from 'mdbreact'

const avatars = {
  "kai": require("../images/kai.jpg"),
  "linda": require("../images/linda.jpg"),
  "dennis": require("../images/dennis.jpg"),
  "mich": require("../images/mich.jpg"),
  "angela": require("../images/angela.jpg"),
  "melody": require("../images/melody.jpg"),
  "yvonne": require("../images/yvonne.jpg"),
  "james": require("../images/james.jpg"),
  "carol": require("../images/carol.jpg")
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
