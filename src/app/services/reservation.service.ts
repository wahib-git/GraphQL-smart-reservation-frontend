import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, map, catchError, throwError } from "rxjs";
import {
  Reservation,
  CreateReservationInput,
  UpdateReservationStatusInput,
  SpaceAvailabilityInput,
} from "../types/graphql.types";
import {
  GET_MY_RESERVATIONS,
  GET_SPACE_RESERVATIONS,
  GET_RESERVATION_BY_ID,
  CHECK_SPACE_AVAILABILITY,
} from "../graphql/queries";
import {
  CREATE_RESERVATION,
  UPDATE_RESERVATION_STATUS,
  CANCEL_RESERVATION,
} from "../graphql/mutations";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  constructor(private apollo: Apollo) {}

  getMyReservations(): Observable<Reservation[]> {
    return this.apollo
      .query<{ getMyReservations: Reservation[] }>({
        query: GET_MY_RESERVATIONS,
        fetchPolicy: "cache-first", // changed from 'cache-and-network'
      })
      .pipe(
        map((result) => result.data.getMyReservations),
        catchError((error) => {
          console.error(
            "Erreur lors de la récupération des réservations:",
            error
          );
          return throwError(() => error);
        })
      );
  }

  getSpaceReservations(spaceId: string): Observable<Reservation[]> {
    return this.apollo
      .query<{ getSpaceReservations: Reservation[] }>({
        query: GET_SPACE_RESERVATIONS,
        variables: { spaceId },
        fetchPolicy: "cache-first", // changed from 'cache-and-network'
      })
      .pipe(
        map((result) => result.data.getSpaceReservations),
        catchError((error) => {
          console.error(
            "Erreur lors de la récupération des réservations de l'espace:",
            error
          );
          return throwError(() => error);
        })
      );
  }

  getReservationById(id: string): Observable<Reservation> {
    return this.apollo
      .query<{ getReservationById: Reservation }>({
        query: GET_RESERVATION_BY_ID,
        variables: { id },
      })
      .pipe(
        map((result) => result.data.getReservationById),
        catchError((error) => {
          console.error(
            "Erreur lors de la récupération de la réservation:",
            error
          );
          return throwError(() => error);
        })
      );
  }

  checkSpaceAvailability(input: SpaceAvailabilityInput): Observable<boolean> {
    return this.apollo
      .query<{ checkSpaceAvailability: boolean }>({
        query: CHECK_SPACE_AVAILABILITY,
        variables: input,
        fetchPolicy: "no-cache",
      })
      .pipe(
        map((result) => result.data.checkSpaceAvailability),
        catchError((error) => {
          console.error(
            "Erreur lors de la vérification de disponibilité:",
            error
          );
          return throwError(() => error);
        })
      );
  }

  createReservation(input: CreateReservationInput): Observable<Reservation> {
    return this.apollo
      .mutate<{ createReservation: Reservation }>({
        mutation: CREATE_RESERVATION,
        variables: { input },
        refetchQueries: [{ query: GET_MY_RESERVATIONS }],
      })
      .pipe(
        map((result) => result.data!.createReservation),
        catchError((error) => {
          console.error("Erreur lors de la création de la réservation:", error);
          return throwError(() => error);
        })
      );
  }

  updateReservationStatus(
    input: UpdateReservationStatusInput
  ): Observable<Reservation> {
    return this.apollo
      .mutate<{ updateReservationStatus: Reservation }>({
        mutation: UPDATE_RESERVATION_STATUS,
        variables: { input },
        refetchQueries: [{ query: GET_MY_RESERVATIONS }],
      })
      .pipe(
        map((result) => result.data!.updateReservationStatus),
        catchError((error) => {
          console.error(
            "Erreur lors de la mise à jour du statut de la réservation:",
            error
          );
          return throwError(() => error);
        })
      );
  }

  cancelReservation(id: string): Observable<Reservation> {
    return this.apollo
      .mutate<{ cancelReservation: Reservation }>({
        mutation: CANCEL_RESERVATION,
        variables: { id },
        refetchQueries: [{ query: GET_MY_RESERVATIONS }],
      })
      .pipe(
        map((result) => result.data!.cancelReservation),
        catchError((error) => {
          console.error(
            "Erreur lors de l'annulation de la réservation:",
            error
          );
          return throwError(() => error);
        })
      );
  }

  getStatusLabel(status: string): string {
    const statuses: { [key: string]: string } = {
      pending: "En attente",
      confirmed: "Confirmée",
      cancelled: "Annulée",
    };
    return statuses[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      pending: "reservation-status-pending",
      confirmed: "reservation-status-confirmed",
      cancelled: "reservation-status-cancelled",
    };
    return classes[status] || "";
  }

  canCancelReservation(reservation: Reservation): boolean {
    const now = new Date();
    const startTime = new Date(reservation.startTime);
    return reservation.status !== "cancelled" && startTime > now;
  }
}
