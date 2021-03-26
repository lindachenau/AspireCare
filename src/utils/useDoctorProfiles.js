import { useStaticQuery, graphql } from "gatsby"
export const useDoctorProfiles = () => {
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
            frontmatter: {role: {eq: "doctor"}}, 
            fileAbsolutePath: {regex: "/(team)/"}
          }) {
          edges {
            node {
              frontmatter {
                bpid
                title
                job
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