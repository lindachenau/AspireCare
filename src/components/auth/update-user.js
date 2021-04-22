import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import Paper from '@material-ui/core/Paper' 
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { AuthForm, Email, Password, TextInput, ConfirmationCode } from './auth-forms'
import { getUser } from './app-user'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import {
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    maxWidth: 600,
    padding: 30,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}))

const UpdateUser = () => {
  const userInfo = getUser()
  const [email, setEmail] = useState(userInfo.email)
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phone_number)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [firstname, setFirstname] = useState(userInfo.given_name)
  const [surname, setSurname] = useState(userInfo.family_name)
  const [authCode, setAuthCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState(0)
  const [updateItem, setUpdateItem] = useState('password')
  const [error, setError] = useState('')
  const classes = useStyles()

  useEffect(() => {
    setError('')
  }, [phoneNumber, oldPassword, newPassword, updateItem])
 
  // Calling Auth.updateUserAttributes will stop graphql from working. Only removing API and adding it back can get graphql working again.
  // updateAttributes = async e => {
  //   e.preventDefault()
  //   const { email, phoneNumber } = this.state
  //   this.setState({ loading: true })
  
  //   let user = await Auth.currentAuthenticatedUser()
  //   user.Session = user.signInUserSession
  //   console.log(user)
  //   await Auth.updateUserAttributes({
  //     user, 
  //     attributes: { email, phoneNumber },
  //   })
  //   this.setState({ stage: 1, loading: false }) 
  // }

  const updateAttributes = async e => {
    e.preventDefault()
    setLoading(true)

    try {
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
            setError(err.message)
            return
          }
          // console.log('session validity: ' + session.isValid())
          let attributeList = []
      
          const phone = phoneNumber.replace(/ /g, "")
          let attribute = new CognitoUserAttribute({
            Name: 'phone_number',
            Value: phone,
          })
          attributeList.push(attribute)

          attribute = new CognitoUserAttribute({
            Name: 'email',
            Value: email,
          })
          attributeList.push(attribute)

          attribute = new CognitoUserAttribute({
            Name: 'given_name',
            Value: firstname,
          })
          attributeList.push(attribute)

          attribute = new CognitoUserAttribute({
            Name: 'family_name',
            Value: surname,
          })
          attributeList.push(attribute)
          
          authenticatedUser.updateAttributes(attributeList, function(err, result) {
            if (err) {
              setLoading(false)
              setError(err.message || JSON.stringify(err))
              return
            }
            setLoading(false)

            // email has changed. Verify it.
            if (email !== userInfo.email) {
              setStage(1)
            } else {
              alert('Account update successful')
              navigate('/')
            }
          })
        })
      }
    } catch (err) {
      setError(err.message || JSON.stringify(err))
      setLoading(false)
      console.log('error...: ', err)
    }
  }  

  const confirmEmail = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const cognitoUser = await Auth.currentAuthenticatedUser()    
      cognitoUser.verifyAttribute('email', authCode, function(err, result) {
        setLoading(false)
        if (err) {
          setError(err.message || JSON.stringify(err))
          return
        }
      })
      alert('Account update successful')
      navigate('/')
    } catch (err) {
      setError(err.message || JSON.stringify(err))
      setLoading(false)
      console.log('error...: ', err)
    }
  }

  const updatePassword = async e => {
    e.preventDefault()
    setLoading(true)

    try {
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
          // console.log('session validity: ' + session.isValid())

          if (oldPassword && newPassword)
      
          authenticatedUser.changePassword(oldPassword, newPassword, function(err, result) {
            if (err) {
              setLoading(false)
              setError(err.message)
              return
            }
            // console.log('call result: ' + result)
            setLoading(false)
            alert('Password update successful')
            navigate('/')
          })
        })
      }
    }
    catch (err) {
      setError(err.message || JSON.stringify(err))
      setLoading(false)
      console.log('error...: ', err)
    }
  }  

  return (
    <Paper className={classes.root} elevation={3}>
      <FormControl component="fieldset">
        <RadioGroup 
          row
          aria-label="login-details" 
          name="login-details" 
          value={updateItem} 
          onChange={(event) => setUpdateItem(event.target.value)}
        >
          <FormControlLabel value="email" control={<Radio />} label="Update other attributes" />
          <FormControlLabel value="password" control={<Radio />} label="Update password" />
        </RadioGroup>
      </FormControl>
      {updateItem === 'email' && stage === 0 &&
      <AuthForm instruction="Edit the attributes you'd like to change and click UPDATE" error={error}>
        <Email
          handleUpdate={(event) => setEmail(event.target.value)}
          email={email}
          autoComplete="new-password"
          placeholder="new email"
        />
        <div className="form-group">
          <NumberFormat
            placeholder="+614########"
            onChange={(event) => setPhoneNumber(event.target.value)}
            name="phoneNumber"
            value={phoneNumber}
            type="tel"
            className="form-control"
            format="+614########"
            mask="_"
          />
        </div>
        <TextInput
          handleUpdate={(event) => setFirstname(event.target.value)}
          textInput={firstname}
          autoComplete="firstname"
          placeholder="firstname"
        />
        <TextInput
          handleUpdate={(event) => setSurname(event.target.value)}
          textInput={surname}
          autoComplete="surname"
          placeholder="surname"
        />
        <Button
          onClick={updateAttributes}
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          disabled={loading}
        >
          {loading ? null : 'Update'}
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </AuthForm>}
      {updateItem === 'email' && stage === 1 &&
      <AuthForm 
        instruction= "Enter the verification code sent to your new email and click CONFIRM"
        error={error}
      >
        <Email
          handleUpdate={null}
          disabled
          email={email}
          autoComplete="new-password"
          placeholder="new email"
        />
        <ConfirmationCode
          handleUpdate={(event) => setAuthCode(event.target.value.trim())}
          authCode={authCode}
          autoComplete="off"
        />
        <Button
          onClick={confirmEmail}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={loading}
        >        
          {loading ? null : 'Confirm'}
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </AuthForm>}
      {updateItem === 'password' && 
      <AuthForm instruction="Password requires at least 8 characters with letters and numbers" error={error}>
        <Password
          required  
          handleUpdate={(event) => setOldPassword(event.target.value)}
          password={oldPassword}
          autoComplete="new-password"
          name="oldPassword"
          placeholder="old password"
          id="old_password"
        />
        <Password
          required
          handleUpdate={(event) => setNewPassword(event.target.value)}
          password={newPassword}
          autoComplete="new-password"
          name="newPassword"
          placeholder="new password"
          id="new_password"
        />
        <Button
          onClick={updatePassword}
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          disabled={loading}
        >
          {loading ? null : 'Update'}
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>          
      </AuthForm>}
    </Paper>
  )
}

export default UpdateUser
