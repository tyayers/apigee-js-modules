function getModelName(urlString, contentString) {
  var modelName = "unknown";
  if (urlString && urlString.includes("/models/")) {
    // claude url format
    var urlPieces = urlString.split("/models/");
    if (urlPieces.length > 1) {
      var urlPieces2 = urlPieces[1].split(":");
      if (urlPieces2.length > 0) {
        modelName = urlPieces2[0];
      }
    }
  } else if (contentString) {
    try {
      var contentData = JSON.parse(contentString);
      if (contentData && contentData["model"]) modelName = contentData["model"];
    } catch (e) {}
  }

  return modelName;
}

function getUsageData(contentString) {
  var usageData = {
    model: "",
    requestTokenCount: 0,
    responseTokenCount: 0,
    totalTokenCount: 0,
  };

  if (
    contentString &&
    contentString != "[DONE]" &&
    !contentString.startsWith("event: content_block_delta") &&
    !contentString.startsWith("event: ping") &&
    !contentString.startsWith("event: content_block_start") &&
    !contentString.startsWith("event: content_block_stop") &&
    !contentString.startsWith("event: message_stop")
  ) {
    contentString = contentString.replace("data: ", "");
    contentString = contentString.replace("event: message_delta data:", "");
    contentString = contentString.replace("event: message_delta", "");
    contentString = contentString.replace("event: message_start", "");

    try {
      var contentData = JSON.parse(contentString);

      // model
      if (contentData["model"]) {
        usageData.model = contentData["model"];
      }
      if (contentData["modelVersion"]) {
        usageData.model = contentData["modelVersion"];
      }
      if (contentData["message"] && contentData["message"]["model"]) {
        usageData.model = contentData["message"]["model"];
      }

      // requestTokenCount
      // openmodels
      if (contentData["usage"] && contentData["usage"]["prompt_tokens"]) {
        usageData.requestTokenCount = contentData["usage"]["prompt_tokens"];
      }
      // claude
      if (
        contentData["message"] &&
        contentData["message"]["usage"] &&
        contentData["message"]["usage"]["input_tokens"]
      ) {
        usageData.requestTokenCount =
          contentData["message"]["usage"]["input_tokens"];
      }
      if (contentData["usage"] && contentData["usage"]["input_tokens"]) {
        usageData.requestTokenCount = contentData["usage"]["input_tokens"];
      }
      // gemini API
      if (
        contentData["usageMetadata"] &&
        contentData["usageMetadata"]["promptTokenCount"]
      ) {
        usageData.requestTokenCount =
          contentData["usageMetadata"]["promptTokenCount"];
      }

      // responseTokenCount
      // openmodels
      if (contentData["usage"] && contentData["usage"]["completion_tokens"])
        usageData.responseTokenCount =
          contentData["usage"]["completion_tokens"];
      // claude
      if (contentData["usage"] && contentData["usage"]["output_tokens"]) {
        usageData.responseTokenCount = contentData["usage"]["output_tokens"];
      }
      // gemini
      if (
        contentData["usageMetadata"] &&
        contentData["usageMetadata"]["candidatesTokenCount"]
      ) {
        usageData.responseTokenCount =
          contentData["usageMetadata"]["candidatesTokenCount"];
      }
    } catch (e) {
      print("Exception in processing stream data: " + e.message);
    }
  }

  return usageData;
}

function testAllowedModels(requestInfo) {
  var result = true;
  if (
    requestInfo.allowedModelPatterns &&
    requestInfo.allowedModelPatterns != "ALL"
  ) {
    result = false;
    var patterns = requestInfo.allowedModelPatterns.split(",");
    for (var i = 0; i < patterns.length; i++) {
      var pattern = patterns[i];
      // var patternRegex = new RegExp(pattern);
      if (requestInfo.type == "vertex") {
        if (requestInfo.url.includes(pattern)) {
          result = true;
          break;
        }
        // if (patternRegex.test(requestInfo.url)) {
        //   result = true;
        //   break;
        // }
      } else if (
        requestInfo.type == "oai" &&
        requestInfo.requestContent["model"]
      ) {
        if (requestInfo.requestContent["model"].includes(pattern)) {
          result = true;
          break;
        }
      }
    }
  }

  return result;
}

function testDeniedModels(requestInfo) {
  var result = true;
  if (
    requestInfo.deniedModelPatterns &&
    requestInfo.deniedModelPatterns != "NONE"
  ) {
    var patterns = requestInfo.deniedModelPatterns.split(",");
    for (var i = 0; i < patterns.length; i++) {
      var pattern = patterns[i];
      // var patternRegex = new RegExp(pattern);
      if (requestInfo.type == "vertex") {
        if (requestInfo.url.includes(pattern)) {
          result = false;
          break;
        }
      } else if (
        requestInfo.type == "oai" &&
        requestInfo.requestContent["model"]
      ) {
        if (requestInfo.requestContent["model"].includes(pattern)) {
          result = false;
          break;
        }
      } else if (requestInfo.type == "oai") {
        result = false;
        break;
      }
    }
  }

  return result;
}

// this is to only export the function if in node
if (typeof exports !== "undefined") {
  exports.getModelName = getModelName;
  exports.getUsageData = getUsageData;
  exports.testAllowedModels = testAllowedModels;
  exports.testDeniedModels = testDeniedModels;
}
