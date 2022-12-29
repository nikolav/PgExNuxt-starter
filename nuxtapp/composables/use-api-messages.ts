import {
  Q__MESSAGES_LIST,
  QM__MESSAGES_POST,
  QM__MESSAGES_DELETE,
} from "@/graphql";
import { IMessage } from "@/types";

export const useApiMessages = () => {
  const { IOEVENT_MESSAGES_CHANGE, $ISMOUNTED, $ISAUTH } = useAppConfig();
  
  // https://v4.apollo.vuejs.org/api/use-query.html#usequery
  const {
    load: loadMessages,
    result: data,
    refetch,
  } = useLazyQuery<{ messages: IMessage[] }>(Q__MESSAGES_LIST);
  const ls = computed(() => data.value?.messages);

  // https://v4.apollo.vuejs.org/api/use-mutation.html#usemutation
  const { mutate: mutatePost } = useMutation(QM__MESSAGES_POST);
  const { mutate: mutateDelete } = useMutation(QM__MESSAGES_DELETE);
  
  const reloadQuery = async () => await refetch();
  
  const { $socket } = useNuxtApp();
  $socket?.on(IOEVENT_MESSAGES_CHANGE, reloadQuery);
  onUnmounted(() => $socket?.off(IOEVENT_MESSAGES_CHANGE, reloadQuery));

  const isMounted = useState($ISMOUNTED);
  const isAuth = useState($ISAUTH);
  watchEffect(() => {
    if (isMounted.value && isAuth.value) loadMessages();
  });

  const post = async (content: string) => {
    await mutatePost({ content });
  };

  const rm = async (id: string) => {
    await mutateDelete({ id });
  };

  return {
    ls,
    post,
    rm,
    reload: reloadQuery,
  };
};
