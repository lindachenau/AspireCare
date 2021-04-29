import React, { useEffect, useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { pensionCodes } from "../utils/bp-codes"

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 20
  },
  close: {
    justifyContent: "flex-end"
  }  
}))

export default function PensionForm({theme, triggerOpen, initOpen, savePension, patientInfo}) {
  const [open, setOpen] = useState(false)
  const didMountRef = useRef(false)
  const [pensionCode, setPensionCode] = useState(0)
  const [pensionNo, setPensionNo] = useState('')
  const [pensionExpiry, setPensionExpiry] = useState(null)
  
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

  useEffect(() => {
    setPensionCode(patientInfo.pensionCode)
    setPensionNo(patientInfo.pensionNo)
    setPensionExpiry(new Date(patientInfo.pensionExpiry))
  }, [patientInfo])

  const handleSave = () => {
    savePension(patientInfo.patientID, pensionCode, pensionNo, moment(pensionExpiry).format("YYYY-MM-DD"))
    setOpen(false)
  }

  return (
    <>
      <Dialog maxWidth='xs' open={open} onBackdropClick={() => setOpen(false)}>
        <IconButton edge="start" color="inherit" className={classes.close} onClick={() => setOpen(false)} aria-label="close">
          <CloseIcon />
        </IconButton>               
        <DialogContent>
          <h3 className="pt-3 pb-2 text-center h3-responsive font-weight-bold" >Pension</h3>
          <FormControl fullWidth>
            <InputLabel htmlFor="pension-card-type">Pension card type*</InputLabel>
            <Select
              native
              value={pensionCode}
              onChange={event => setPensionCode(event.target.value)}
              inputProps={{
                name: 'pension-code',
                id: 'pension-code',
              }}
            >
              {pensionCodes.map((item, index) => <option key={index} value={item.code}>{item.label}</option>)}              
            </Select>
          </FormControl>
          <TextField
            required
            margin="dense"
            label="Card number"
            type="text"
            fullWidth
            defaultValue={pensionNo}
            onChange={(event) => setPensionNo(event.target.value.trim())}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              required
              fullWidth
              margin="normal"
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              label="Expiry(dd/MM/yyyy)"
              value={pensionExpiry}
              onChange={(date) => setPensionExpiry(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>            
        </DialogContent>
        <DialogActions className={classes.button}>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            color="primary" 
            fullWidth
            disabled={!(pensionCode && pensionNo && pensionExpiry)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}