
import { Observable } from "rxjs";

; (async () => {

  const stream = new Observable((sub) => {
    sub.next(`122`);
  });
  stream.subscribe((...args) => console.log({ args }));

})();
