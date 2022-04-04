import { ApolloClient, InMemoryCache } from "@apollo/client";

const link = "http://localhost:8000/graphql";

export const client = new ApolloClient({
  uri: link,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});
