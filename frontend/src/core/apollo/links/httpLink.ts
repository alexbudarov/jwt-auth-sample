import { createHttpLink } from "@apollo/client";
// TODO should be discussed with VP
//import {GRAPHQL_URI, REQUEST_SAME_ORIGIN} from "../../../config";
import { GRAPHQL_URI } from "../../../config";

export const httpLink = createHttpLink({
  uri: GRAPHQL_URI
  // credentials: REQUEST_SAME_ORIGIN ? "same-origin" : "include"
});
