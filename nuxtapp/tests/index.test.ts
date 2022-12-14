// import { fileURLToPath } from "node:url";
import { render } from "@testing-library/vue";
// import { setup } from "@nuxt/test-utils-edge";
import axios from "axios";

import A from "@/components/.testing/A.vue";
import { FAKE_API_STATUS_URL } from "@/config/vars";

// @@ nuxt testing
//   https://v3.nuxtjs.org/getting-started/testing#options
// @@ testing-library vue
//   https://testing-library.com/docs/vue-testing-library/api/
//   https://testing-library.com/docs/user-event/intro/
// @@ examples
//   https://github.com/testing-library/vue-testing-library/tree/main/src/__tests__

describe("@boots", () => {
  // @@
  // await setup({
  //   rootDir: fileURLToPath(new URL("../", import.meta.url)),
  //   server: true,
  //   setupTimeout: 360000
  // });

  // @@
  it("tests init", () => {
    expect(1).toBe(1);
  });

  // @@
  it("ui tests init", () => {
    const { getByText } = render(A);
    expect(getByText("test")).toBeInTheDocument();
  });
  
  // @@
  it("fake api online", async () => {
    const res = await axios({
      method: "post",
      url: FAKE_API_STATUS_URL,
    });
    expect(res.status).toBe(200);
    expect(res.data.status).toBe("ok");
  });
  
});
