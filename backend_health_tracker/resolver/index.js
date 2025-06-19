import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./userResolver.js";

import { progressResolver } from "./progressResolver.js";
import { historyResolver } from "./historyResolver.js";
import { reminderResolver } from "./reminderResolver.js";

export const resolvers = mergeResolvers([
  userResolver,
  progressResolver,
  historyResolver,
  reminderResolver,
]);
