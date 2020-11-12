import { GQL_Resolvers } from '@app/graphql-schema-types';
import { usersResolver } from './users.query';
import { fullNameResolver } from './full-name.query';
import { userPermissionsResolver } from './permissions.query';

const resolvers: GQL_Resolvers = {
  Query: {
    users: usersResolver,
  },
  User: {
    fullName: fullNameResolver,
    permissions: userPermissionsResolver,
  },
};
export default resolvers;
