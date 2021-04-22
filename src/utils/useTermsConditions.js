import { useStaticQuery, graphql } from "gatsby"
export const useTermsConditions = () => {
  // Prepare terams nd conditions template from markdown files
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: {
            fileAbsolutePath: {regex: "/(terms-and-conditions)/"}
          }) {
          edges {
            node {
              frontmatter {
                terms
              }
              html
            }
          }
        }
      }`)

  return { allMarkdownRemark }
}