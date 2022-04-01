import { ApolloClient, InMemoryCache } from "@apollo/client";

const link = "https://ohco.kr/graph";

export const client = new ApolloClient({
  uri: link,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});
