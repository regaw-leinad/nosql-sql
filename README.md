# nosql-sql

Easily build parameterized DocumentDB queries (SQL) with MongoDB syntax (NoSQL)

## Installation

    npm install --save nosql-sql
    
## Motivation

Coming from MongoDB, and perplexed by the notion of writing SQL statements to query a NoSQL database, I set out to write a translator

## Usage

This module exports just one function that you will use to build your queries.

```javascript
var buildQuery = require('nosql-sql');

// As a simple example, we want to get all users named Dan that are 18 - 25 years old
var myQuery = {first_name: 'Dan', age: {$between: [18, 25]}};

// Build the query object for the DocumentDB client
var builtQuery = buildQuery(myQuery);

// Assuming you have a DocumentDB client...
self.client.queryDocuments(self.collection._self, builtQuery).toArray()...
```

The result of `buildQuery(myQuery)` looks like this
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

>NOTE: The examples below show only snippets related to each specific operator. They can be combined and nested as appropriate, as long as proper syntax is maintained.

* **$and** `{x: 5, y: 10}` or `{$and: [{x: 5}, {y: 10}]}`
* **$between** `{x: {$between: [1, 7]}}`
* **$gt** `{x: {$gt: 7}}`

## In Development

This project is currently under development while I add support for all DocumentDB operators, as well as more query configuration options.

* [ ] Support for what to SELECT (`SELECT c.name, c.other...`)
* [ ] Support for collection name support (`...FROM myName m WHERE m.field = ...`)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

* 0.1.0 - 2016.09.xx - Initial release
