# apigee-js-modules
This is a project for some generally useful Javascript modules to be used in Apigee proxies. Here the code can be developed and tested before being referenced and included in an Apigee proxy.

You can run the bests by running:

```bash
# Install dependencies
npm i

# Run tests
npm run test
```

You can see how the modules are tested, and can be used in Apiee proxies, in the `/test` directory.

Here are the modules provided:

## BigQuery converters
The code in `src/bigquery_functions.js` converts a request query or table into a query, and converts the response structure into standard JSON.
