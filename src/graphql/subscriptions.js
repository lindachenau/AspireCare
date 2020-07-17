/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateUserMember = /* GraphQL */ `
  subscription OnCreateUserMember {
    onCreateUserMember {
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
export const onUpdateUserMember = /* GraphQL */ `
  subscription OnUpdateUserMember {
    onUpdateUserMember {
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
export const onDeleteUserMember = /* GraphQL */ `
  subscription OnDeleteUserMember {
    onDeleteUserMember {
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
export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient {
    onCreatePatient {
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
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient {
    onUpdatePatient {
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
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient {
    onDeletePatient {
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
export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment {
    onCreateAppointment {
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
export const onUpdateAppointment = /* GraphQL */ `
  subscription OnUpdateAppointment {
    onUpdateAppointment {
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
export const onDeleteAppointment = /* GraphQL */ `
  subscription OnDeleteAppointment {
    onDeleteAppointment {
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
