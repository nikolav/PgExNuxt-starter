import { Q__LIKES_COUNT } from "@/graphql";
import { OrNoValue } from "@/types";

export const useApiLikes = (topicID: string) => {
  const { LIKES_PREFIX, IOEVENT_LIKES_CHANGE, $ISMOUNTED, $ISAUTH } =
    useAppConfig();
  const vars = useApiVariables();

  const {
    load: loadLikes,
    result,
    refetch,
  } = useLazyQuery<{ likeCount: number }>(Q__LIKES_COUNT, { topicID });
  const likeCount = computed(() => result.value?.likeCount || 0);
  const reloadCount = async () => await refetch();

  const topicName = `${LIKES_PREFIX}${topicID}`;
  const isLiked = useLocalStorage<OrNoValue<number>>(topicName, null);

  const IOEVENT = `${IOEVENT_LIKES_CHANGE}:${topicID}`;
  useOnIOEvent(IOEVENT, reloadCount);

  const isMounted = useState($ISMOUNTED);
  const isAuth = useState($ISAUTH);
  watchEffect(() => {
    if (isMounted.value && isAuth.value) loadLikes();
  });

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
