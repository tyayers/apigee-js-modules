# apigee-js-modules
This is a project for doing common Google Cloud Javascript conversions that can be easily used in Apigee proxies and Application Integration workflows. Often the Google Cloud APIs return non-JSON data structures, and so these conversions can convert to pure JSON results that can be returned to clients.

## Conversions currently supported
- BigQuery input parameters to SQL statement
- BigQuery response to JSON
- Firestore response to JSON
- Gemini answer to string

## Install

```bash
# Cone repository

# Install dependencies
npm i

# Run tests
npm run test
```

You should get these results.

```
  #generateQuery("")
    ✔ should return an empty string

  #generateQuery("", "test_table")
    ✔ should return a simple query

  #convertResponseSingle()
    ✔ should return a JSON record

  #convertResponse10Rows()
    ✔ should return a JSON record

  #convertResponse10Rows2()
    ✔ should return a JSON record

  #convertFirestoreResponse1()
    ✔ should return a JSON record

  #convertGeminiResponse()
    ✔ should return a JSON record
```

You can explore the conversions and test data used in the `./test` directory. The files under `./src` can be copied and used directly in Apigee proxies or Application Integration flows (pure JS exported functions).
