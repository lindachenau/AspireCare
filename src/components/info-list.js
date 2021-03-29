import React from 'react'
import InfoCard from './info-card'
import { MDBRow } from 'mdbreact'
import { useGeneralInfo } from '../utils/useGeneralInfo'

const InfoList = () => {
  const { allMarkdownRemark, allFile } = useGeneralInfo()
  const avatars = {}
  allFile.nodes.forEach(({id, childImageSharp}) => {
    avatars[id] = {
      fluid: childImageSharp.fluid
    }
  })

  return (
    <div>
      <MDBRow className="m-0" center>
        {allMarkdownRemark.edges.map(({ node }) => (
          <InfoCard key={node.id}
            title={node.frontmatter.title}
            group={node.frontmatter.group}
            image={avatars[node.frontmatter.image.id].fluid.src}
            overview={node.frontmatter.overview}
            details={node.html} />
        ))}
      </MDBRow>
    </div>
  )
}

export default InfoList
