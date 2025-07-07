import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, map, catchError, throwError } from "rxjs";
import { User } from "../types/graphql.types";
import { GET_USERS, GET_USER_BY_ID } from "../graphql/queries";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers(): Observable<User[]> {
    return this.apollo
      .query<{ getUsers: User[] }>({
        query: GET_USERS,
        fetchPolicy: "cache-first", // <-- fix here
      })
      .pipe(
        map((result) => result.data.getUsers),
        catchError((error) => {
          console.error(
            "Erreur lors de la récupération des utilisateurs:",
            error
          );
          return throwError(() => error);
        })
      );
  }

  getUserById(id: string): Observable<User> {
    return this.apollo
      .query<{ getUserById: User }>({
        query: GET_USER_BY_ID,
        variables: { id },
      })
      .pipe(
        map((result) => result.data.getUserById),
        catchError((error) => {
          console.error(
            "Erreur lors de la récupération de l'utilisateur:",
            error
          );
          return throwError(() => error);
        })
      );
  }

  getRoleLabel(role: string): string {
    const roles: { [key: string]: string } = {
      admin: "Administrateur",
      membre: "Membre",
    };
    return roles[role] || role;
  }
}
