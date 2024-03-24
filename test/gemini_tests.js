let assert = require('assert');
let geminiFunctions = require('../src/gemini_functions');
let gemini_answer_1 = require('./data/gemini_answer_1.json');

describe('#convertGeminiResponse()', function() {
  it('should return a JSON record', function() {
    let response = geminiFunctions.convertResponse(gemini_answer_1);
    assert.equal(response.length, 1615);
  });
});
