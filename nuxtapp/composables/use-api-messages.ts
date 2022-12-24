import {
  Q__MESSAGES_LIST,
  QM__MESSAGES_POST,
  QM__MESSAGES_DELETE,
} from "@/graphql";
import { IMessage } from "@/types";
import { useStoreAuth } from "@/store";

export const useApiMessages = () => {
  const auth = useStoreAuth();
  const { $socket } = useNuxtApp();
  const { IOEVENT_MESSAGES_CHANGE } = useAppConfig();

  // https://v4.apollo.vuejs.org/api/use-query.html#usequery
  const { result: data, refetch } = useQuery<IMessage[]>(Q__MESSAGES_LIST);

  // https://v4.apollo.vuejs.org/api/use-mutation.html#usemutation
  const { mutate: mutatePost } = useMutation(QM__MESSAGES_POST);
  const { mutate: mutateDelete } = useMutation(QM__MESSAGES_DELETE);
  
  const reloadQuery = async () => await refetch();

  $socket?.on(IOEVENT_MESSAGES_CHANGE, reloadQuery);
  onUnmounted(() => $socket?.off(IOEVENT_MESSAGES_CHANGE, reloadQuery));

  watch(
    () => auth.token?.accessToken,
    async (AT) => {
      if (AT) {
        await reloadQuery();
      }
    }
  );

  const post = async (content: string) => {
    await mutatePost({ content });
  };

  const rm = async (id: string) => {
    await mutateDelete({ id });
  };

  return {
    ls: data,
    post,
    rm,
    reload: reloadQuery,
  };
};
