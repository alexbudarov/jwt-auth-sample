import { Ticket } from "../../gql/graphql";

export function getTicketDisplayName(entityInstance?: Ticket | null): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
