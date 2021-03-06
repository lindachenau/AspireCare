import { useStaticQuery, graphql } from "gatsby"
export const useAppointmentProfiles = () => {
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
            frontmatter: {role: {regex: "/(appointment)/"}}, 
            fileAbsolutePath: {regex: "/(team)/"}
          }) {
          edges {
            node {
              frontmatter {
                bpid
                title
                job
                consultationGroup
                terms
                emailConfirmation
                image {
                  id
                }
              }
            }
          }
        }
        allFile(
          filter: {extension: {regex: "/(jpeg|jpg|png)/"}, sourceInstanceName: {eq: "team"}}
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