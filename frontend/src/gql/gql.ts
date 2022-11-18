/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  query Ticket_TicketList($id: ID!) {\n  ticket(id: $id) {\n    airline\n    airportFrom\n    departureDate\n    id\n    number\n    price\n  }\n}\n":
    graphql.Ticket_TicketListDocument,
  "\n  mutation UpdateTicket_TicketList($input: TicketInput!) {\n  updateTicket(input: $input) {\n    airline\n    airportFrom\n    departureDate\n    id\n    number\n    price\n  }\n}\n":
    graphql.UpdateTicket_TicketListDocument,
  "\n  query TicketList_TicketList(\n  $page: OffsetPageInput\n  $sort: [TicketOrderByInput]\n  $filter: TicketFilterInput\n) {\n  ticketList(\n    page: $page\n    sort: $sort\n    filter: $filter\n  ) {\n    content {\n      airline\n      airportFrom\n      departureDate\n      id\n      number\n      price\n    }\n    totalElements\n  }\n}\n":
    graphql.TicketList_TicketListDocument,
  "\n  mutation DeleteTicket_TicketList($id: ID!) {\n  deleteTicket(id: $id) \n}\n":
    graphql.DeleteTicket_TicketListDocument,
  "\nquery UserRoles_TicketList {\n    userRoles\n}\n":
    graphql.UserRoles_TicketListDocument,
};

export function gql(
  source: "\n  query Ticket_TicketList($id: ID!) {\n  ticket(id: $id) {\n    airline\n    airportFrom\n    departureDate\n    id\n    number\n    price\n  }\n}\n"
): typeof documents["\n  query Ticket_TicketList($id: ID!) {\n  ticket(id: $id) {\n    airline\n    airportFrom\n    departureDate\n    id\n    number\n    price\n  }\n}\n"];
export function gql(
  source: "\n  mutation UpdateTicket_TicketList($input: TicketInput!) {\n  updateTicket(input: $input) {\n    airline\n    airportFrom\n    departureDate\n    id\n    number\n    price\n  }\n}\n"
): typeof documents["\n  mutation UpdateTicket_TicketList($input: TicketInput!) {\n  updateTicket(input: $input) {\n    airline\n    airportFrom\n    departureDate\n    id\n    number\n    price\n  }\n}\n"];
export function gql(
  source: "\n  query TicketList_TicketList(\n  $page: OffsetPageInput\n  $sort: [TicketOrderByInput]\n  $filter: TicketFilterInput\n) {\n  ticketList(\n    page: $page\n    sort: $sort\n    filter: $filter\n  ) {\n    content {\n      airline\n      airportFrom\n      departureDate\n      id\n      number\n      price\n    }\n    totalElements\n  }\n}\n"
): typeof documents["\n  query TicketList_TicketList(\n  $page: OffsetPageInput\n  $sort: [TicketOrderByInput]\n  $filter: TicketFilterInput\n) {\n  ticketList(\n    page: $page\n    sort: $sort\n    filter: $filter\n  ) {\n    content {\n      airline\n      airportFrom\n      departureDate\n      id\n      number\n      price\n    }\n    totalElements\n  }\n}\n"];
export function gql(
  source: "\n  mutation DeleteTicket_TicketList($id: ID!) {\n  deleteTicket(id: $id) \n}\n"
): typeof documents["\n  mutation DeleteTicket_TicketList($id: ID!) {\n  deleteTicket(id: $id) \n}\n"];
export function gql(
  source: "\nquery UserRoles_TicketList {\n    userRoles\n}\n"
): typeof documents["\nquery UserRoles_TicketList {\n    userRoles\n}\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
