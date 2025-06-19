import { mergeTypeDefs } from "@graphql-tools/merge";

// Import semua definisi tipe (type definitions)
import { userType } from "./user.js";
import { progressType } from "./progress.js";
import { historyType } from "./history.js";
import { loginResponseType } from "./loginResponse.js";
import { queryDefs } from "../query/query.js";
import { mutationDefs } from "../mutations/mutation.js";
import { reminderTypeDefs } from "./reminder.js";

// Gabungkan semua typeDefs menjadi satu schema utama
export const typeDefs = mergeTypeDefs([
  userType,
  progressType,
  historyType,
  loginResponseType,
  queryDefs,
  mutationDefs,
  reminderTypeDefs,
]);
