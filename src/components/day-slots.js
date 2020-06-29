import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MDBCol } from 'mdbreact'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  alignVertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 0
  },
  marginB: {
    marginBottom: "5px"
  }
}))

export default function DaySlots({slots}) {
  const classes = useStyles()
     
  return (
    <MDBCol className={classes.alignVertical}>
      {slots.map(slot => {
        return <Button key={slot} size="small">{slot}</Button>
      })}
    </MDBCol>
  )
}