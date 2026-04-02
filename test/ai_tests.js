let assert = require("assert");
let aiFunctions = require("../src/ai-functions");
let allowedModelsRequest = require("./data/models_allowed_1.json");
let deniedModelsRequest = require("./data/models_denied_1.json");

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
