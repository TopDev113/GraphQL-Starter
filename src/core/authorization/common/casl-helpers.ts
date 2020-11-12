/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Ability,
  ClaimRawRule,
  LegacyClaimRawRule,
  SubjectRawRule,
  LegacySubjectRawRule,
  SubjectType,
  ForbiddenError,
} from '@casl/ability';

ForbiddenError.setDefaultMessage('Unauthorized!');

export function createAbility<A extends string, S extends string | object>(
  rules: Array<
    | ClaimRawRule<string>
    | LegacyClaimRawRule<string>
    | SubjectRawRule<string, SubjectType, unknown>
    | LegacySubjectRawRule<string, SubjectType, unknown>
  >,
) {
  return new Ability<[A, S]>(rules as any);
}
