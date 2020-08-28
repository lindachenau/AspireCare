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
 
  // Calling Auth.updateUserAttributes will stop graphql from working. Only removing API and adding it back can get graphql working again.
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
      UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID,
      ClientId: process.env.GATSBY_COGNITO_CLIENT_ID, 
    }
  
    const userPool = new CognitoUserPool(poolData)
    
    const authenticatedUser = await userPool.getCurrentUser()

    if (authenticatedUser != null) {
      authenticatedUser.getSession(function(err, session) {
        if (err) {
          alert(err)
          return
        }
        console.log('session validity: ' + session.isValid())
        let attributeList = []
    
        if (phone_number) {
          const attribute = new CognitoUserAttribute({
            Name: 'phone_number',
            Value: phone_number,
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
