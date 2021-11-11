import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "/api/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token =
        typeof window === "object" ? localStorage.getItem("token") : "";
    return {
        headers: {
            ...headers,
            authorization: token || "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
