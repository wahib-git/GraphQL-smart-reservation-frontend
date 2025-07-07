import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, map, catchError, throwError } from "rxjs";
import {
  Space,
  CreateSpaceInput,
  UpdateSpaceInput,
} from "../types/graphql.types";
import { GET_SPACES, GET_SPACE_BY_ID } from "../graphql/queries";
import { CREATE_SPACE, UPDATE_SPACE, DELETE_SPACE } from "../graphql/mutations";

@Injectable({
  providedIn: "root",
})
export class SpaceService {
  constructor(private apollo: Apollo) {}

  getSpaces(type?: string): Observable<Space[]> {
    return this.apollo
      .query<{ getSpaces: Space[] }>({
        query: GET_SPACES,
        variables: { type },
        fetchPolicy: "cache-first", // <-- fix here
      })
      .pipe(
        map((result) => result.data.getSpaces),
        catchError((error) => {
          console.error("Erreur lors de la récupération des espaces:", error);
          return throwError(() => error);
        })
      );
  }

  getSpaceById(id: string): Observable<Space> {
    return this.apollo
      .query<{ getSpaceById: Space }>({
        query: GET_SPACE_BY_ID,
        variables: { id },
      })
      .pipe(
        map((result) => result.data.getSpaceById),
        catchError((error) => {
          console.error("Erreur lors de la récupération de l'espace:", error);
          return throwError(() => error);
        })
      );
  }

  createSpace(input: CreateSpaceInput): Observable<Space> {
    return this.apollo
      .mutate<{ createSpace: Space }>({
        mutation: CREATE_SPACE,
        variables: { input },
        refetchQueries: [{ query: GET_SPACES }],
      })
      .pipe(
        map((result) => result.data!.createSpace),
        catchError((error) => {
          console.error("Erreur lors de la création de l'espace:", error);
          return throwError(() => error);
        })
      );
  }

  updateSpace(input: UpdateSpaceInput): Observable<Space> {
    return this.apollo
      .mutate<{ updateSpace: Space }>({
        mutation: UPDATE_SPACE,
        variables: { input },
        refetchQueries: [
          { query: GET_SPACES },
          { query: GET_SPACE_BY_ID, variables: { id: input.id } },
        ],
      })
      .pipe(
        map((result) => result.data!.updateSpace),
        catchError((error) => {
          console.error("Erreur lors de la mise à jour de l'espace:", error);
          return throwError(() => error);
        })
      );
  }

  deleteSpace(id: string): Observable<Space> {
    return this.apollo
      .mutate<{ deleteSpace: Space }>({
        mutation: DELETE_SPACE,
        variables: { id },
        refetchQueries: [{ query: GET_SPACES }],
      })
      .pipe(
        map((result) => result.data!.deleteSpace),
        catchError((error) => {
          console.error("Erreur lors de la suppression de l'espace:", error);
          return throwError(() => error);
        })
      );
  }

  getSpaceTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      bureau_prive: "Bureau privé",
      open_space: "Open Space",
      salle_reunion: "Salle de réunion",
      espace_detente: "Espace détente",
    };
    return types[type] || type;
  }
}
