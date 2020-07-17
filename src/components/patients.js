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
import { getUser as getAppUser, setUser } from './app-user'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser, getPatient }  from '../graphql/queries'

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
  },
  iconColor: {
    color: theme.palette.primary.main
  }
}))

const Patient = ({name, dob, id, patientIndex, setPatient, setPatStage}) => {

  const bookAppointment = () => {
    //Save the selected patient
    const userInfo = {
      ...getAppUser(),
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

  const editExistingPatient = () => {
    setPatient(name)
    setPatStage(1)
  }

  return (
    <ListItem>
      <ListItemText
        primary={name}
        secondary={dob}
      />
      <ListItemIcon>
        <IconButton edge="end" aria-label="edit" onClick={editExistingPatient}>
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

const Legend = () => {
  const classes = useStyles()
  return (
    <>
      <ListItem>
        <ListItemIcon className={classes.iconColor} >
          <EditIcon />
        </ListItemIcon>      
        <ListItemText
          primary="Edit patient profile and other information"
        />
      </ListItem> 
      <ListItem>
        <ListItemIcon className={classes.iconColor}>
          <DeleteIcon />
        </ListItemIcon>      
        <ListItemText
          primary="Remove a patient from your management"
        />
      </ListItem>    
      <ListItem>
        <ListItemIcon className={classes.iconColor}>
          <ArrowForwardIosIcon />
        </ListItemIcon>      
        <ListItemText
          primary="Make an appointment for a patient"
        />
      </ListItem>
    </>             
  )
}

const Patients = ({patStage, setPatStage}) => {
  
  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState(null)
  const [triggerFetchPatients, setTriggerFetchPatients] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const getPatientsByUser = async () => {
      const username = getAppUser().username
      try {
        const user = await API.graphql(graphqlOperation(getUser, {id: username}))
        const members = user.data.getUser.patients.items
        const patientIds = members.map(member => member.memberID)
        
        Promise.allSettled(patientIds.map(id => {
          return API.graphql(graphqlOperation(getPatient, {id: id}))
        }))
        .then((results) => {
          let pats = []
          results.forEach(result => {
            if (result.status === 'fulfilled') {
              pats.push(result.value.data.getPatient)
            }
          })
          setPatients(pats)
        })
      } catch (err) {
        console.log('Amplify getUser error...: ', err)
      }
    }

    getPatientsByUser()

  }, [triggerFetchPatients])

  const doneEdit = () => {
    setTriggerFetchPatients(!triggerFetchPatients)
    setPatStage(0)
  }

  const addNewPatient = () => {
    setPatient(null)
    setPatStage(1)
  }

  return (
    <>
      {patStage === 0 && 
      <Paper className={classes.root} elevation={3}>
        <List>
          <Legend />
          {patients.map((pat, index) => (
            <Patient 
              key={pat.dob} 
              name={`${pat.firstname} ${pat.lastname}`} 
              dob={pat.dob} 
              id={pat.id}
              patientIndex={index}
              setPatient={setPatient}
              setPatStage={setPatStage}
            />
          ))}
          <ListItemIcon>
            <IconButton edge="end" aria-label="add" onClick={addNewPatient}>
              <PersonAddIcon />
            </IconButton>
          </ListItemIcon>  
        </List>
      </Paper>}
      {patStage === 1 && 
      <>
        <PatientForms patient={patient}/>
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