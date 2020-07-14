import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import Paper from '@material-ui/core/Paper' 
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Button from '@material-ui/core/Button'
import PatientForms from './patient-forms'
import { getUser, setUser } from './app-user'
import { API, graphqlOperation } from 'aws-amplify'
import { listPatients }  from '../graphql/queries'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    maxWidth: 600,
    [theme.breakpoints.up('sm')]: {
      margin: "auto",
      padding: 30
    }
  },
  flex: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1,
  }
}))

const Patient = ({name, dob, id, patientIndex}) => {
  const bookAppointment = () => {
    //Save the selected patient
    const userInfo = {
      ...getUser(),
      patientName: name,
      patientId: id,
      patientIndex: patientIndex
    }
    setUser(userInfo)
    
    //Selected appointment slot already, go straight to booking. Otherwise send user to appointment browser.
    if (userInfo.appId)
      navigate("/book")
    else 
      navigate("/appointments")
  }

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
      <ListItemIcon>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton edge="end" aria-label="book" onClick={bookAppointment}>
          <ArrowForwardIosIcon />
        </IconButton>
      </ListItemIcon>       
    </ListItem>
  )
}

const Patients = ({patStage, setPatStage}) => {
  
  const [patients, setPatients] = useState([])
  const [triggerFetchPatients, setTriggerFetchPatients] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const getPatientsByUser = async () => {
      const username = getUser().username
      try {
        const patients = await API.graphql(graphqlOperation(listPatients, {
          filter: {
            userID: {
              eq: username
            }
          }
        }))

        setPatients(patients.data.listPatients.items)

      } catch (err) {
        console.log(console.log('Amplify listPatients error...: ', err))
      }
    }

    getPatientsByUser()

  }, [triggerFetchPatients])

  const doneEdit = () => {
    setTriggerFetchPatients(!triggerFetchPatients)
    setPatStage(0)
  }

  return (
    <>
      {patStage === 0 && 
      <Paper className={classes.root} elevation={3}>
        <List>
          {patients.map((patient, index) => {
            return (
              <Patient 
                key={patient.dob} 
                name={`${patient.firstname} ${patient.lastname}`} 
                dob={patient.dob} 
                id={patient.id}
                patientIndex={index}
              />
            )}
          )}
          <ListItemIcon>
            <IconButton edge="end" aria-label="add" onClick={() => setPatStage(1)}>
              <PersonAddIcon />
            </IconButton>
          </ListItemIcon>  
        </List>
      </Paper>}
      {patStage === 1 && 
      <>
        <PatientForms />
        <div className={classes.flex}>
          <div className={classes.grow} />
          <Button 
            variant="contained" 
            onClick={doneEdit} 
            color="primary"
            aria-label="done with patient forms"
            startIcon={<EditIcon />}
          >
            Done
          </Button>
        </div>
      </>}
    </>
  )
}

export default Patients