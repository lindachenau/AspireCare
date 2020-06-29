import React, { useEffect, useState } from 'react';
import DrAppCard from './doctor-app-card'
import { MDBRow } from 'mdbreact'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment'
import axios from "axios"
// const bp_server = env.process.GATSBY_BP_SERVER
// console.log(bp_server)
const bp_server = "http://localhost:5000/get-appointments"

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
  const classes = useStyles()

  const doctors = {
    "0001": {
      title: "Dr Kai Yu",
      avatar: require("../images/kai.jpg"),
      job: "General Practitioner"
    },
    "0002": {
      title: "Dr Dennis Yu",
      avatar: require("../images/dennis.jpg"),
      job: "General Practitioner"
    },
    "0003": {
      title: "Dr Linda Chen",
      avatar: require("../images/linda.jpg"),
      job: "General Practitioner"
    },
    "0004": {
      title: "Dr Michellenne Yu",
      avatar: require("../images/mich.jpg"),
      job: "General Practitioner"
    }
  }

  const [appData, setAppData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  //narrow screen display 4 columns only. Need to check whether it works for iPad or not
  const [numDays, setNumDays] = useState(window.innerWidth > 1024 ? 5 : 4)

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
          <DrAppCard key={doctor.bpId}
            title={doctors[doctor.bpId].title}
            avatar={doctors[doctor.bpId].avatar}
            job={doctors[doctor.bpId].job}
            appointments={doctor.appointments}/>
        ))}
      </MDBRow>
    </div>
  )
}

export default AppBrowser
