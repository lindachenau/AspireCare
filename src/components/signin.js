import React from 'react'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import { setUser } from './app-user'
import { AuthForm, Email, Password, CustomAction } from './auth-forms'
import Button from '@material-ui/core/Button'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser }  from '../graphql/queries'
import { createUser }  from '../graphql/mutations'

class SignIn extends React.Component {
  state = {
    username: ``,
    email: ``,
    password: ``,
    error: ``,
    loading: false,
  }

  handleUpdate = event => {
    if (event.target.name === 'email') {
      this.setState({
        [event.target.name]: event.target.value,
        username: event.target.value,
        error: '',
      })
    }
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    })
  }

  addUser = async username => {
    let existingUser

    try {
      existingUser = await API.graphql(graphqlOperation(getUser, {id: username}))
    } catch (err) {
      console.log('Amplify getUser error...: ', err)
      return
    }
    
    if (!existingUser.data.getUser) {
      try {
        const newUser = await API.graphql(graphqlOperation(createUser, {
          input: {
            id: username
          }
        }))

      } catch (err) {
        console.log('Amplify createUser error...: ', err)
        return        
      }
    }
  }

  login = async e => {
    e.preventDefault()
    const { username, password } = this.state
    try {
      this.setState({ loading: true })
      await Auth.signIn(username, password)
      const user = await Auth.currentAuthenticatedUser()
      const userInfo = {
        ...user.attributes,
        username: user.username,
      }
      setUser(userInfo)
      this.setState({ loading: false })
      this.addUser(user.username)      
      navigate('/my-account')
    } catch (err) {
      this.setState({ error: err, loading: false })
      console.log('error...: ', err)
    }
  }

  render() {
    return (
      <AuthForm title="Sign in to your account" error={this.state.error}>
        <Email
          handleUpdate={this.handleUpdate}
          email={this.state.email}
          autoComplete="on"
        />
        <Password
          handleUpdate={this.handleUpdate}
          password={this.state.password}
          autoComplete="on"
        />
        <CustomAction
          padding={10}
          question="Forgot your password?"
          action="Reset password"
          cb={() => navigate("/reset")}
        />
        <Button
          onClick={e => this.login(e)}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={this.state.loading}
        >
          {this.state.loading ? null : 'Sign In'}
          {this.state.loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
        <CustomAction
          padding={20}
          question="No account?"
          action="Create account"
          cb={() => navigate("/signup")}
        />        
      </AuthForm>
    )
  }
}

export default SignIn
