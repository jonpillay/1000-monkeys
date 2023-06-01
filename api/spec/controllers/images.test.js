const app = require("../../app");
const request = require("supertest");
const Responses = require("../seeds/serverResponses");
const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();

describe("/images", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("returns an error message when API key is invalid", async () => {
    fetch.mockResponseOnce(JSON.stringify(Responses.invalidResponse));
    let response = await request(app)
      .post("/images")
      .send({ positivePrompt: "someprompt", negativePrompt: "someprompt" });
    expect(response.status).toEqual(400);
    expect(JSON.parse(response.text).message).toEqual("Invalid API Request");
  });
});
