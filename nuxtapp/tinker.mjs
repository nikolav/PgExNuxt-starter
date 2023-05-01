
import { Observable } from "rxjs";

; (async () => {

  const stream = new Observable((sub) => {
    setTimeout(() => {
      sub.next(`122`);
    });

  });
  stream.subscribe((...args) => console.log({ args }));

  console.log({ time: Date.now() })
})();
