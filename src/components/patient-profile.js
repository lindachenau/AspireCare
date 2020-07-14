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
import { API, graphqlOperation } from 'aws-amplify'
import { createPatient } from '../graphql/mutations'
import moment from 'moment'
import { getUser } from './app-user'

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    maxWidth: 400,
    margin: "auto"
  }
}))

export default function ProfileForm({theme, triggerOpen, initOpen}) {
  const [open, setOpen] = useState(false)
  const didMountRef = useRef(false)
  const [title, setTitle] = useState("")
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [dOB, setDOB] = useState(null)
  const [gender, setGender] = useState("")
  
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
    const newPatient = await API.graphql(graphqlOperation(createPatient, {
      input: {
        id: `${firstName} ${lastName} ${dob} ${gender} `,
        title: title,
        firstname: firstName,
        lastname: lastName,
        dob: dob,
        gender: gender,
        userID: getUser().username
      }
    }))
    
    //Also create BP patient account here later
    setOpen(false)
  }

  return (
    <>
      <Dialog className={classes.container} open={open} onBackdropClick={() => setOpen(false)}>
        <DialogContent>
          <h3 className="pt-3 pb-2 text-center h3-responsive font-weight-bold" >Profile</h3>
          <FormControl required fullWidth>
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
              <option aria-label="None" value="" />
              <option value={"Mr."}>Mr.</option>
              <option value={"Mrs."}>Mrs.</option>
              <option value={"Ms."}>Ms.</option>
              <option value={"Miss"}>Miss</option>
              <option value={"Mast."}>Mast.</option>
            </Select>
          </FormControl>          
          <TextField
            autoFocus
            required
            margin="dense"
            label="First name"
            type="text"
            fullWidth
            defaultValue={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Last name"
            type="text"
            fullWidth
            defaultValue={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              required
              fullWidth
              margin="normal"
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              margin="normal"
              label="DOB"
              value={dOB}
              onChange={setDOB}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl required fullWidth >
            <InputLabel htmlFor="gender-native-simple">Gender</InputLabel>
            <Select
              native
              required
              value={gender}
              onChange={event => setGender(event.target.value)}
              inputProps={{
                name: 'gender',
                id: 'gender-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={"Female"}>Female</option>
              <option value={"Male"}>Male</option>
              <option value={"Other"}>Other</option>
            </Select>
          </FormControl>                    
        </DialogContent>
        <DialogActions className={classes.button}>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            color="primary" 
            fullWidth
            disabled={!(title != "" && firstName && lastName && dOB && gender != "")}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}