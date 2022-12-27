import { useStoreAuth } from "@/store";
import {
  Q__COMMENTS_LIST_BY_TOPIC,
  QM__COMMENTS_ADD,
  QM__COMMENTS_REMOVE,
} from "@/graphql";
import { IComment, ICommentInput } from "@/types";

export const useApiComments = (topicID: string) => {
  const auth = useStoreAuth();
  const userId = computed(() => auth.user?.id || "");

  const { result, refetch } = useQuery<{ listCommentsByTopic: IComment[] }>(
    Q__COMMENTS_LIST_BY_TOPIC,
    { topicID }
  );
  const { mutate: mutateCommentsAdd } = useMutation(QM__COMMENTS_ADD);
  const { mutate: mutateCommentsRemove } = useMutation(QM__COMMENTS_REMOVE);

  const lsComments = computed(() => result.value?.listCommentsByTopic || []);
  const reloadComments = async () => await refetch();
  
  const { IOEVENT_COMMENTS_CHANGE } = useAppConfig();
  const { $socket } = useNuxtApp();
  const IOEVENT = `${IOEVENT_COMMENTS_CHANGE}:${topicID}`;

  $socket?.on(IOEVENT, reloadComments);
  onUnmounted(() => $socket?.off(IOEVENT, reloadComments));

  const add = async (comment: ICommentInput) => {
    const newComment = {
      topicID,
      ...(userId.value ? { userId: userId.value } : null),
      ...comment,
    };
    await mutateCommentsAdd({ comment: newComment });
  };

  const remove = async (commentId: string) => {
    await mutateCommentsRemove({ id: commentId });
  };

  return {
    ls: lsComments,
    add,
    remove,
    reload: reloadComments,
  };
};
