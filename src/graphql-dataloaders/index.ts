import { userByIdLoader } from './user-by-id.dataloader';
import * as coreServices from '@app/core/services';

export const initLoaders = (services: typeof coreServices) => {
  const loaders = {
    userById: userByIdLoader(services),
  };

  return loaders;
};
