import axios from "axios"
import moment from 'moment'

const getAppointmentsURL = `${process.env.GATSBY_BP_SERVER}/get-appointments`
const addAppointmentURL = `${process.env.GATSBY_BP_SERVER}/add-appointment`
const cancelAppointmentURL = `${process.env.GATSBY_BP_SERVER}/cancel-appointment`
const arriveAppointmentURL = `${process.env.GATSBY_BP_SERVER}/arrive-appointment`
const getPatientURL = `${process.env.GATSBY_BP_SERVER}/get-patient`
const addPatientURL = `${process.env.GATSBY_BP_SERVER}/add-patient`
const getPatientAptsURL = `${process.env.GATSBY_BP_SERVER}/get-patientapts`
const getNumVisitsURL = `${process.env.GATSBY_BP_SERVER}/get-numvisits`
const getPatientInfoURL = `${process.env.GATSBY_BP_SERVER}/get-patientinfo`
const updatePatientMedicareURL = `${process.env.GATSBY_BP_SERVER}/update-medicare`
const updatePatientPensionURL = `${process.env.GATSBY_BP_SERVER}/update-pension`
const updatePatientContactsURL = `${process.env.GATSBY_BP_SERVER}/update-contacts`
const updatePatientAddressURL = `${process.env.GATSBY_BP_SERVER}/update-address`
const updatePatientEmailURL = `${process.env.GATSBY_BP_SERVER}/update-email`

export const fetchApps = async (startDate, numDays, doctorList, setLoading, setAppData) => {
  try {
    if (numDays > 0 && doctorList.length > 0) {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: getAppointmentsURL,
        data: {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          numDays: numDays,
          userList: doctorList
        }
      }
      setLoading(true)
      const response = await axios(config)
      setAppData(response.data)
      setLoading(false)
      console.log("Fetching available appointments")
    }
  } catch(err) {
    console.log('BP_GetFreeAppointments error', err)
  }
}

export const addAppointmentToBP = async (aptDate, aptTime, aptType, practitionerID, patientID) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: addAppointmentURL,
      data: {
        aptDate, 
        aptTime, 
        aptType, 
        practitionerID, 
        patientID
      }
    }
    const result = await axios(config)

    return result.data
  } catch(err) {
    console.log('BP_AddAppointment error', err)
  }
}

export const getPatientAptsFromBP = async (patientID) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: getPatientAptsURL,
      data: {
        patientID
      }
    }
    const result = await axios(config)

    return result.data
  } catch(err) {
    console.log('BP_AddAppointment error', err)
  }
}

export const cancelBPAppointment = async (aptID) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: cancelAppointmentURL,
      data: {
        aptID
      }
    }
    const result = await axios(config)

    return result.data
  } catch(err) {
    console.log('BP_CancelAppointment error', err)
  }
}  

export const confirmCheckin = async (aptId) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: arriveAppointmentURL,
      data: {
        aptID : aptId
      }
    }
    const result = await axios(config)

    return result.data
  } catch(err) {
    console.log('BP_ArriveAppointment error', err)
  }
}

export const getPatientFromBP = async (surname, firstname, dob) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: getPatientURL,
      data: {
        surname: surname,
        dob: dob
      }
    }
    const result = await axios(config)
    const patList = result.data

    let id = null
    let normalisedName = firstname.toUpperCase().replace(/-| /g,'')
    if (patList.length > 0) {
      patList.forEach(element => {
        if (normalisedName === element.firstname.toUpperCase().replace(/-| /g,''))
          id = element.id
      })
    }

    return id
  } catch(err) {
    console.log('BP_GetPatientByPartSurnameDOB error', err)
  }
}

export const addPatientToBP = async (titleCode, firstname, surname, dob, sexCode) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: addPatientURL,
      data: {
        titleCode,
        firstname,
        surname,
        dob,
        sexCode
      }
    }
    const result = await axios(config)

    return result.data
  } catch(err) {
    console.log('BP_AddPatient error', err)
  }
}

export const getNumVisitsFromBP = async (bpPatientId) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: getNumVisitsURL,
      data: {
        patientID: bpPatientId
      }
    }
    const result = await axios(config)
    const numVisits = result.data

    return numVisits
  } catch(err) {
    console.log('BP fetching number of visits error', err)
  }
}

export const fetchPatientInfo = async (patientID, setPatientInfo) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: getPatientInfoURL,
      data: {
        patientID       
      }
    }
    const result = await axios(config)
    setPatientInfo(result.data)
  } catch(err) {
    console.log('BP_GetPatientByInternalID error', err)
  }
}

export const saveMedicare = async (patientID, medicareNo, medicareLineNo, medicareExpiry) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: updatePatientMedicareURL,
      data: {
        patientID, 
        medicareNo, 
        medicareLineNo, 
        medicareExpiry          
      }
    }
    await axios(config)
  } catch(err) {
    console.log('BP_UpdatePatientMedicare error', err)
  }
}

export const saveContacts = async (patientID, homePhone, workPhone, mobilePhone, address1, city, postcode, email) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: updatePatientContactsURL,
      data: {
        patientID, 
        homePhone, 
        workPhone, 
        mobilePhone         
      }
    }
    axios(config)
  } catch(err) {
    console.log('BP_UpdatePatientContacts error', err)
  }

  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: updatePatientAddressURL,
      data: {
        patientID,
        address1, 
        city, 
        postcode
      }
    }
    axios(config)
  } catch(err) {
    console.log('BP_UpdatePatientAddress error', err)
  }

  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: updatePatientEmailURL,
      data: {
        patientID, 
        email
      }
    }
    await axios(config)
  } catch(err) {
    console.log('BP_UpdatePatientEmail error', err)
  }
}

export const savePension = async (patientID, pensionCode, pensionNo, pensionExpiry) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: updatePatientPensionURL,
      data: {
        patientID, 
        pensionCode, 
        pensionNo, 
        pensionExpiry
      }
    }
    await axios(config)
  } catch(err) {
    console.log('BP_UpdatePatientPension error', err)
  }
}

