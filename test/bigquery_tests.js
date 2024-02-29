let assert = require('assert');
let bqFunctions = require('../src/bigquery_functions');
let bigquery_row = require('./data/bigquery_row.json');
let bigquery_rows1 = require('./data/bigquery_rows1.json');
let bigquery_rows2 = require('./data/bigquery_rows2.json');

describe('#generateQuery("")', function() {
  it('should return an empty string', function() {
    assert.strictEqual(bqFunctions.generateQuery("", ""), "");
  });
});

describe('#generateQuery("", "test_table")', function() {
  it('should return a simple query', function() {
    assert.strictEqual(bqFunctions.generateQuery("", "test_table"), "SELECT * FROM test_table   LIMIT 10 ");
  });
});

describe('#convertResponseSingle()', function() {
  it('should return a JSON record', function() {
    let response = bqFunctions.convertResponse(bigquery_row, "transactions");
    assert.notEqual(response, "");
  });
});

describe('#convertResponse10Rows()', function() {
  it('should return a JSON record', function() {
    let response = bqFunctions.convertResponse(bigquery_rows1, "transactions");
    console.log(response);
    assert.notEqual(response, "");
  });
});

describe('#convertResponse10Rows2()', function() {
  it('should return a JSON record', function() {
    let response = bqFunctions.convertResponse(bigquery_rows2, "transactions");
    console.log(response);
    assert.notEqual(response, "");
  });
});