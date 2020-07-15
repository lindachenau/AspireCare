import React from 'react'
import Paper from '@material-ui/core/Paper' 
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import EditIcon from '@material-ui/icons/Edit'
import EventIcon from '@material-ui/icons/Event'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    [theme.breakpoints.up('sm')]: {
      marginTop: 30,
      marginBottom: 30,
      padding: 30
    }
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={3}>
      <List>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon color="primary"/>
          </ListItemIcon>
          <ListItemText
            primary="Our online booking allows you to book on behalf of your family members. 
            To book for a consultation, you first need to create a record for each patient, including yourself. 
            Click Patients button to create patient records. Please ensure you are authorised 
            to book on their behalves."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EditIcon color="primary"/>
          </ListItemIcon>
          <ListItemText
            primary="If you book for a new patient to our clinic, we encourage you to fill in their Medicare details online 
            and submit to our Practice Management System. Our reception will just need to check their ID against the data you provided 
            and the patient doesn't have to fill in personal details when they visit. This will speed up their first visit.
            Our website does not keep your data. All information is encrypted before submitting to our Practice Management System."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EventIcon color="primary"/>
          </ListItemIcon>               
          <ListItemText
            primary="Once appointments are booked, you can cancel the appointments online if the patient cannot attend their appointments."
          />
        </ListItem>
      </List>
    </Paper>    
  )
}


