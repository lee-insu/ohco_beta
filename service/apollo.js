import { ApolloClient, InMemoryCache } from "@apollo/client";

const link = process.env.NEXT_PUBLIC_URL;

export const client = new ApolloClient({
  uri: link,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});
