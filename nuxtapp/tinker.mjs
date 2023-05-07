
import { Subject } from "rxjs";

  ; (async () => {

    const subj$ = new Subject();
    const publish = subj$.next.bind(subj$);
    const subscribe = subj$.subscribe.bind(subj$);

    subscribe((...args) => console.log({ args }));

    setTimeout(() => publish({ type: "@1", payload: 122 }));

    console.log({ time: Date.now() })
  })();

// import { Subject } from "rxjs";
// import { IAppStreamEvent } from "@/types";
// // $publish, $subscribe globals
// export default defineNuxtPlugin((_nuxtApp) => {
//   const subj$ = new Subject<IAppStreamEvent>();
//   const publish = subj$.next.bind(subj$);
//   const subscribe = subj$.subscribe.bind(subj$);
//   return { provide: { publish, subscribe } };
// });
