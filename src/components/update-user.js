import React from 'react'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import NumberFormat from 'react-number-format'
import Button from '@material-ui/core/Button'
import { AuthForm, Email, ConfirmationCode, CustomAction } from './auth-forms'

const initialState = {
  email: '',
  phone_number: '',
  auth_code: '',
  stage: 0,
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

  confirmReset = async e => {
    e.preventDefault()
    const { email, auth_code, password } = this.state
    this.setState({ loading: true })
    Auth.forgotPasswordSubmit(email, auth_code, password)
      .then(data => {
        this.setState({ loading: false })
      })
      .then(() => navigate('/signin'))
      .catch(err => {
        console.log(err)
        this.setState({ error: err, loading: false })
      })
  }
  updateAttributes = async e => {
    e.preventDefault()
    const { email, phone_number } = this.state
    this.setState({ loading: true })
  
    let user = await Auth.currentAuthenticatedUser()
    user.Session = user.signInUserSession
    console.log(user)
    await Auth.updateUserAttributes({
      user, 
      attributes: { email, phone_number },
    })
    this.setState({ stage: 1, loading: false }) 
  }

  resendCode = async e => {
    e.preventDefault()
    const { email } = this.state
    this.setState({ loading: true })
    try {
      await Auth.resendSignUp(email)
      this.setState({ stage: 1, loading: false })
    } catch (err) {
      this.setState({ error: err, loading: false })
      console.log('error resending code...', err)
    }
  }

  verify = async e => {
    e.preventDefault()
    const { email, auth_code } = this.state
    this.setState({ loading: true })
    try {
      await Auth.verifyCurrentUserAttributeSubmit(email, auth_code)
      this.setState({ loading: false })
      navigate('/signin')
    } catch (err) {
      this.setState({ error: err, loading: false })
      console.log('error updating...', err)
    }
  }

  confirmSignUp = async e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { email, auth_code } = this.state
    try {
      this.setState({ loading: true })
      await Auth.confirmSignUp(email, auth_code)
      this.setState({ loading: false })
      navigate('/signin')
    } catch (err) {
      this.setState({ error: err, loading: false })
      console.log('error confirming signing up...', err)
    }
  }

  render() {
    if (this.state.stage === 0) {
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
    return (
      <AuthForm>
        <Email
          handleUpdate={this.handleUpdate}
          email={this.state.email}
          autoComplete="off"
        />
        <ConfirmationCode
          handleUpdate={this.handleUpdate}
          auth_code={this.state.auth_code}
          autoComplete="off"
        />
        <Button
          onClick={e => this.confirmSignUp(e)}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={this.state.loading}
        >        
          {this.state.loading ? null : 'Confirm'}
          {this.state.loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
        <CustomAction
          padding={10}
          question="Lost your code?"
          action="Resend Code"
          cb={e => this.resendCode(e)}
          disabled={this.state.loading}
        /> 
      </AuthForm>
    )
  }
}

export default UpdateUser
