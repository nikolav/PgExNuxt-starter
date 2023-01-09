import { useStoreAuth } from "@/store";
import {
  Q__COLLECTION_LIST_DOCS,
  QM__COLLECTION_PUT_DOC,
  QM__COLLECTION_RM_DOC,
} from "@/graphql";
import { IDoc, IUseApiCollectionFormatDocData, IInputDoc } from "@/types";
import { map, pick } from "@/utils";

const defaultFormatDocData: IUseApiCollectionFormatDocData = (data) =>
  map(data, (node) => ({ ...node, data: JSON.parse(node.data as string) }));

export const useApiCollection = (
  topicID: string,
  format: IUseApiCollectionFormatDocData = defaultFormatDocData
) => {
  const { $ISAUTH, $ISMOUNTED } = useAppConfig();
  const auth = useStoreAuth();
  const userId = computed(() => auth.user?.id || "");

  const {
    load: loadDocs,
    result,
    refetch,
  } = useLazyQuery<{ listDocsByTopic: IDoc[] }>(Q__COLLECTION_LIST_DOCS, {
    topicID,
  });
  const { mutate: mutatePutDoc } = useMutation<IDoc>(QM__COLLECTION_PUT_DOC);
  const { mutate: mutateRmDoc } = useMutation<number>(QM__COLLECTION_RM_DOC);

  const reloadDocs = async () => await refetch();
  const docs = computed(() => format(result.value?.listDocsByTopic || []));

  // load docs @auth.ready
  const isMounted = useState($ISMOUNTED);
  const isAuth = useState($ISAUTH);
  watchEffect(() => {
    if (isMounted.value && isAuth.value) loadDocs();
  });

  const { IOEVENT_COLLECTION_CHANGE } = useAppConfig();
  const { $socket } = useNuxtApp();
  const IOEVENT = `${IOEVENT_COLLECTION_CHANGE}:${userId.value}:${topicID}`;
  $socket?.on(IOEVENT, reloadDocs);
  onUnmounted(() => $socket?.off(IOEVENT, reloadDocs));

  // jsonData: String!
  // tag: String!
  // id: ID
  // docId: String
  const put = async (doc: IInputDoc) =>
    await mutatePutDoc({
      d: {
        jsonData: JSON.stringify(doc.data),
        tag: topicID,
        ...pick(doc, ["id", "docId"]),
      },
    });
  const rm = async (id: string) => await mutateRmDoc({ id });

  return {
    docs,
    put,
    rm,
    reload: reloadDocs,
  };
};