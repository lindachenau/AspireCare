import React from 'react'
import Layout from '../components/layout'
import SignUp from '../components/signup'
import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

const PageSignUp = () => (
  <Layout>
    <SignUp/>
  </Layout>
)

export default PageSignUp