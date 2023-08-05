import firebase from "@/services/firebase";
import {
  ref as storageRef,
  getDownloadURL,
  list,
  uploadBytesResumable,
  deleteObject,
  StorageReference,
  getMetadata,
} from "firebase/storage";
import { TFirebaseStorageNode } from "@/types";

const { storage } = firebase;

export const useFirebaseStorage = (pathOrId: string) => {
  const { STORAGE_LIST_MAX_RESULTS, $ISMOUNTED } = useAppConfig();

  const $mounted = useState($ISMOUNTED);

  const storageRefRoot = storageRef(storage, pathOrId);
  const nodes = ref<TFirebaseStorageNode<StorageReference>[]>([]);

  const error = ref();
  const clearError = () => {
    error.value = null;
  };

  const uploadProgess = ref(0);

  // get ref{} for file
  const mkFileRef = (filename: string) => storageRef(storageRefRoot, filename);

  // list nodes @ref
  const refresh = async () => {
    try {
      clearError();
      const root$ = storageRefRoot;

      nodes.value = [];
      for (
        let page = await list(root$, { maxResults: STORAGE_LIST_MAX_RESULTS });
        ;
        page = await list(root$, {
          maxResults: STORAGE_LIST_MAX_RESULTS,
          pageToken: page.nextPageToken,
        })
      ) {
        nodes.value = [...nodes.value, ...page.items];
        if (!page.nextPageToken) break;
      }
    } catch (err) {
      error.value = err;
    }
  };

  // store file @path
  const upload = (file: any, filename: string) =>
    new Promise((resolve, reject) => {
      try {
        clearError();
        uploadProgess.value = 0;

        const path$ = mkFileRef(filename);
        const uploadTask = uploadBytesResumable(path$, file);
        uploadTask.on(
          "state_changed",

          // progress(),
          (snapshot) => {
            uploadProgess.value =
              snapshot.bytesTransferred / snapshot.totalBytes;
          },

          // error(),
          (err) => {
            error.value = err;
            reject(err);
          },

          // done()
          async () => {
            await refresh();
            resolve(uploadTask);
          }
        );
      } catch (err) {
        error.value = err;
        reject(err);
      }
    });

  // delete a file
  const rm = async (path$: StorageReference) => {
    try {
      clearError();
      await deleteObject(path$);
    } catch (err) {
      error.value = err;
    } finally {
      await refresh();
    }
  };

  // preview url
  const url = async (path$: StorageReference) => {
    let dl = "";
    try {
      dl = await getDownloadURL(path$);
    } catch (err) {
      error.value = err;
    }
    return dl;
  };

  const info = async (path$: StorageReference) => {
    try {
      clearError();
      return await getMetadata(path$);
    } catch (err) {
      error.value = err;
    }
  };

  watchEffect(() => {
    if ($mounted.value) refresh();
  });

  return {
    error,
    nodes,
    uploadProgess,
    root: storageRefRoot,
    //
    upload,
    rm,
    url,
    info,
    mkFileRef,
    refresh,
    clearError,
  };
};
