import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { MDBRow, MDBCol } from 'mdbreact'
import DayHeadings from './day-headings'
import DaySlots from './day-slots'

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(#ddeff2,#bfe2e8)"
  },
  media: {
    height: 230
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: 50,
    height: 50,
    [theme.breakpoints.up('sm')]: {
      width: 80,
      height: 80
    }
  },
  header: {
    marginBottom: "-10px"
  },
  expandIconT: {
    position: 'absolute',
    right: 20,
    top: 20 
  },
  expandIconB: {
    position: 'absolute',
    right: 20,
    bottom: 0 
  },
  bottomRowMargin: {
    marginBottom: 20
  }
}))

export default function DrAppCard({drId, title, avatar, job, appointments}) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [dates, setDates] = useState([])
  const [topApps, setTopApps] = useState([])
  const [bottomApps, setBottomApps] = useState([])

  //Split appointments into top 5 rows and the rest
  const splitAppointments = (appointments) => {
    let tApps = []
    let bApps = []

    for (let i = 0; i < appointments.length; i++) {
      const moreThan5 = appointments[i].slots.length > 5             
      let oneDayT = {
        "date": appointments[i].date,
        "slots": appointments[i].slots.slice(0, moreThan5 ? 5 : appointments[i].slots.length)
      }
      tApps.push(oneDayT)

      let oneDayB = {
        "date": appointments[i].date,
        "slots": moreThan5 ? appointments[i].slots.slice(5) : []
      }
      bApps.push(oneDayB)
    }

    setTopApps(tApps)
    setBottomApps(bApps)
  }

  useEffect(() => {
    const dates = appointments.map(day => day.date)
    setDates(dates)
    splitAppointments(appointments)
  }, [appointments])
    
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  
  return (
    <MDBCol size="6" style={{minWidth: "350px", margin: "10px auto" }}>
      <Card raised className={classes.root}>
        <IconButton
          className={classes.expandIconT}
          color="primary"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>      
        <CardHeader
          avatar={<Avatar aria-label="profile-photo" src={avatar} className={classes.avatar}/>}
          title={title}
          titleTypographyProps={{variant:'h6' }}
          subheader={job}
          className={classes.header}
        />
        <CardContent>
          <DayHeadings dates={dates}/>
          <MDBRow>
            {topApps.map(day => <DaySlots drId={drId} date={day.date} key={day.date} slots={day.slots}/>)}
          </MDBRow>
          {expanded && 
            <>
              <MDBRow className={classes.bottomRowMargin}>
                {bottomApps.map(day => <DaySlots drId={drId} date={day.date} key={day.date} slots={day.slots}/>)}
              </MDBRow>
              <IconButton
                className={classes.expandIconB}
                color="primary"
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>                    
            </>
          }         
        </CardContent>
      </Card>
    </MDBCol>
  )
}