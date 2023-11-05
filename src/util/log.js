import { add } from "./db"

export const sendLog = async (query) => {
  add(query);
};
