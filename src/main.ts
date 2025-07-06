import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { InMemoryCache } from "@apollo/client/core";
import { routes } from "./app/app.routes";
import { setContext } from "@apollo/client/link/context";

function getToken() {
  return localStorage.getItem("coworking_token");
}

export function apolloOptionsFactory(httpLink: HttpLink) {
  const http = httpLink.create({ uri: "http://localhost:4000/graphql" });
  const auth = setContext(() => {
    const token = getToken();
    return {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
  });
  return {
    cache: new InMemoryCache(),
    link: auth.concat(http),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
      },
    },
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule, ApolloModule),
    {
      provide: APOLLO_OPTIONS,
      useFactory: apolloOptionsFactory,
      deps: [HttpLink],
    },
  ],
}).catch((err) => console.error(err));
