import { gql } from 'apollo-angular';

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        name
        email
        role
        createdAt
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
        role
        createdAt
      }
    }
  }
`;

export const CREATE_SPACE = gql`
  mutation CreateSpace($input: CreateSpaceInput!) {
    createSpace(input: $input) {
      id
      name
      type
      capacity
      pricePerHour
      description
      amenities
      isActive
      createdAt
    }
  }
`;

export const UPDATE_SPACE = gql`
  mutation UpdateSpace($input: UpdateSpaceInput!) {
    updateSpace(input: $input) {
      id
      name
      type
      capacity
      pricePerHour
      description
      amenities
      isActive
      createdAt
    }
  }
`;

export const DELETE_SPACE = gql`
  mutation DeleteSpace($id: ID!) {
    deleteSpace(id: $id) {
      id
      isActive
    }
  }
`;

export const CREATE_RESERVATION = gql`
  mutation CreateReservation($input: CreateReservationInput!) {
    createReservation(input: $input) {
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
        pricePerHour
      }
      startTime
      endTime
      status
      totalPrice
      createdAt
    }
  }
`;

export const UPDATE_RESERVATION_STATUS = gql`
  mutation UpdateReservationStatus($input: UpdateReservationStatusInput!) {
    updateReservationStatus(input: $input) {
      id
      status
    }
  }
`;

export const CANCEL_RESERVATION = gql`
  mutation CancelReservation($id: ID!) {
    cancelReservation(id: $id) {
      id
      status
    }
  }
`;