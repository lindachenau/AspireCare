import React from 'react'
import Container from '@material-ui/core/Container'

export function AuthForm({ children, title, error }) {
  return (
    <Container maxWidth="xs" className="mdb-color-text">
      <h2 className="pt-5 pb-3 text-center h2-responsive font-weight-bold" >{title}</h2>
      {error && (
        <p className="text-danger">
          {error.message ? error.message : error}
        </p>
      )}
      {children}
    </Container>
  )
}

export function Email({ handleUpdate, email, autoComplete }) {
  return (
    <div className="form-group">
      <input
        onChange={handleUpdate}
        name="email"
        type="email"
        value={email}
        className="form-control"
        autoComplete={autoComplete}
        id="enterEmailAddress"
        aria-describedby="emailHelp"
        placeholder="email"
      />
    </div>
  )
}

export function Password({ handleUpdate, password, autoComplete }) {
  return (
    <div className="form-group">
      <input
        onChange={handleUpdate}
        autoComplete={autoComplete}
        name="password"
        value={password}
        type="password"
        className="form-control"
        placeholder="password"
        id="enterPassword"
      />
    </div>
  )
}

export function ConfirmationCode({ handleUpdate, auth_code, autoComplete }) {
  return (
    <div className="form-group">
      <label htmlFor="enterCode">Confirmation Code</label>
      <input
        onChange={handleUpdate}
        autoComplete={autoComplete}
        name="auth_code"
        value={auth_code}
        type="text"
        className="form-control"
        placeholder="######"
        id="enterCode"
      />
    </div>
  )
}
