# decode-non-syntax-entities

[![npm version](https://img.shields.io/npm/v/decode-non-syntax-entities.svg)](https://www.npmjs.com/package/decode-non-syntax-entities)
[![Build Status](https://travis-ci.org/shinnn/decode-non-syntax-entities.svg?branch=master)](https://travis-ci.org/shinnn/decode-non-syntax-entities)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/decode-non-syntax-entities.svg)](https://coveralls.io/github/shinnn/decode-non-syntax-entities?branch=master)

Decode character escapes except for [HTML syntax characters](https://www.w3.org/International/questions/qa-escapes#use), for example `<` and `&`

```javascript
const decodeNonSyntaxEntities = require('decode-non-syntax-entities');

decodeNonSyntaxEntities("<p title='rock&apos;n&apos;roll'> &gt;_&lt; </p>");
//=> "<p title='rock&apos;n&apos;roll'> &gt;_&lt; </p>"
```

Other decoder libraries usually produce a broken HTML in this case:

```javascript
otherDecoder("<p title='rock&apos;n&apos;roll'> &gt;_&lt; </p>");
//=> "<p title='rock'n'roll'> >_< </p>"
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install decode-non-syntax-entities
```

## API

```javascript
const decodeNonSyntaxEntities = require('decode-non-syntax-entities');
```

### decodeNonSyntaxEntities(*html*)

*html*: `string`  
Return: `string`

It works like [he](https://github.com/mathiasbynens/he)'s [`decode`](https://github.com/mathiasbynens/he#hedecodehtml-options) method, but does't decode the following entities:

* `"` references
  * `&quot;`
  * `&#x22;`
  * `&#34;`
* `&` references
  * `&amp;`
  * `&#x26;`
  * `&#38;`
* `'` references
  * `&apos;`
  * `&#x27;`
  * `&#39;`
* `<` references
  * `&lt;`
  * `&#x3C;`
  * `&#60;`
* `>` references
  * `&gt;`
  * `&#x3E;`
  * `&#62;`

```javascript
decodeNonSyntaxEntities('&excl;&#x21;&#33;');
//=> '!!!'

decodeNonSyntaxEntities('&amp;&#x26;&#38;');
//=> '&amp;&#x26;&#38;'
```

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
