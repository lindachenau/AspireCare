/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      patients {
        items {
          id
          title
          firstname
          lastname
          dob
          gender
          userID
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
      title
      firstname
      lastname
      dob
      gender
      userID
      user {
        id
        patients {
          nextToken
        }
      }
      appointments {
        items {
          id
          booking_date
          patientID
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
        title
        firstname
        lastname
        dob
        gender
        userID
        user {
          id
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
      booking_date
      patientID
      patient {
        id
        title
        firstname
        lastname
        dob
        gender
        userID
        user {
          id
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
        booking_date
        patientID
        patient {
          id
          title
          firstname
          lastname
          dob
          gender
          userID
        }
      }
      nextToken
    }
  }
`;
export const patientsByUser = /* GraphQL */ `
  query PatientsByUser(
    $userID: String
    $sortDirection: ModelSortDirection
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    patientsByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        firstname
        lastname
        dob
        gender
        userID
        user {
          id
        }
        appointments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const appointmentsByPatient = /* GraphQL */ `
  query AppointmentsByPatient(
    $patientID: String
    $sortDirection: ModelSortDirection
    $filter: ModelAppointmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    appointmentsByPatient(
      patientID: $patientID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        booking_date
        patientID
        patient {
          id
          title
          firstname
          lastname
          dob
          gender
          userID
        }
      }
      nextToken
    }
  }
`;
