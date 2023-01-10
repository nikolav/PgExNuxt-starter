import { Q__COLLECTION_FIND_DOC, QM__COLLECTION_UPDATE_DOC } from "@/graphql";
import { OrNoValue, IData, IUseApiDocFormatData, IDoc } from "@/types";

const defaultFormatDoc: IUseApiDocFormatData = (node) => ({
  ...node,
  data: JSON.parse("string" === typeof node?.data ? node.data : "{}"),
});

// @@useApiDoc
export const useApiDoc = (
  ID: string,
  format: IUseApiDocFormatData = defaultFormatDoc
) => {
  const { $ISAUTH, $ISMOUNTED, IOEVENT_DOC_CHANGE } = useAppConfig();

  const {
    load: readDoc,
    result,
    refetch,
  } = useLazyQuery<{ collectionGetDoc: OrNoValue<IDoc> }>(
    Q__COLLECTION_FIND_DOC,
    { docId: ID }
  );
  const { mutate: mutateUpsertDoc } = useMutation<IDoc>(
    QM__COLLECTION_UPDATE_DOC
  );

  const reloadDoc = async () => await refetch();
  const doc = computed(() =>
    format(result.value?.collectionGetDoc || <IDoc>{})
  );

  const isMounted = useState($ISMOUNTED);
  const isAuth = useState($ISAUTH);
  watchEffect(() => {
    if (isMounted.value && isAuth.value) readDoc();
  });

  const { $socket } = useNuxtApp();
  const IOEVENT = `${IOEVENT_DOC_CHANGE}:${ID}`;
  $socket?.on(IOEVENT, reloadDoc);
  onUnmounted(() => $socket?.off(IOEVENT, reloadDoc));

  const put = async (data: IData) =>
    await mutateUpsertDoc({
      docId: ID,
      jsonData: JSON.stringify(data),
    });

  return {
    doc,
    put,
    reload: reloadDoc,
  };
};
