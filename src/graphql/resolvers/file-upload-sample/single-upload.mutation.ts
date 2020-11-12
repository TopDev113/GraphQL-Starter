/* eslint-disable @typescript-eslint/no-unused-vars */
import { GQL_MutationResolvers } from '@app/graphql-schema-types';

export const singleUploadResolver: GQL_MutationResolvers['singleUpload'] = async (_, { file }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;

  // 1. Validate file metadata.

  // 2. Stream file contents into cloud storage:
  // https://nodejs.org/api/stream.html

  // 3. Record the file upload in your DB.
  // const id = await recordFile( … )

  return { filename, mimetype, encoding };
};
