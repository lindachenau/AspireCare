/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      patients {
        items {
          id
          patient_id
          title
          firstname
          lastname
          dob
          gender
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        patients {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      id
      patient_id
      title
      firstname
      lastname
      dob
      gender
      user {
        id
        username
        patients {
          nextToken
        }
      }
      appointments {
        items {
          id
          appointment_id
          booking_date
        }
        nextToken
      }
    }
  }
`;
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        patient_id
        title
        firstname
        lastname
        dob
        gender
        user {
          id
          username
        }
        appointments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getAppointment = /* GraphQL */ `
  query GetAppointment($id: ID!) {
    getAppointment(id: $id) {
      id
      appointment_id
      booking_date
      patient {
        id
        patient_id
        title
        firstname
        lastname
        dob
        gender
        user {
          id
          username
        }
        appointments {
          nextToken
        }
      }
    }
  }
`;
export const listAppointments = /* GraphQL */ `
  query ListAppointments(
    $filter: ModelAppointmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppointments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        appointment_id
        booking_date
        patient {
          id
          patient_id
          title
          firstname
          lastname
          dob
          gender
        }
      }
      nextToken
    }
  }
`;
