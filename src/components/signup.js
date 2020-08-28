import React from 'react'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import NumberFormat from 'react-number-format'
import Button from '@material-ui/core/Button'
import { AuthForm, Email, Password, ConfirmationCode, CustomAction } from './auth-forms'

const initialState = {
  username: ``,
  password: ``,
  email: '',
  phone_number: '',
  auth_code: '',
  stage: 0,
  error: '',
  loading: false,
}

class SignUp extends React.Component {
  state = initialState

  handleUpdate = event => {
    if (event.target.name === 'email') {
      this.setState({
        [event.target.name]: event.target.value,
        username: event.target.value,
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

  signUp = async e => {
    e.preventDefault()
    const { username, password, email, phone_number } = this.state
    this.setState({ loading: true })
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number },
      })
      this.setState({ stage: 1, loading: false })
    } catch (err) {
      this.setState({ error: err, loading: false })
      console.log('error signing up...', err)
    }
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
      console.log('error signing up...', err)
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
        <AuthForm title="Create a new account" error={this.state.error}>
          <Email
            handleUpdate={this.handleUpdate}
            email={this.state.email}
            autoComplete="off"
          />
          <Password
            handleUpdate={this.handleUpdate}
            password={this.state.password}
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
            onClick={e => this.signUp(e)}
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            disabled={this.state.loading}
          >
            {this.state.loading ? null : 'Create Account'}
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
            question="Have an account?"
            action="Sign in"
            cb={() => navigate("/signin")}
          />          
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
          question="Have an account?"
          action="Sign in"
          cb={() => navigate("/signin")}
        />
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

export default SignUp
