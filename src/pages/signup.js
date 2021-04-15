import React from 'react'
import Layout from '../components/layout'
import SignUp from '../components/auth/signup'
//Need Amplify configuration here in case user navigate here directly.
import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

const PageSignUp = () => (
  <Layout>
    <SignUp/>
  </Layout>
)

export default PageSignUp