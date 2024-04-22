let assert = require('assert');
firestoreFunctions = require('../src/firestore_functions');
firestoreAnswer1 = require('./data/firestore_answer_1.json');

describe('#convertFirestoreResponse1()', function() {
  it('should return a JSON record', function() {
    let response = undefined;
    response = firestoreFunctions.convertResponse(firestoreAnswer1);

    assert.notEqual(response, undefined);
    assert.equal(response.name, "test-doc1");
    assert.equal(response.roles.length, 2);
  });
});
