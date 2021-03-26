import { useStaticQuery, graphql } from "gatsby"
export const useTeamProfiles = () => {
  // Prepare team info from their markdown files and use gatsby-image to optimise their avatar profile
  const { allMarkdownRemark, allFile } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: {fields: [frontmatter___sequence], order: ASC}, filter: {fileAbsolutePath: {regex: "/(team)/"}}) {
          edges {
            node {
              id
              frontmatter {
                title
                role
                job
                image {
                  id
                }
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
        allFile(
          filter: {extension: {regex: "/(jpeg|jpg|png)/"}, sourceInstanceName: {eq: "team"}}
        ) {
          nodes {
            id
            childImageSharp {
              fluid (maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }`)

  return { allMarkdownRemark, allFile }
}