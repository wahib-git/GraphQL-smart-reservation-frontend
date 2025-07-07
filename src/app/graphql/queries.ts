import { gql } from 'apollo-angular';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
      role
      createdAt
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      role
      createdAt
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      email
      role
      createdAt
    }
  }
`;

export const GET_SPACES = gql`
  query GetSpaces($type: String) {
    getSpaces(type: $type) {
      id
      name
      type
      capacity
      hourlyRate
      description
      amenities
      isActive
    
    }
  }
`;

export const GET_SPACE_BY_ID = gql`
  query GetSpaceById($id: ID!) {
    getSpaceById(id: $id) {
      id
      name
      type
      capacity
      hourlyRate
      description
      amenities
      isActive
    }
  }
`;

export const GET_MY_RESERVATIONS = gql`
  query GetMyReservations {
    getMyReservations {
      id
      user {
        id
        name
        email
      }
      space {
        id
        name
        type
        hourlyRate
      }
      startTime
      endTime
      status
      createdAt
    }
  }
`;

export const GET_SPACE_RESERVATIONS = gql`
  query GetSpaceReservations($spaceId: ID!) {
    getSpaceReservations(spaceId: $spaceId) {
      id
      user {
        id
        name
        email
      }
      space {
        id
        name
        type
      }
      startTime
      endTime
      status
      createdAt
    }
  }
`;

export const GET_RESERVATION_BY_ID = gql`
  query GetReservationById($id: ID!) {
    getReservationById(id: $id) {
      id
      user {
        id
        name
        email
      }
      space {
        id
        name
        type
        hourlyRate
      }
      startTime
      endTime
      status
      createdAt
    }
  }
`;

export const CHECK_SPACE_AVAILABILITY = gql`
  query CheckSpaceAvailability($spaceId: ID!, $startTime: String!, $endTime: String!) {
    checkSpaceAvailability(spaceId: $spaceId, startTime: $startTime, endTime: $endTime)
  }
`;