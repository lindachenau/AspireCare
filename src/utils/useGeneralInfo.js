import { useStaticQuery, graphql } from "gatsby"
export const useGeneralInfo = () => {
  const { allMarkdownRemark, allFile } = useStaticQuery(
    graphql`
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
                image {
                  id
                }
              }
              html
            }
          }
        }
        allFile(
          filter: {extension: {regex: "/(jpeg|jpg|png)/"}, sourceInstanceName: {eq: "general-information"}}
        ) {
          nodes {
            id
            childImageSharp {
              fluid (maxWidth: 120) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }`)

  return { allMarkdownRemark, allFile }
}
