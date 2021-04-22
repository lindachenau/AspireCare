import { useStaticQuery, graphql } from "gatsby"
export const useEmailConfirmation = () => {
  // Prepare email confirmation template from markdown files
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: {
            fileAbsolutePath: {regex: "/(email-templates)/"}
          }) {
          edges {
            node {
              frontmatter {
                emailConfirmation
              }
              html
            }
          }
        }
      }`)

  return { allMarkdownRemark }
}