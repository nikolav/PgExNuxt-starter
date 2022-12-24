import { Q__MESSAGES_LIST, QM__MESSAGES_POST } from "@/graphql";
import { IMessage } from "@/types";
import { useStoreAuth } from "@/store";

export const useApiMessages = () => {
  const auth = useStoreAuth();
  const { $socket } = useNuxtApp();
  const { IOEVENT_MESSAGES_CHANGE } = useAppConfig();
  // https://v4.apollo.vuejs.org/api/use-query.html#usequery
  const { result: data, refetch } = useQuery<IMessage[]>(Q__MESSAGES_LIST);
  // https://v4.apollo.vuejs.org/api/use-mutation.html#usemutation
  const { mutate } = useMutation(QM__MESSAGES_POST);
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
    await mutate({ content });
  };

  return {
    ls: data,
    post,
    reload: reloadQuery,
  };
};
