/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
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
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
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
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
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
export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment(
    $input: CreateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    createAppointment(input: $input, condition: $condition) {
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
export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment(
    $input: UpdateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    updateAppointment(input: $input, condition: $condition) {
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
export const deleteAppointment = /* GraphQL */ `
  mutation DeleteAppointment(
    $input: DeleteAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    deleteAppointment(input: $input, condition: $condition) {
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
