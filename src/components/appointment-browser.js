import React, { useEffect, useState } from 'react';
import DrAppCard from './doctor-app-card'
import { MDBRow } from 'mdbreact'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment'
import axios from "axios"
import { doctors } from '../utils/booking-helper'

const useStyles = makeStyles(theme => ({
  leftMiddle: {
    position: "fixed",
    top: "50vh",
    left: "0",
    zIndex: "999",
    opacity: 0.5
  },
  rightMiddle: {
    position: "fixed",
    top: "50vh",
    right: "0",
    zIndex: "999",
    opacity: 0.5  }
}))

const AppBrowser = () => {
  const bp_server = process.env.GATSBY_BP_SERVER
  const classes = useStyles()
  const [appData, setAppData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [numDays, setNumDays] = useState(0)
  const [disablePrev, setDisablePrev] = useState(true)
  
  useEffect(() => {
    const fetchApps = async () => {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: bp_server,
        data: {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          numDays: numDays
        }
      }

      const response = await axios(config)
      setAppData(response.data)
    }

    fetchApps()

  }, [startDate, numDays])

  useEffect(() => {
    //narrow screen display 4 columns only. Need to check whether it works for iPad or not
    setNumDays(window.innerWidth >= 992 ? 5 : 4)
  }, [])

  useEffect(() => {
    setDisablePrev(moment(startDate).format("YYYY-MM-DD") == moment(new Date()).format("YYYY-MM-DD"))
  }, [startDate])

  const handlePrev = () => {
    setStartDate(new Date(startDate.getTime() - 86400000 * numDays))
  }

  const handleNext = () => {
    setStartDate(new Date(startDate.getTime() + 86400000 * numDays))
  }

  return (
    <div>
      <IconButton
        onClick={handlePrev}
        aria-label="prev"
        className={classes.leftMiddle}
        color="primary"
        variant="contained"
        disabled={disablePrev}
      >
        <ArrowBackIosIcon />
      </IconButton> 
      <IconButton
        onClick={handleNext}
        aria-label="next"
        className={classes.rightMiddle}
        color="primary"
        variant="contained"
      >
        <ArrowForwardIosIcon />
      </IconButton>                
      <MDBRow>
        {appData.map(doctor => (
          <DrAppCard 
            key={doctor.bpId}
            drId={doctor.bpId}
            title={doctors[doctor.bpId].title}
            avatar={doctors[doctor.bpId].avatar}
            job={doctors[doctor.bpId].job}
            appointments={doctor.appointments}
          />
        ))}
      </MDBRow>
    </div>
  )
}

export default AppBrowser
