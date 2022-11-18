/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type Mutation = {
  __typename?: "Mutation";
  deleteTicket?: Maybe<Scalars["Void"]>;
  updateTicket: Ticket;
};

export type MutationDeleteTicketArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateTicketArgs = {
  input: TicketInput;
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  ticket: Ticket;
  ticketList: TicketResultPage;
  userInfo?: Maybe<UserInfo>;
  userRoles: Array<Maybe<Scalars["String"]>>;
};

export type QueryTicketArgs = {
  id: Scalars["ID"];
};

export type QueryTicketListArgs = {
  filter?: InputMaybe<TicketFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<TicketOrderByInput>>>;
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type Ticket = {
  __typename?: "Ticket";
  airline?: Maybe<Scalars["String"]>;
  airportFrom?: Maybe<Scalars["String"]>;
  departureDate?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  number?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["BigDecimal"]>;
};

export type TicketFilterInput = {
  departureDateMax?: InputMaybe<Scalars["DateTime"]>;
  departureDateMin?: InputMaybe<Scalars["DateTime"]>;
  number?: InputMaybe<Scalars["String"]>;
  priceMax?: InputMaybe<Scalars["BigDecimal"]>;
  priceMin?: InputMaybe<Scalars["BigDecimal"]>;
};

export type TicketInput = {
  airline?: InputMaybe<Scalars["String"]>;
  airportFrom?: InputMaybe<Scalars["String"]>;
  departureDate?: InputMaybe<Scalars["DateTime"]>;
  id?: InputMaybe<Scalars["ID"]>;
  number?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["BigDecimal"]>;
};

export type TicketOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<TicketOrderByProperty>;
};

export enum TicketOrderByProperty {
  Airline = "AIRLINE",
  AirportFrom = "AIRPORT_FROM",
  DepartureDate = "DEPARTURE_DATE",
  Number = "NUMBER",
  Price = "PRICE",
}

export type TicketResultPage = {
  __typename?: "TicketResultPage";
  content?: Maybe<Array<Maybe<Ticket>>>;
  totalElements: Scalars["Long"];
};

export type UserInfo = {
  __typename?: "UserInfo";
  username?: Maybe<Scalars["String"]>;
};

export type Ticket_TicketListQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type Ticket_TicketListQuery = {
  __typename?: "Query";
  ticket: {
    __typename?: "Ticket";
    airline?: string | null;
    airportFrom?: string | null;
    departureDate?: any | null;
    id?: string | null;
    number?: string | null;
    price?: any | null;
  };
};

export type UpdateTicket_TicketListMutationVariables = Exact<{
  input: TicketInput;
}>;

export type UpdateTicket_TicketListMutation = {
  __typename?: "Mutation";
  updateTicket: {
    __typename?: "Ticket";
    airline?: string | null;
    airportFrom?: string | null;
    departureDate?: any | null;
    id?: string | null;
    number?: string | null;
    price?: any | null;
  };
};

export type TicketList_TicketListQueryVariables = Exact<{
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<
    Array<InputMaybe<TicketOrderByInput>> | InputMaybe<TicketOrderByInput>
  >;
  filter?: InputMaybe<TicketFilterInput>;
}>;

export type TicketList_TicketListQuery = {
  __typename?: "Query";
  ticketList: {
    __typename?: "TicketResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Ticket";
      airline?: string | null;
      airportFrom?: string | null;
      departureDate?: any | null;
      id?: string | null;
      number?: string | null;
      price?: any | null;
    } | null> | null;
  };
};

export type DeleteTicket_TicketListMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteTicket_TicketListMutation = {
  __typename?: "Mutation";
  deleteTicket?: any | null;
};

export type UserRoles_TicketListQueryVariables = Exact<{
  [key: string]: never;
}>;

export type UserRoles_TicketListQuery = {
  __typename?: "Query";
  userRoles: Array<string | null>;
};

export const Ticket_TicketListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Ticket_TicketList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ticket" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "airline" } },
                { kind: "Field", name: { kind: "Name", value: "airportFrom" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "departureDate" },
                },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "number" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Ticket_TicketListQuery,
  Ticket_TicketListQueryVariables
>;
export const UpdateTicket_TicketListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateTicket_TicketList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TicketInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTicket" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "airline" } },
                { kind: "Field", name: { kind: "Name", value: "airportFrom" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "departureDate" },
                },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "number" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateTicket_TicketListMutation,
  UpdateTicket_TicketListMutationVariables
>;
export const TicketList_TicketListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TicketList_TicketList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TicketOrderByInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "TicketFilterInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ticketList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "airline" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "airportFrom" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "departureDate" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "number" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TicketList_TicketListQuery,
  TicketList_TicketListQueryVariables
>;
export const DeleteTicket_TicketListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteTicket_TicketList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTicket" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteTicket_TicketListMutation,
  DeleteTicket_TicketListMutationVariables
>;
export const UserRoles_TicketListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserRoles_TicketList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "userRoles" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserRoles_TicketListQuery,
  UserRoles_TicketListQueryVariables
>;
