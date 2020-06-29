import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Content from '../components/content'

export default ({ data }) => {
   const post = data.markdownRemark

   return (
      <Layout>
        <Content title={post.frontmatter.title}>
          <div style={{ 
            width: '100%', 
            height: '200px', 
            backgroundImage: `Url(https://source.unsplash.com/960x200/?${post.frontmatter.keywords})`, 
            backgroundSize: 'cover', 
            backgroundPosition: '50% 0',
            backgroundRepeat: 'no-repeat', 
            marginBottom: '30px' }}>
          </div>
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
        keywords
      }
    }
  }
`