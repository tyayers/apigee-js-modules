let assert = require("assert");
let aiFunctions = require("../src/ai-functions");
let allowedModelsRequest = require("./data/models_allowed_1.json");
let deniedModelsRequest = require("./data/models_denied_1.json");
let vertexOpenModelRequest = require("./data/vertex_openmodel_request1.json");
let vertexAdkRequest = require("./data/vertex_adk_request_1.json");
let vertexGeminiRequest = require("./data/vertex_gemini_request_2.json");
let vertexGeminiOmRequest = require("./data/vertex_gemini_request_3.json");
let vertexClaudeResponse2 = require("./data/vertex_claude_response_2.json");
let vertexGeminiResponse1 = require("./data/vertex_gemini_response_1.json");
let vertexOpenModelResponse1 = require("./data/vertex_openmodel_response1.json");

describe("#testGetPrompts()", function () {
  it("should get the prompt data", function () {
    let response = aiFunctions.getPrompts(vertexAdkRequest);
    assert.equal(response.userPrompt.toLowerCase(), "what can you do?");
  });
});

describe("#testGetPrompts2()", function () {
  it("should get the prompt data", function () {
    let response = aiFunctions.getPrompts(vertexGeminiRequest);
    assert.equal(response.userPrompt.toLowerCase(), "why is the sky blue?");
  });
});

describe("#testGetPrompts3()", function () {
  it("should get the prompt data from om call", function () {
    let response = aiFunctions.getPrompts(vertexGeminiOmRequest);
    assert.equal(response.userPrompt.toLowerCase(), "why is the sky blue?");
  });
});

describe("#testSetPrompt1()", function () {
  it("set the user prompt data", function () {
    let response = aiFunctions.setPrompt(vertexGeminiRequest, "new prompt text");
    assert.equal(response["contents"][0]["parts"][0]["text"], "new prompt text");
  });
});

describe("#getResponseClaude1()", function () {
  it("get the claude response", function () {
    let response = aiFunctions.getResponse(vertexClaudeResponse2);
    assert.notEqual(response, "");
  });
});

describe("#setResponseClaude1()", function () {
  it("set the claude response", function () {
    let response = aiFunctions.setResponse(vertexClaudeResponse2, "hello world");
    assert.equal(response["content"][0]["text"], "hello world");
  });
});

describe("#getResponseGemini1()", function () {
  it("get the gemini response", function () {
    let response = aiFunctions.getResponse(vertexGeminiResponse1);
    assert.notEqual(response, "");
  });
});

describe("#setResponseGemini1()", function () {
  it("set the gemini response", function () {
    let response = aiFunctions.setResponse(vertexGeminiResponse1, "hello world");
    assert.equal(response["candidates"][0]["content"]["parts"][0]["text"], "hello world");
  });
});

describe("#getResponseOpenModel1()", function () {
  it("get the claude response", function () {
    let response = aiFunctions.getResponse(vertexOpenModelResponse1);
    assert.notEqual(response, "");
  });
});

describe("#setResponseOpenModel1()", function () {
  it("set the open model response", function () {
    let response = aiFunctions.setResponse(vertexOpenModelResponse1, "hello world");
    assert.equal(response["choices"][0]["message"]["content"], "hello world");
  });
});

describe("#testGetModelGemini()", function () {
  it("find the model name", function () {
    let modelName = aiFunctions.getModelName(
      "https://34-111-185-182.nip.io/models/v1/projects/apigee-klab1/locations/europe-west1/publishers/google/models/gemini-flash-latest:generateContent",
      "",
    );
    assert.equal(modelName, "gemini-flash-latest");
  });
});

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
    assert.equal(modelName, "gemini-flash-latest");
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
