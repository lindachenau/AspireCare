import React from 'react'
import MemberCard from './member-card'
import { MDBRow } from 'mdbreact'
import { useTeamProfiles } from '../utils/useTeamProfiles'

const TeamList = () => {
  const { allMarkdownRemark, allFile } = useTeamProfiles()

  /*
  * When placing markdown and image files in the same directory, gatsby-transformer-remark and gatsby-transformer-sharp
  * replace image field in frontmatter with an id in allFile nodes.
  */
  const teamProfilePhotos = {}
  allFile.nodes.forEach(({id, childImageSharp}) => {
    teamProfilePhotos[id] = {
      fluid: childImageSharp.fluid
    }
  })

  return (
    <div>
      <MDBRow className="m-0" center>
        {allMarkdownRemark.edges.map(({ node }) => (
          <MemberCard key={node.id}
            title={node.frontmatter.title}
            role={node.frontmatter.role}
            avatar={node.frontmatter.avatar}
            job={node.frontmatter.job}
            image={teamProfilePhotos[node.frontmatter.image.id]}
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
