import React from 'react'
import Layout from '../components/layout'

import Reset from '../components/reset'
import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

export default () => (
  <Layout>
    <Reset/>
  </Layout>
)