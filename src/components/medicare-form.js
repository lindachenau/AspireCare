import React, { useEffect, useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import NumberFormat from 'react-number-format'
import { monthExpiry } from '../utils/date-formatter'

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

export default function MedicareForm({theme, triggerOpen, initOpen, saveMedicare, patientInfo}) {
  const [open, setOpen] = useState(false)
  const didMountRef = useRef(false)
  const [medicareNo, setMedicareNo] = useState('')
  const [iRN, setIRN] = useState('')
  const [expiry, setExpiry] = useState('')
  
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
    setMedicareNo(patientInfo.medicareNo)
    setIRN(patientInfo.medicareLineNo)
    setExpiry(patientInfo.medicareExpiry)
  }, [patientInfo])

  const handleSave = () => {
    saveMedicare(patientInfo.patientID, medicareNo.replace(/ /g, ""), iRN, expiry)
    setOpen(false)
  }

  return (
    <>
      <Dialog maxWidth='xs' open={open} onBackdropClick={() => setOpen(false)}>
        <IconButton edge="start" color="inherit" className={classes.close} onClick={() => setOpen(false)} aria-label="close">
          <CloseIcon />
        </IconButton>               
        <DialogContent>
          <h3 className="pt-3 pb-2 text-center h3-responsive font-weight-bold" >Medicare</h3>
          <div className="form-group pb-1">
            <InputLabel>Medicare number*</InputLabel>
            <NumberFormat
              placeholder="xxxx xxxxx x"
              onChange={(event) => setMedicareNo(event.target.value)}
              name="medicare_number"
              value={medicareNo}
              type="tel"
              className="form-control"
              format="#### ##### #"
              mask="_"
            />
          </div>
          <div className="form-group">
            <InputLabel>Individual reference number* (the number before the patient's name)</InputLabel>
            <NumberFormat
              placeholder="x"
              onChange={(event) => setIRN(event.target.value)}
              name="line_number"
              value={iRN}
              type="tel"
              className="form-control"
              format="#"
              mask="_"
            />
          </div>
          <div className="form-group">
            <InputLabel>Expiry*</InputLabel>
            <NumberFormat
              placeholder="MM/YYYY"
              onChange={(event) => setExpiry(event.target.value)}
              name="expiry"
              value={expiry}
              type="tel"
              className="form-control"
              format={monthExpiry}
              mask="_"

            />
          </div>
        </DialogContent>
        <DialogActions className={classes.button}>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            color="primary" 
            fullWidth
            disabled={!(medicareNo && iRN && expiry)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}