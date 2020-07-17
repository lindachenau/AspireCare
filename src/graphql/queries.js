/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      patients {
        items {
          id
          userID
          memberID
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
      users {
        items {
          id
          userID
          memberID
        }
        nextToken
      }
      appointments {
        items {
          id
          time
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
        users {
          nextToken
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
      time
      status {
        category
      }
      patientID
      patient {
        id
        title
        firstname
        lastname
        dob
        gender
        users {
          nextToken
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
        time
        status {
          category
        }
        patientID
        patient {
          id
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
