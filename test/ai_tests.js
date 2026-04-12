let assert = require("assert");
let aiFunctions = require("../src/ai-functions");
let allowedModelsRequest = require("./data/models_allowed_1.json");
let deniedModelsRequest = require("./data/models_denied_1.json");
let vertexOpenModelRequest = require("./data/vertex_openmodel_request1.json");

describe("#testGetModelClaude()", function () {
  it("find the model name", function () {
    let modelName = aiFunctions.getModelName(
      "https://34-8-196-4.nip.io/vertex/v1/projects/apigee-hub-demo/locations/global/publishers/anthropic/models/claude-sonnet-4-6:streamRawPredict",
      "",
    );
    assert.equal(modelName, "claude-sonnet-4-6");
  });
});

describe("#testGetModelOpen()", function () {
  it("find the model name", function () {
    let modelName = aiFunctions.getModelName(
      "https://aiplatform.googleapis.com/v1beta1/projects/apigee-hub-demo/locations/global/endpoints/openapi/chat/completions",
      JSON.stringify(vertexOpenModelRequest),
    );
    assert.equal(modelName, "google/gemini-flash-latest");
  });
});

describe("#testAllowedModels()", function () {
  it("should allow the request", function () {
    let response = aiFunctions.testAllowedModels(allowedModelsRequest);
    assert.equal(response, true);
  });
});

describe("#testDeniedModels()", function () {
  it("should deny the request", function () {
    let response = aiFunctions.testDeniedModels(deniedModelsRequest);
    assert.equal(response, false);
  });
});
