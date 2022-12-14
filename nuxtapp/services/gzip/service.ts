import { gzipSync, gunzipSync } from "zlib";

export const zip = (dataUnzipped: string) => {
  const bufferZipped = gzipSync(dataUnzipped);
  const dataZipped = bufferZipped.toString('base64');
  return dataZipped;
};

export const unzip = (dataZipped: string) => {
  const bufferGzipped = Buffer.from(dataZipped, 'base64');
  const bufferUnzipped = gunzipSync(bufferGzipped);
  const dataUnzipped = bufferUnzipped.toString();
  return dataUnzipped;
};
