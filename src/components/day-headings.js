import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { MDBRow, MDBCol } from 'mdbreact'
import { getWeekDay, getDateMonth } from '../utils/date-formatter'

const useStyles = makeStyles(theme => ({
  alignVertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  marginB1: {
    marginBottom: "-3px"
  },
  marginB2: {
    marginBottom: "-5px",
    marginTop: "-10px"
  },
  marginB3: {
    marginBottom: "6px"
  }
}))

export default function DayHeadings({dates}) {
  const classes = useStyles()
     
  return (
    <>
      <MDBRow className={classes.marginB2}>
        {dates.map(d => {
          const date = new Date(d)
          const day = getWeekDay(date)
          const dateMonth = getDateMonth(date)

          return (
            <MDBCol key={d} className={classes.alignVertical}>
              <Typography className={classes.marginB1} variant="body2" component="p">{day}</Typography>
              <Typography variant="body2" component="p">{dateMonth}</Typography>
            </MDBCol>
          )
        })}
      </MDBRow>
      <hr className={classes.marginB3}/>
    </>
  )
}