// https://www.apollographql.com/docs/graphql-tools/scalars#Using-a-package

import { GraphQLDateTime, GraphQLDate, GraphQLTime } from 'graphql-iso-date';

export const DateTime = GraphQLDateTime;
export const Date = GraphQLDate;
export const Time = GraphQLTime;
