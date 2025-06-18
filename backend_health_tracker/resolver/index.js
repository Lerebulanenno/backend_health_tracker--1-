import { mergeResolvers } from '@graphql-tools/merge';
import { userResolver } from './userResolver.js';
import { trainnerResolver } from './trainnerResolver.js';
import { progressResolver } from './progressResolver.js';

export const resolvers = mergeResolvers([userResolver, trainnerResolver, progressResolver]);
