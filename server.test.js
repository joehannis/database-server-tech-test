const request = require("supertest");
const app = require("./server"); // Make sure the path to your server file is correct

describe("GET /set", () => {
  it("should return 'Invalid request. Please provide both 'somekey' and 'somevalue' as query parameters.'", async () => {
    const response = await request(app).get("/set").query({ somekey: "mykey" });
    expect(response.text).toBe(
      "Invalid request. Please provide both 'somekey' and 'somevalue' as query parameters."
    );
  });
  it("should return 'Key mykey with value myvalue has been set.'", async () => {
    const response = await request(app)
      .get("/set")
      .query({ somekey: "mykey", somevalue: "myvalue" });

    expect(response.status).toBe(200);
    expect(response.text).toBe(
      'Key "mykey" with value "myvalue" has been set.'
    );
  });
  it("should return 'Key mykey with value myvalue has been set.' and 'Value myvalue has key mykey.'", async () => {
    const setResponse = await request(app)
      .get("/set")
      .query({ somekey: "mykey", somevalue: "myvalue" });

    expect(setResponse.status).toBe(200);
    expect(setResponse.text).toBe(
      'Key "mykey" with value "myvalue" has been set.'
    );
    const getResponse = await request(app).get("/get/mykey");
    expect(getResponse.status).toBe(200);
    expect(getResponse.text).toBe("Your value is myvalue.");
  });
  it("should return 'Key mykey with value myvalue has been set.' and 'Your value is myvalue.'", async () => {
    const setResponse = await request(app)
      .get("/set")
      .query({ somekey: "mykey", somevalue: "myvalue" });

    expect(setResponse.status).toBe(200);
    expect(setResponse.text).toBe(
      'Key "mykey" with value "myvalue" has been set.'
    );
    const getResponse = await request(app).get("/get/mykey");
    expect(getResponse.status).toBe(200);
    expect(getResponse.text).toBe("Your value is myvalue.");
  });
  it("should return 'Key mykey with value myvalue has been set.' and 'Your key is mykey.'", async () => {
    const setResponse = await request(app)
      .get("/set")
      .query({ somekey: "mykey", somevalue: "myvalue" });

    expect(setResponse.status).toBe(200);
    expect(setResponse.text).toBe(
      'Key "mykey" with value "myvalue" has been set.'
    );
    const getResponse = await request(app).get("/get/myvalue");
    expect(getResponse.status).toBe(200);
    expect(getResponse.text).toBe("Your key is mykey.");
  });
  it("should return 'Key mykey with value myvalue has been set.' and 'You have not searched for a valid key or value.'", async () => {
    const setResponse = await request(app)
      .get("/set")
      .query({ somekey: "mykey", somevalue: "myvalue" });

    expect(setResponse.status).toBe(200);
    expect(setResponse.text).toBe(
      'Key "mykey" with value "myvalue" has been set.'
    );
    const getResponse = await request(app).get("/get/notavalidvalue");
    expect(getResponse.status).toBe(200);
    expect(getResponse.text).toBe(
      "You have not searched for a valid key or value."
    );
  });
});
