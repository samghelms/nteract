jest.mock("file-saver");

import FileSaver from "file-saver";
import { stringifyNotebook } from "@nteract/commutable";

import { downloadString } from "../src/contents";
import { bigDummyJSON } from "@nteract/core";

describe("downloadString", () => {
  beforeEach(() => {
    (FileSaver.saveAs as any).mockClear();
    (global as any).Blob = (content, options) => ({ content, options });
  });
  it("calls FileSaver.saveAs with notebook and filename", () => {
    const filename = "/here/there/awesome.ipynb";
    const expectedData = bigDummyJSON;
    expect(FileSaver.saveAs).not.toHaveBeenCalled();
    downloadString(
      stringifyNotebook(bigDummyJSON),
      filename,
      "application/json"
    );
    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1);
    const actualMockBlobResponse = (FileSaver.saveAs as any).mock.calls[0][0];
    const actualFilename = (FileSaver.saveAs as any).mock.calls[0][1];

    expect(actualMockBlobResponse).toEqual({
      content: [stringifyNotebook(expectedData)],
      options: { type: "application/json" }
    });

    expect(actualFilename).toBe("awesome.ipynb");
  });
});
