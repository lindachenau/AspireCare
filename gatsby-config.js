require('dotenv').config({ path: ".env.production", });

module.exports = {
  siteMetadata: {
    title: 'Aspire Medical Centre Eastwood Website',
    description: 'Medicine with Commitment, Compassion, and Care.',
    siteUrl: 'https://aspiremedicalcentreeastwood.com.au',
    author: 'Linda Chen',
  },
  plugins: [
    `gatsby-plugin-sass`,
    
    `gatsby-plugin-react-helmet`,
    
    {
      resolve: 'gatsby-source-filesystem',
      options: {
          name: 'services',
          path: `${__dirname}/src/data/services`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
          name: 'team',
          path: `${__dirname}/src/data/team`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
          name: 'our-practice',
          path: `${__dirname}/src/data/our-practice`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
          name: 'general-information',
          path: `${__dirname}/src/data/general-information`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
          name: 'terms-and-conditions',
          path: `${__dirname}/src/data/terms-and-conditions`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
          name: 'email-templates',
          path: `${__dirname}/src/data/email-templates`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
          name: 'images',
          path: `${__dirname}/src/images`,
      },
    },

    `gatsby-transformer-sharp`,

    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aspire Medical Centre Eastwood`,
        short_name: `AMCE`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#00a3c1`,
        display: `standalone`,
        icon: `${__dirname}/src/images/logo-48x48.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
          excerpt_separator: `<!-- end -->`
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
}
