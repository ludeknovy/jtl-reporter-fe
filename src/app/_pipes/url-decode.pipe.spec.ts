import { UrlDecodePipe } from "./url-decode.pipe";

describe("UrlDecodePipePipe", () => {
  it("create an instance", () => {
    const pipe = new UrlDecodePipe();
    expect(pipe).toBeTruthy();
  });
});
