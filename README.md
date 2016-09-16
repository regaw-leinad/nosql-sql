# nosql-sql
Easily build parameterized DocumentDB queries (SQL) with MongoDB syntax (NoSQL)

## Installation

    npm install --save nosql-sql
    
## Motivation
Coming from MongoDB, and perplexed by the notion of writing SQL 
statements to query a NoSQL database, I set out to write a translator

## Usage

TODO

## Supported Operators
* `$and` :: Implicit `{x: 5, y: 10}` or explicit `{$and: [{x: 5}, {y: 10}]}`
* `$between` :: `{x: {$between: [1, 7]}}`
* `$gt` :: `{x: {$gt: 7}}`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

* 0.1.0 - 2016.09.xx - Initial release
