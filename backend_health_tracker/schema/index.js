import { mergeTypeDefs } from '@graphql-tools/merge';
import { userType } from '../type/user.js';
import { trainnerType } from '../type/trainer.js';
import { progressType } from '../type/progress.js';
import { loginResponseType } from '../type/loginResponse.js'; // jangan lupa import ini
import { queryDefs } from '../query/query.js';
import { mutationDefs } from '../mutations/mutation.js';

export const typeDefs = mergeTypeDefs([userType, trainnerType, progressType, loginResponseType, queryDefs, mutationDefs]);
