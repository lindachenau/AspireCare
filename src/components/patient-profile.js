import React, { useEffect, useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { API, graphqlOperation } from 'aws-amplify'
import { createPatient, createUserMember } from '../graphql/mutations'
import { getUser, getPatient } from '../graphql/queries'
import moment from 'moment'
import { getUser as getAppUser} from './auth/app-user'
import { getPatientFromBP, addPatientToBP, getNumVisitsFromBP } from '../utils/booking-api'
import { patientTitles, patientSexCodes } from "../utils/bp-codes"

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20
  },
  close: {
    justifyContent: "flex-end"
  }  
}))

export default function ProfileForm({theme, triggerOpen, initOpen, setPatient, doneEdit, setBpId}) {
  const [open, setOpen] = useState(false)
  const didMountRef = useRef(false)
  const [title, setTitle] = useState(0)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [dOB, setDOB] = useState(null)
  const [gender, setGender] = useState(0)
  let bpId
  
  const classes = useStyles(theme)

  useEffect(() => {
    if (didMountRef.current) {
      setOpen(true)
    }
    else {
      didMountRef.current = true
      setOpen(initOpen)
    }
  }, [triggerOpen, initOpen])
 
  const handleSave = async () => {
    const dob = moment(dOB).format("YYYY-MM-DD")
    const patientId = `${firstName.replace(/\s/g,'').replace(/\\-/g,'').toUpperCase()} ${lastName.replace(/\s/g,'').replace(/\\-/g,'').toUpperCase()} ${dob} ${gender}`
    const username = getAppUser().username
    const existingPatient = await API.graphql(graphqlOperation(getPatient, {id: patientId}))
    const dobBP = moment(dob).format("YYYY-MM-DD")

    if (!existingPatient.data.getPatient) {
      bpId = await getPatientFromBP(lastName, firstName, dobBP)

      if (bpId === null)
        bpId = await addPatientToBP(title, firstName, lastName, dobBP, gender)

      try {
        const result = await API.graphql(graphqlOperation(createPatient, {
          input: {
            id: patientId,
            title: title,
            firstname: firstName,
            lastname: lastName,
            dob: dob,
            gender: gender,
            bpPatientId: bpId
          }
        }))

        const pat = result.data.createPatient
        setPatient(`${pat.firstname} ${pat.lastname}`)

        API.graphql(graphqlOperation(createUserMember, {
          input: {
            userID: username,
            memberID: patientId
          }
        }))

      } catch (err) {
        console.log('Amplify createPatient error...: ', err)
      }
    }
    else {
      const pat = existingPatient.data.getPatient
      setPatient(`${pat.firstname} ${pat.lastname}`)      
      bpId = pat.bpPatientId
      //Check if this patient is already under management
      const user = await API.graphql(graphqlOperation(getUser, {id: username}))
      const members = user.data.getUser.patients.items
      const managedPatients = members.map(member => member.memberID)

      if (!managedPatients.includes(patientId)) {
        //Patient exists already, just add the new agent
        try {
          API.graphql(graphqlOperation(createUserMember, {
            input: {
              userID: username,
              memberID: patientId
            }
          }))
        } catch (err) {
          console.log('Amplify createUserMember error...: ', err)
        }
      } else {
        alert(`${firstName} ${lastName} is already under your management!`)
      }
    }
    
    // Save BP patient ID for updating medicare, contact and pension info
    setBpId(bpId)

    setOpen(false)

    const numVisits = await getNumVisitsFromBP(bpId)
    // This patient has visited the clinic before. Not allowed to edit patient info.
    if (numVisits > 0) {
      alert(`${firstName} ${lastName} is our existing patient. No need to fill in other patient information.`)
      doneEdit()
    }
  }

  return (
    <>
      {/* <Dialog maxWidth='xs' open={open} onBackdropClick={() => setOpen(false)}> */}
      <Dialog maxWidth='xs' open={open}>
        <IconButton edge="start" color="inherit" className={classes.close} onClick={() => setOpen(false)} aria-label="close">
          <CloseIcon />
        </IconButton>        
        <DialogContent>
          <h3 className="pt-3 pb-2 text-center h3-responsive font-weight-bold" >Profile</h3>
          <p className="pt-2 pb-1 text-center p-responsive" >This profile identifies a patient in our system. Once created, it cannot be changed.</p>
          <FormControl fullWidth>
            <InputLabel htmlFor="title-native-simple">Title</InputLabel>
            <Select
              native
              value={title}
              onChange={event => setTitle(event.target.value)}
              inputProps={{
                name: 'title',
                id: 'title-native-simple',
              }}
            >
              {patientTitles.map((item, index) => <option key={index} value={item.code}>{item.label}</option>)}              
            </Select>
          </FormControl>          
          <TextField
            required
            margin="dense"
            label="First name on the Medicare card"
            type="text"
            fullWidth
            defaultValue={firstName}
            onChange={(event) => setFirstName(event.target.value.trim())}
          />
          <TextField
            required
            margin="dense"
            label="Last name on the Medicare card"
            type="text"
            fullWidth
            defaultValue={lastName}
            onChange={(event) => setLastName(event.target.value.trim())}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              required
              fullWidth
              margin="normal"
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              label="DOB(dd/MM/yyyy)"
              value={dOB}
              onChange={setDOB}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl fullWidth >
            <InputLabel htmlFor="gender-native-simple">Gender</InputLabel>
            <Select
              native
              value={gender}
              onChange={event => setGender(event.target.value)}
              inputProps={{
                name: 'gender',
                id: 'gender-native-simple',
              }}
            >
              {patientSexCodes.map((item, index) => <option key={index} value={item.code}>{item.label}</option>)}              
            </Select>
          </FormControl>                    
        </DialogContent>
        <DialogActions className={classes.button}>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            color="primary" 
            fullWidth
            disabled={!(firstName && lastName && dOB)}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}