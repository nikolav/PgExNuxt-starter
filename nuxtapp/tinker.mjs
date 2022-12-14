
import { Subject } from "rxjs";

; (async () => {
  const emitter = new Subject();
  emitter.subscribe((...args) => console.log({args}))

  emitter.next({ data: Math.random() })

})();
