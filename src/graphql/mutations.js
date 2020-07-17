/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserMember = /* GraphQL */ `
  mutation CreateUserMember(
    $input: CreateUserMemberInput!
    $condition: ModelUserMemberConditionInput
  ) {
    createUserMember(input: $input, condition: $condition) {
      id
      userID
      memberID
      user {
        id
        patients {
          nextToken
        }
      }
      member {
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
export const updateUserMember = /* GraphQL */ `
  mutation UpdateUserMember(
    $input: UpdateUserMemberInput!
    $condition: ModelUserMemberConditionInput
  ) {
    updateUserMember(input: $input, condition: $condition) {
      id
      userID
      memberID
      user {
        id
        patients {
          nextToken
        }
      }
      member {
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
export const deleteUserMember = /* GraphQL */ `
  mutation DeleteUserMember(
    $input: DeleteUserMemberInput!
    $condition: ModelUserMemberConditionInput
  ) {
    deleteUserMember(input: $input, condition: $condition) {
      id
      userID
      memberID
      user {
        id
        patients {
          nextToken
        }
      }
      member {
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
export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
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
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
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
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
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
export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment(
    $input: CreateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    createAppointment(input: $input, condition: $condition) {
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
export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment(
    $input: UpdateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    updateAppointment(input: $input, condition: $condition) {
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
export const deleteAppointment = /* GraphQL */ `
  mutation DeleteAppointment(
    $input: DeleteAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    deleteAppointment(input: $input, condition: $condition) {
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
