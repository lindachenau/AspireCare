const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')
const pagesToGenerate = [
   '/dietitians/',
   '/general-medicine/',
   '/pathology/',
   '/physiotherapy/',
   '/open-hours/',
   '/privacy-policy/'
]

exports.onCreateNode = ({ node, getNode, actions }) => {
   console.log(`*** I am processing a node with type: ${node.internal.type}`)
   if (node.internal.type === 'MarkdownRemark') {
      const { createNodeField } = actions
      const slug = createFilePath({ node, getNode, basePath: 'markdown' })
      createNodeField({
         node,
         name: 'slug',
         value: slug,
      })
   }
}

// Create post pages programmatically
exports.createPages = async ({ graphql, actions }) => {
   const { createPage } = actions

   await graphql(`
      {
         allMarkdownRemark {
            edges {
               node {
                  fields {
                     slug
                  }
               }
            }
         }
      }
   `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
         const slug = node.fields.slug
         if (pagesToGenerate.includes(slug)) {
            createPage({
               path: node.fields.slug,
               component: path.resolve('./src/templates/post.js'),
               context: {
                  slug: node.fields.slug
               },
            })
         }
      })
   })
}