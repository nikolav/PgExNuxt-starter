import axios from "axios";
import FormData from "form-data";

import { useStoreAuth } from "@/store";
import { Q__STORAGE_LIST } from "@/graphql";
import { IStorageFile, IFileToUpload } from "@/types";
import { each } from "@/utils";

export const useApiStorage = () => {
  const { STORAGE_POLLINTERVAL, URL_UPLOAD, URL_STORAGE_DOWNLOAD } =
    useAppConfig();
  const auth = useStoreAuth();
  const AT = computed(() => auth.token?.accessToken);
  const { result, refetch } = useQuery<{ storageListFiles?: IStorageFile[] }>(
    Q__STORAGE_LIST,
    null,
    { pollInterval: STORAGE_POLLINTERVAL }
  );
  const files = computed(() => result.value?.storageListFiles);
  const reloadFiles = async () => await refetch();

  // POST @api/v1/upload
  const upload = (...filesToUpload: IFileToUpload[]): Promise<IStorageFile[]> =>
    new Promise(async (resolve, reject) => {
      let uploadedFiles: IStorageFile[] = [];
      if (!filesToUpload.length) return resolve(uploadedFiles);
      try {
        const fd = new FormData();
        each(filesToUpload, ({ name, file, title, description }) => {
          if (file) {
            fd.append(name, file);
            title && fd.append(`${name}.title`, title);
            description && fd.append(`${name}.description`, description);
          }
        });

        const { data: lsUploadedFiles } = await axios<IStorageFile[]>({
          url: URL_UPLOAD,
          method: "post",
          data: fd,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AT.value}`,
          },
        });
        uploadedFiles = lsUploadedFiles;
      } catch (error) {
        return reject(error);
      }
      resolve(uploadedFiles);
      if (0 < uploadedFiles.length) await reloadFiles();
    });
  //
  return {
    files,
    upload,
    download: null,
    remove: null,
    reload: reloadFiles,
  };
};

/*
const name1 = "file_1";
const title1 = ref("");
const description1 = ref("");
const file1$ = ref(null);
const setFile1 = (e) => {
  file1$.value = e.target.files[0];
};

const name2 = "file_2";
const title2 = ref("");
const description2 = ref("");
const file2$ = ref(null);
const setFile2 = (e) => {
  file2$.value = e.target.files[0];
};

<form>
  <input :name="name1" type="file" @change="setFile1">
  <input type="text" v-model="title1">
  <input type="text" v-model="description1">
  
  <input :name="name2" type="file" @change="setFile2">
  <input type="text" v-model="title2">
  <input type="text" v-model="description2">
</form>

const uploadedFiles = 
  await storage.upload(
    {
      name: name1,
      file: file1$.value,
      title: title1.value,
      description: description1.value,
    },
    {
      name: name2,
      file: file2$.value,
      title: title2.value,
      description: description2.value,
    }
  );

*/
