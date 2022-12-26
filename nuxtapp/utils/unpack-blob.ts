import { STORAGE_FILENAME_BLOB_SIZE } from "@/config";

const unpackBlob = async (
  blob: Blob,
  width = STORAGE_FILENAME_BLOB_SIZE
): Promise<[Blob, string | undefined]> => {
  const filename$ = new Blob([blob.slice(0, width)]);
  const file$ = new Blob([blob.slice(width)]);
  const filename = (await filename$.text()).trim().replace(/\x00/g, "");
  return [file$, filename];
};

export default unpackBlob;
