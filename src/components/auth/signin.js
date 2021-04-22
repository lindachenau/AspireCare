import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import { setUser, logout, getUser as getAppUser } from './app-user'
import { AuthForm, Email, Password, CustomAction, ConfirmationCode } from './auth-forms'
import NumberFormat from 'react-number-format'
import Button from '@material-ui/core/Button'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser }  from '../../graphql/queries'
import { createUser }  from '../../graphql/mutations'
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [stage, setStage] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let cognitoUser = null

  useEffect(() => {
    setError('')
  }, [email, password, phoneNumber])  

  const addUser = async username => {
    let existingUser

    try {
      existingUser = await API.graphql(graphqlOperation(getUser, {id: username}))
    } catch (err) {
      console.log('Amplify getUser error...: ', err)
      return
    }
    
    if (!existingUser.data.getUser) {
      try {
        await API.graphql(graphqlOperation(createUser, {
          input: {
            id: username
          }
        }))

      } catch (err) {
        setError(err.message || JSON.stringify(err))
        setLoading(false)
        console.log('Amplify createUser error...: ', err)
        return        
      }
    }
  }

  const checkPhoneVerification = (cognitoUser) => {
    return new Promise((resolve, reject) => {
      cognitoUser.getUserAttributes(function(err, result) {
        if (err) {
          reject({error: err.message || JSON.stringify(err)})
        }

        let phoneVerified = false
        for (let i = 0; i < result.length; i++) {
          // phone_number_verified returns correct value here
          if (result[i].getName() === 'phone_number_verified') {
            phoneVerified = result[i].getValue()
          }
        }
        resolve({verified: phoneVerified})
      })
    })
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      await Auth.signIn(email, password)
      cognitoUser = await Auth.currentAuthenticatedUser()

      // phone_number_verified always returns false even though it shows true in console
      const userInfo = {
        ...cognitoUser.attributes,
        username: cognitoUser.username
      } 

      setUser(userInfo)
      addUser(cognitoUser.username)      

      const result = await checkPhoneVerification(cognitoUser)
      setLoading(false)
      if (result.error) {
        setError(result.error)
      } else if (result.verified === "false") {
        // Verify phone number flow
        setPhoneNumber(userInfo.phone_number)
        setStage(1)
      } else {
        navigate('/my-account')
      }
    } catch (err) {
      setError(err.message || JSON.stringify(err))
      setLoading(false)
      console.log('error...: ', err)
    }
  }

  const updatePhoneNumber = async () => {
    let attributeList = []
    const phone = phoneNumber.replace(/ /g, "")
    const attribute = new CognitoUserAttribute({
      Name: 'phone_number',
      Value: phone,
    })
    attributeList.push(attribute)

    const poolData = {
      UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID,
      ClientId: process.env.GATSBY_COGNITO_CLIENT_ID, 
    }
  
    const userPool = new CognitoUserPool(poolData)
    const authenticatedUser = await userPool.getCurrentUser()
    if (authenticatedUser != null) {
      authenticatedUser.getSession(function(err, session) {
        if (err) {
          setLoading(false)
          setError(err.message || JSON.stringify(err))
          return
        }             

        authenticatedUser.updateAttributes(attributeList, function(err, result) {
          if (err) {
            setLoading(false)
            setError(err.message || JSON.stringify(err))
            return
          }
        })
      })

      // sign out and sign back in so that the updated phone number will be reflected in the authenticatedUser info
      logout()
      const user = await Auth.signIn(email, password)
      const userInfo = {
        ...user.attributes,
        username: user.username
      } 

      setUser(userInfo)
      addUser(user.username)      
    }
  }

  const confirmPhoneNumber = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      if (stage === 1) {
        // User updated phone number on UI
        if (phoneNumber !== getAppUser().phone_number) {
          await updatePhoneNumber()
        }

        cognitoUser = await Auth.currentAuthenticatedUser()

        cognitoUser.getAttributeVerificationCode('phone_number', {
          onSuccess: () => {console.log('Code sent')},
          onFailure: function(err) {
            setError(err.message || JSON.stringify(err))
          },
          inputVerificationCode: null
        })   
        setStage(2)
        setLoading(false)
      } else {
        cognitoUser = await Auth.currentAuthenticatedUser()
        cognitoUser.verifyAttribute('phone_number', authCode, function(err, result) {
          setLoading(false)
          if (err) {
            setError(err.message || JSON.stringify(err))
            return
          }
        })
        alert('Phone number was verified successfully')
        navigate('/my-account')
      }
    } catch (err) {
      setError(err.message || JSON.stringify(err))
      setLoading(false)
      console.log('error confirming phone number...', err)
    }
  }

  return (
    <>
      {stage === 0 && 
      <AuthForm title="Sign in to your account" error={error}>
        <Email
          handleUpdate={(event) => setEmail(event.target.value.trim())}
          email={email}
          autoComplete="on"
        />
        <Password
          handleUpdate={(event) => setPassword(event.target.value.trim())}
          password={password}
          autoComplete="on"
        />
        <CustomAction
          padding={10}
          question="Forgot your password?"
          action="Reset password"
          cb={() => navigate("/reset-password")}
        />
        <Button
          onClick={login}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? null : 'Sign In'}
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
        <CustomAction
          padding={10}
          question="No account?"
          action="Create account"
          cb={() => navigate("/signup")}
        />        
      </AuthForm>}
      {stage !== 0 && 
      <AuthForm 
        title="Verify your phone number" 
        instruction= {stage === 1 ? 
          "Check your phone number and click SEND CODE to receive a verification code on your phone"
          :
          "Enter the verification code and click CONFIRM"}
        error={error}
      >
        <NumberFormat
          disabled={stage === 2}
          placeholder="+614xxxxxxxx*"
          onChange={(event) => setPhoneNumber(event.target.value.trim())}
          name="phone_number"
          value={phoneNumber}
          type="tel"
          className="form-control"
          format="+614########"
          mask="_"
        />        
        <ConfirmationCode
          handleUpdate={(event) => setAuthCode(event.target.value.trim())}
          authCode={authCode}
          autoComplete="off"
        />
        <Button
          onClick={confirmPhoneNumber}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={loading}
        >        
          {loading ? null : (stage === 1 ? 'Send Code' : 'Confirm')}
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </AuthForm>}
    </>
  )
}

export default SignIn
