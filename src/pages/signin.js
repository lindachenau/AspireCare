import React from 'react'
import Layout from '../components/layout'

import SignIn from '../components/signin'
import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

const PageSignIn = () => (
  <Layout>
    <SignIn/>
  </Layout>
)

export default PageSignIn