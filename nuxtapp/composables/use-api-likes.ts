import { Q__LIKES_COUNT } from "@/graphql";

export const useApiLikes = (topicID: string) => {
  const { LIKES_PREFIX, IOEVENT_LIKES_CHANGE } = useAppConfig();
  const vars = useApiVariables();
  
  const { result, refetch } = useQuery<{ likeCount: number }>(Q__LIKES_COUNT, 
    { topicID }
  );
  const likeCount = computed(() => result.value?.likeCount || 0);
  const reloadCount = async () => await refetch();

  const topicName = `${LIKES_PREFIX}${topicID}`;
  const isLiked = useLocalStorage<number | null>(`.isLiked::${topicID}`, null);
  
  const { $socket } = useNuxtApp();
  const IOEVENT = `${IOEVENT_LIKES_CHANGE}:${topicID}`;
  $socket?.on(IOEVENT, reloadCount);
  onUnmounted(() => $socket?.off(IOEVENT, reloadCount));

  const like = async () => {
    if (!isLiked.value) {
      isLiked.value = Date.now();
      await vars.put(topicName, `${likeCount.value + 1}`);
    }
  };

  const unlike = async () => {
    if (isLiked.value) {
      isLiked.value = null;
      if (0 < likeCount.value) {
        await vars.put(topicName, `${likeCount.value - 1}`);
      }
    }
  };

  return {
    likeCount,
    like,
    unlike,
    isLiked,
    reload: reloadCount,
  };
};
