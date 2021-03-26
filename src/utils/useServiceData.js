import { useStaticQuery, graphql } from "gatsby"
export const useServiceData = () => {
  // Prepare doctor info from their markdown files and use gatsby-image to optimise their avatar profile
  const { allMarkdownRemark, allFile } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          sort: {
            fields: [frontmatter___sequence], 
            order: ASC
          }, 
          filter: {
            fileAbsolutePath: {regex: "/(services)/"}
          }) {
          edges {
            node {
              frontmatter {
                sequence
                title
                link
                description
                cardimage {
                  id
                }
              }
            }
          }
        }
        allFile(
          filter: {extension: {regex: "/(jpeg|jpg|png)/"}, sourceInstanceName: {eq: "services"}}
        ) {
          nodes {
            id
            childImageSharp {
              fluid (maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }`)

  return { allMarkdownRemark, allFile }
}