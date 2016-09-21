# nosql-sql

Easily build parameterized DocumentDB queries (SQL) with MongoDB syntax (NoSQL)

## Installation

    npm install --save nosql-sql
    
## Motivation

Writing SQL statements to query DocumentDB's NoSQL database seemed slightly odd to me, especially when it came to writing the more complex, [SQLi](https://en.wikipedia.org/wiki/SQL_injection)-free, [parameterized queries](https://azure.microsoft.com/en-us/documentation/articles/documentdb-sql-query/#parameterized-sql-queries). This project exists to abstract the building of these large query objects by utilizing MongoDB-style syntax. 

## Usage

This module exports just one function that you will use to build your queries.

```javascript
var buildQuery = require('nosql-sql');

// As a simple example, we want to get all users named Dan that are 18 - 25 years old
var myQuery = {first_name: 'Dan', age: {$between: [18, 25]}};

// Build the query object for the DocumentDB client
var queryObject = buildQuery(myQuery);

// Assuming you have a DocumentDB client...
documentDBClient.queryDocuments(collection._self, queryObject).toArray()...
```

The result of the example `buildQuery(myQuery)` above:
```json
{
  "query": "SELECT * FROM c WHERE (c.first_name = @v0 AND (c.age BETWEEN @v1 AND @v2))",
  "parameters": [
    {
      "name": "@v0",
      "value": "Dan"
    },
    {
      "name": "@v1",
      "value": 18
    },
    {
      "name": "@v2",
      "value": 25
    }
  ]
}
```

## Supported Operators

The format below is: **operator** `{ query snippet }`  
These query snippets can be combined or nested as appropriate, as long as proper syntax is maintained.

* **$and** `{x: 5, y: 10}` or `{$and: [{x: 5}, {y: 10}]}`
* **$between** `{x: {$between: [1, 7]}}`
* **$gt** `{x: {$gt: 7}}`
* **$gte** `{x: {$gte: 10}}`
* **$in** `{x: {$in: [1, 2, "alpha", "Dan"]}}`
* **$lt** `{x: {$lt: 14}}`
* **$lte** `{x: {$lte: "abd"}}`

## In Development

This project is currently under heavy development while I add support for all DocumentDB operators, as well as more query configuration options.

* Additional operator support
    * Mathematical functions
        * `ABS, CEILING, EXP, FLOOR, LOG, LOG10, POWER, ROUND, SIGN, SQRT, SQUARE, TRUNC, ACOS, ASIN, ATAN, ATN2, COS, COT, DEGREES, PI, RADIANS, SIN, TAN`
    * Type checking functions
        * `S_ARRAY, IS_BOOL, IS_NULL, IS_NUMBER, IS_OBJECT, IS_STRING, IS_DEFINED, IS_PRIMITIVE`
    * String functions
        * `CONCAT, CONTAINS, ENDSWITH, INDEX_OF, LEFT, LENGTH, LOWER, LTRIM, REPLACE, REPLICATE, REVERSE, RIGHT, RTRIM, STARTSWITH, SUBSTRING, UPPER`
    * Array functions
        * `ARRAY_CONCAT, ARRAY_CONTAINS, ARRAY_LENGTH, ARRAY_SLICE`
    * Spacial functions
        * `ST_DISTANCE, ST_WITHIN, ST_ISVALID, ST_ISVALIDDETAILED`
* Configuration for what to SELECT (`SELECT c.name, c.other...`)
* Configuration for custom collection name (`...FROM myName m WHERE m.field = ...`)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

<!--## History

* 0.1.0 - 2016.09.xx - Initial release-->
