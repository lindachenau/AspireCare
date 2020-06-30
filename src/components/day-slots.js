import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MDBCol } from 'mdbreact'
import Button from '@material-ui/core/Button'
import { bookingMessage } from '../utils/booking-helper'

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

export default function DaySlots({drId, date, slots}) {
  const classes = useStyles()

  const handleSlot = (e) => {
    const message = bookingMessage(e.currentTarget.value)
    alert(`Booking with ${message}`)
  }
     
  return (
    <MDBCol className={classes.alignVertical}>
      {slots.map(slot => {
        return (
          <Button
            key={slot}
            value={`${drId} ${date} ${slot}`}
            size="small"
            onClick={handleSlot}
          >
            {slot}
          </Button>
        )
      })}
    </MDBCol>
  )
}