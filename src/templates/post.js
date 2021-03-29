import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Content from '../components/content'

export default function Post ({ data }) {
  const post = data.markdownRemark
  const bgImgs = {}
  data.allFile.nodes.forEach(({id, childImageSharp}) => {
    bgImgs[id] = {
      fluid: childImageSharp.fluid
    }
  })

  return (
    <Layout>
      <Content titleImg={bgImgs[post.frontmatter.image.id].fluid.src} title={post.frontmatter.title}>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Content>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        image {
          id
        }
      }
    }
    allFile(
      filter: {extension: {regex: "/(jpeg|jpg|png)/"}}
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
  }`