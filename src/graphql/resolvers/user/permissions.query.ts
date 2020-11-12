import { GQL_UserResolvers } from '@app/graphql-schema-types';
import { packRules } from '@casl/ability/extra';

export const userPermissionsResolver: GQL_UserResolvers['permissions'] = async (parent, args, { ability, req }) => {
  if (req.user?.id === parent.id) {
    return packRules(ability.rules);
  }
  return null;
};
