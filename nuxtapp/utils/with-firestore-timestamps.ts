import { DocumentData, serverTimestamp } from "firebase/firestore";
import assign from "lodash/assign";

export const withFirestoreTimestamp = (field: string) => (d: DocumentData) =>
  assign(d, { [field]: serverTimestamp() });

export const withCreatedAt = withFirestoreTimestamp("createdAt");
export const withUpdatedAt = withFirestoreTimestamp("updatedAt");
