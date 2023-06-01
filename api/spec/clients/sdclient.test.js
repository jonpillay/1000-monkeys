const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();
const StableDiffusionClient = require("../../clients/sdclient.js");
const Responses = require("../seeds/serverResponses");

describe("sdclient class", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe("generateImage method", () => {
    test("returns an image link from SD server based on prompts", async () => {
      fetch.mockResponseOnce(JSON.stringify(Responses.okResponse));
      const result = await StableDiffusionClient.generateImage(
        "positivePrompt",
        "negativePrompt"
      );
      expect(result).toEqual(Responses.okResponse.output[0]);
    });

    test("returns an invalid API key message if no API key is provided", async () => {
      fetch.mockResponseOnce(JSON.stringify(Responses.invalidResponse));
      await expect(
        StableDiffusionClient.generateImage("positivePrompt", "negativePrompt")
      ).rejects.toThrow("Invalid API Request");
    });

    test("returns a type error if there is no internet connection", async () => {
      fetch.mockRejectedValueOnce(new TypeError());
      await expect(
        StableDiffusionClient.generateImage("positivePrompt", "negativePrompt")
      ).rejects.toThrow(TypeError);
    });

    test("returns a 404 status code if url address is wrong", async () => {
      fetch.mockResponseOnce(Responses.invalidURLResponse, {
        status: 404,
      });
      await expect(
        StableDiffusionClient.generateImage("positivePrompt", "negativePrompt")
      ).rejects.toThrow("HTTP Error: Status 404");
    });
  });
});
