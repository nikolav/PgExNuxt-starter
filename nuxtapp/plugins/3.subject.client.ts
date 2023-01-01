import { Subject } from "rxjs";
import { IAppStreamEvent } from "@/types";
export default defineNuxtPlugin((nuxtApp) => {
  const subj$ = new Subject<IAppStreamEvent>();
  const subscribe = subj$.subscribe.bind(subj$);
  const emit = subj$.next.bind(subj$);
  return { provide: { emit, subscribe } };
});
