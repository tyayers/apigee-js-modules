

function convertResponse(dataResponseObject) {
  var result = "";

  for (i = 0; i < dataResponseObject.length; i++) {
    if (dataResponseObject[i]["candidates"][0]["content"] && dataResponseObject[i]["candidates"][0]["content"]["parts"] && dataResponseObject[i]["candidates"][0]["content"]["parts"].length > 0)
      result += dataResponseObject[i]["candidates"][0]["content"]["parts"][0]["text"];
  }

  return result;
}

// this is to only export the function if in node
if (typeof exports !== 'undefined') {
  exports.convertResponse = convertResponse;
}