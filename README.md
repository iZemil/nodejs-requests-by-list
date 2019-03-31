# Nodejs request tool for scrape/check websites by list

## Usage examples

```
const zemil = require('zemil');

zemil({
    keys: ['1', '2', '3'],
    uriCreator: (key) =>`http://example.com/${key}`,
    delay: 0
});
```

or

```
zemil({
    keys: ['http://example.com/01', 'http://example.com/02'],
    uriCreator: uri => uri,
    delay: 1500
})
```

It writes results to follow data.json:

```
[
    { "key": "1", "uri": "http://example.com/1", "status": 200, json: { ifBe: "someData"} },
    { "key": "2", "uri": "http://example.com/2", "status": 200, json: { ifBe: "someData"} }
]
```

### TODO:

-   handle 429 status (too many requests)
-   post data requests
