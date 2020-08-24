import React from 'react'
import NumberFormat from 'react-number-format'
import Button from '@material-ui/core/Button'
import { AuthForm, Email, } from './auth-forms'
import { navigate } from 'gatsby'
import {
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js'

const initialState = {
  email: '',
  phone_number: '',
  auth_code: '',
  error: '',
  loading: false,
}

class UpdateUser extends React.Component {
  state = initialState

  handleUpdate = event => {
    if (event.target.name === 'email') {
      this.setState({
        [event.target.name]: event.target.value,
        error: '',
      })
    }
    if (event.target.name === 'phone_number') {
      this.setState({
        [event.target.name]: event.target.value.replace(/\D/g, ''),
        error: '',
      })
    }
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    })
  }
 
  // updateAttributes = async e => {
  //   e.preventDefault()
  //   const { email, phone_number } = this.state
  //   this.setState({ loading: true })
  
  //   let user = await Auth.currentAuthenticatedUser()
  //   user.Session = user.signInUserSession
  //   console.log(user)
  //   await Auth.updateUserAttributes({
  //     user, 
  //     attributes: { email, phone_number },
  //   })
  //   this.setState({ stage: 1, loading: false }) 
  // }

  updateAttributes = async e => {
    e.preventDefault()
    const { email, phone_number } = this.state
    this.setState({ loading: true })

    const poolData = {
      UserPoolId: 'ap-southeast-2_vSlGDgdH9',
      ClientId: '6emoisvvj2gnmhiauoqgneirnq', 
    }
  
    const userPool = new CognitoUserPool(poolData)
    // const username = getAppUser().username
    // const userData = {
    //   Username: username,
    //   Pool: userPool,
    // }
    
    // const cognitoUser = new CognitoUser(userData)
    
    // const authenticationData = {
    //   Username: username,
    //   Password: 'Dennis26',
    // }
    // const authenticationDetails = new AuthenticationDetails(
    //   authenticationData
    // )

    // await cognitoUser.authenticateUser(authenticationDetails, {
    //   onSuccess: function(result) {
    //     const accessToken = result.getAccessToken().getJwtToken()
    //     AWS.config.region = 'ap-southeast-2'
    //     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //       IdentityPoolId: 'ap-southeast-2:ed0ebfe4-0a37-47f7-8dc1-ba8eec16e65a', // your identity pool id here
    //       Logins: {
    //         // Change the key below according to the specific region your user pool is in.
    //         'cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_vSlGDgdH9': result
    //           .getIdToken()
    //           .getJwtToken(),
    //       },
    //     })
  
    //     //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
    //     AWS.config.credentials.refresh(error => {
    //       if (error) {
    //         console.error(error)
    //       } else {
    //         console.log('Successfully logged!')
    //       }
    //     })
    //   },
  
    //   onFailure: function(err) {
    //     alert('authentication error', err.message || JSON.stringify(err));
    //   },
    // })
  
    const authenticatedUser = await userPool.getCurrentUser()

    if (authenticatedUser != null) {
      authenticatedUser.getSession(function(err, session) {
        if (err) {
          alert(err)
          return
        }
        console.log('session validity: ' + session.isValid())
        let attributeList = []
    
        const attribute = new CognitoUserAttribute({
          Name: 'phone_number',
          Value: phone_number,
        })
        
        attributeList.push(attribute)   
    
        authenticatedUser.updateAttributes(attributeList, function(err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err))
            return
          }
          console.log('call result: ' + result)
        })
      })
    }

    this.setState({ loading: false })
    alert('Updates successful')
    navigate('/')
  }  

  render() {
    return (
      <AuthForm title="Update user account" error={this.state.error}>
        <Email
          handleUpdate={this.handleUpdate}
          email={this.state.email}
          autoComplete="off"
        />
        <div className="form-group">
          <NumberFormat
            placeholder="+61 4## ### ###"
            onChange={this.handleUpdate}
            name="phone_number"
            value={this.state.phone_number}
            type="tel"
            className="form-control"
            format="+614########"
            mask="_"
          />
        </div>
        <Button
          onClick={e => this.updateAttributes(e)}
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          disabled={this.state.loading}
        >
          {this.state.loading ? null : 'Update Account'}
          {this.state.loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </AuthForm>
    )
  }
}

export default UpdateUser
