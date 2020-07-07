import React from 'react'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import Button from '@material-ui/core/Button'
import { AuthForm, Email, Password, ConfirmationCode, CustomAction } from './auth-forms'

const initialState = {
  email: ``,
  auth_code: ``,
  password: ``,
  error: ``,
  loading: false,
  stage: 0,
}

class Reset extends React.Component {
  state = initialState

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    })
  }

  reset = async e => {
    e.preventDefault()
    const { email } = this.state
    try {
      this.setState({ loading: true })
      await Auth.forgotPassword(email)
      console.log('forgotPassword')
      this.setState({ loading: false, stage: 1 })
    } catch (err) {
      this.setState({ error: err, loading: false })
      console.log('error...: ', err)
    }
  }

  confirmReset = async e => {
    e.preventDefault()
    const { email, auth_code, password } = this.state
    this.setState({ loading: true })
    Auth.forgotPasswordSubmit(email, auth_code, password)
      .then(data => {
        console.log(data)
        this.setState({ loading: false })
      })
      .then(() => navigate('/signin'))
      .catch(err => {
        console.log(err)
        this.setState({ error: err, loading: false })
      })
  }

  render() {
    if (this.state.stage === 0) {
      return (
        <AuthForm title="Reset your password" error={this.state.error}>
          <Email
            handleUpdate={this.handleUpdate}
            email={this.state.email}
            autoComplete="on"
          />
          <Button
            onClick={e => this.reset(e)}
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            disabled={this.state.loading}
          >
            {this.state.loading ? null : 'Send Code'}
            {this.state.loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
          <Button 
            color="primary"
            fullWidth
            style={{marginTop: "10px"}}
            onClick={() => navigate("/signin")}
          >
            Back to Sign In
          </Button>
        </AuthForm>
      )
    }

    return (
      <React.Fragment>
        <AuthForm title="Confirm Password Update" error={this.state.error}>
          <Email
            handleUpdate={this.handleUpdate}
            email={this.state.email}
            autoComplete="on"
          />
          <ConfirmationCode
            handleUpdate={this.handleUpdate}
            email={this.state.auth_code}
            autoComplete="off"
          />
          <Password
            handleUpdate={this.handleUpdate}
            password={this.state.password}
            autoComplete="on"
          />
          <Button 
            color="primary"
            fullWidth
            style={{marginBottom: "10px"}}
            onClick={() => navigate("/signin")}
          >
            Back to Sign In
          </Button>
          <Button
            onClick={e => this.confirmReset(e)}
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            disabled={this.state.loading}
          >
            {this.state.loading ? null : 'Confirm Reset'}
            {this.state.loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </AuthForm>
        <CustomAction
          padding={10}
          question="Lost your code?"
          action="Resend Code"
          cb={e => this.reset(e)}
          disabled={this.state.loading}
        /> 
      </React.Fragment>
    )
  }
}

export default Reset