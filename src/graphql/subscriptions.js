/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient {
    onCreatePatient {
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
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient {
    onUpdatePatient {
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
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient {
    onDeletePatient {
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
export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment {
    onCreateAppointment {
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
export const onUpdateAppointment = /* GraphQL */ `
  subscription OnUpdateAppointment {
    onUpdateAppointment {
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
export const onDeleteAppointment = /* GraphQL */ `
  subscription OnDeleteAppointment {
    onDeleteAppointment {
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
