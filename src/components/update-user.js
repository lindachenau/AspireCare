import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import Paper from '@material-ui/core/Paper' 
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Email, Password} from './auth-forms'
import { navigate } from 'gatsby'
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
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [updateItem, setUpdateItem] = useState('password')
  const classes = useStyles()
 
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

    const poolData = {
      UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID,
      ClientId: process.env.GATSBY_COGNITO_CLIENT_ID, 
    }
  
    const userPool = new CognitoUserPool(poolData)
    
    const authenticatedUser = await userPool.getCurrentUser()

    if (authenticatedUser != null) {
      authenticatedUser.getSession(function(err, session) {
        if (err) {
          setError(err)
          setLoading(false)
          alert(error)
          return
        }
        console.log('session validity: ' + session.isValid())
        let attributeList = []
    
        if (phoneNumber) {
          const attribute = new CognitoUserAttribute({
            Name: 'phoneNumber',
            Value: phoneNumber,
          })
          attributeList.push(attribute)
        }

        if (email) {
          const attribute = new CognitoUserAttribute({
            Name: 'email',
            Value: email,
          })
          attributeList.push(attribute)
        }        
    
        authenticatedUser.updateAttributes(attributeList, function(err, result) {
          if (err) {
            setError(err)
            setLoading(false)
            alert(error)
            return
          }
          console.log('call result: ' + result)
        })
      })
    }

    setLoading(false)
    alert('Account update successful')
    navigate('/')
  }  

  const updatePassword = async e => {
    e.preventDefault()
    setLoading(true)

    const poolData = {
      UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID,
      ClientId: process.env.GATSBY_COGNITO_CLIENT_ID, 
    }
  
    const userPool = new CognitoUserPool(poolData)
    
    const authenticatedUser = await userPool.getCurrentUser()

    if (authenticatedUser != null) {
      authenticatedUser.getSession(function(err, session) {
        if (err) {
          setError(err)
          setLoading(false)
          alert(error)
          return
        }
        console.log('session validity: ' + session.isValid())

        if (oldPassword && newPassword)
    
        authenticatedUser.changePassword(oldPassword, newPassword, function(err, result) {
          if (err) {
            setError(err)
            setLoading(false)
            alert(error)
            return
          }
          console.log('call result: ' + result)
        })
      })
    }

    setLoading(false)
    alert('Password update successful')
    navigate('/')
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
          <FormControlLabel value="email" control={<Radio />} label="Update email & phone" />
          <FormControlLabel value="password" control={<Radio />} label="Update password" />
        </RadioGroup>
      </FormControl>
      {updateItem === 'email' &&    
      <Container maxWidth="xs" className="dark-grey-text">
        <Email
          handleUpdate={(event) => setEmail(event.target.value)}
          email={email}
          autoComplete="new-password"
          placeholder="new email"
        />
        <div className="form-group">
          <NumberFormat
            placeholder="+61 4## ### ###"
            onChange={(event) => setPhoneNumber(event.target.value)}
            name="phoneNumber"
            value={phoneNumber}
            type="tel"
            className="form-control"
            format="+614########"
            mask="_"
          />
        </div>
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
      </Container>}
      {updateItem === 'password' && 
      <Container maxWidth="xs" className="dark-grey-text">
        <Password
            handleUpdate={(event) => setOldPassword(event.target.value)}
            password={oldPassword}
            autoComplete="new-password"
            name="oldPassword"
            placeholder="old password"
            id="old_password"
        />
        <Password
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
      </Container>}
    </Paper>
  )
}

export default UpdateUser
