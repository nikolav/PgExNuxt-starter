import EE from "eventemitter3";
import { TPubSubHandleEvent, TPubSubPublisherFn } from "@/types";

const emitter = new EE();

// https://nuxt.com/docs/guide/directory-structure/plugins#automatically-providing-helpers
export default defineNuxtPlugin(() => {
  const { $EMITTEREVENT } = useAppConfig();

  const publish: TPubSubPublisherFn = (event) =>
    emitter.emit($EMITTEREVENT, event);
  const subscribe: TPubSubHandleEvent = (handle) =>
    emitter.on($EMITTEREVENT, (event, ...rest) => handle(event));

  return {
    provide: {
      emitter: {
        publish,
        subscribe,
      },
    },
  };
});
