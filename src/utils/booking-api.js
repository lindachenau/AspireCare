import axios from "axios"

export const getAppointmentsURL = `${process.env.GATSBY_BP_SERVER}/get-appointments`
export const addAppointmentURL = `${process.env.GATSBY_BP_SERVER}/add-appointment`
export const cancelAppointmentURL = `${process.env.GATSBY_BP_SERVER}/cancel-appointment`
export const arriveAppointmentURL = `${process.env.GATSBY_BP_SERVER}/arrive-appointment`
export const getPatientURL = `${process.env.GATSBY_BP_SERVER}/get-patient`
export const addPatientURL = `${process.env.GATSBY_BP_SERVER}/add-patient`
export const getPatientAptsURL = `${process.env.GATSBY_BP_SERVER}/get-patientapts`
export const getNumVisitsURL = `${process.env.GATSBY_BP_SERVER}/get-numvisits`
export const getPatientInfoURL = `${process.env.GATSBY_BP_SERVER}/get-patientinfo`
export const updatePatientMedicareURL = `${process.env.GATSBY_BP_SERVER}/update-medicare`
export const updatePatientPensionURL = `${process.env.GATSBY_BP_SERVER}/update-pension`
export const updatePatientContactsURL = `${process.env.GATSBY_BP_SERVER}/update-contacts`
export const updatePatientAddressURL = `${process.env.GATSBY_BP_SERVER}/update-address`
export const updatePatientEmailURL = `${process.env.GATSBY_BP_SERVER}/update-email`

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