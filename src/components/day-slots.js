import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MDBCol } from 'mdbreact'
import Button from '@material-ui/core/Button'
import { useAppointmentProfiles } from '../utils/useAppointmentProfiles'
import { setUser, getUser } from './auth/app-user'

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

export default function DaySlots({drId, date, slots, setAppId}) {
  const classes = useStyles()
  const { allMarkdownRemark } = useAppointmentProfiles()

  const handleSlot = (e) => {
    const appTime = e.currentTarget.value
    //Save the chosen slot
    const userInfo = {
      ...getUser(),
      appTime: appTime,
      drId: drId
    }
    setUser(userInfo)

    const message = `${doctorTitles[drId]} on ${appTime.slice(0, 10)} at ${appTime.slice(11)}`
    setAppId(message)
  }

  // Change the format to object for easy access  
  const doctorTitles = {}
  allMarkdownRemark.edges.forEach(node => {
    doctorTitles[node.node.frontmatter.bpid] = node.node.frontmatter.title
  })

  return (
    <MDBCol className={classes.alignVertical}>
      {slots.map(slot => {
        return (
          <Button
            key={slot}
            value={`${date} ${slot}`}
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