import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Content from '../components/content'

export default ({ data }) => {
  const post = data.markdownRemark
  const titleImg = require(`../images/${post.frontmatter.image}`)

  return (
    <Layout>
      <Content titleImg={titleImg} title={post.frontmatter.title}>
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
        image
      }
    }
  }
`