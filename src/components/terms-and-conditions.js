import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useTermsConditions } from '../utils/useTermsConditions'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    maxWidth: 600,
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      margin: "auto",
      padding: 30
    }
  },
  flex: {
    display: 'flex',
    marginTop: 30
  },
  grow: {
    flexGrow: 1
  }
}))

const TermsConditions = ({terms, book}) => {
  const tcs = {}
  const { allMarkdownRemark } = useTermsConditions()
  allMarkdownRemark.edges.forEach(({node}) => {
    tcs[node.frontmatter.terms] = node.html
  })
  const [checked, setChecked] = useState(false)
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.root} elevation={3}>
      <Typography variant="h6" align="left" gutterBottom>
        Terms & Conditions
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: tcs[terms] }} />
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
            name="checked"
            color="primary"
          />
        }
        label="I have read and agree to the terms and conditions."
      />
      </Paper>
      <div className={classes.flex} >
        <div className={classes.grow} />
        <Button variant='contained' onClick={book} color="primary" disabled={!checked}>
            Book
        </Button>
        <div className={classes.grow} /> 
      </div>       
    </>
  )
}

export default TermsConditions