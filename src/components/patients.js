import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper' 
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import PatientForms from './patient-forms'

const patients = [
  {
    name: "Gavin Chen",
    dob: "2012-10-09"
  },
  {
    name: "Sooty Yu",
    dob: "2013-03-17"
  },
  {
    name: "Dennis Yu",
    dob: "2015-09-06"
  }  
]

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    maxWidth: 600,
    [theme.breakpoints.up('sm')]: {
      margin: "auto",
      padding: 30
    }
  }
}))

const Patient = ({name, dob}) => {
  return (
    <ListItem>
      <ListItemText
        primary={name}
        secondary={dob}
      />
      <ListItemIcon>
        <IconButton edge="end" aria-label="edit">
          <EditIcon />
        </IconButton>
      </ListItemIcon>       
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>    
    </ListItem>
  )
}

const Patients = ({patStage, setPatStage}) => {
  
  const [patient, setPatient] = useState(null)
  const classes = useStyles()

  return (
    <>
      {patStage === 0 && 
      <Paper className={classes.root} elevation={3}>
        <List>
          {patients.map(patient => (<Patient name={patient.name} dob={patient.dob} />))}
          <ListItemIcon>
            <IconButton edge="end" aria-label="add" onClick={() => setPatStage(1)}>
              <PersonAddIcon />
            </IconButton>
          </ListItemIcon>  
        </List>
      </Paper>}
      {patStage === 1 && <PatientForms />}
    </>
  )
}

export default Patients