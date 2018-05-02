'use strict';

var appendType = require('append-type');
var he = require('he');

/*!
 * decode-non-syntax-entities | ISC (c) Shinnosuke Watanabe
 * https://github.com/shinnn/decode-non-syntax-entities
*/

var BASE_SOURCE = '(amp|(?:l|g|quo)t|apos|(?:#x0*(2(?:2|6|7)|3(?:C|E))|#0*(?:3(?:4|8|9)|6(?:0|2))))';
var TMP_REPLACE_SOURCE = '&' + BASE_SOURCE + ';';
var REPLACE_SOURCE = '\\0\\0' + BASE_SOURCE + '\\0\\0';
var TMP_REPLACEMENT = '\0\0$1\0\0';
var REPLACEMENT = '&$1;';
var heOption = {strict: true};

module.exports = function decodeNonSyntaxEntities(html) {
	if (typeof html !== 'string') {
		throw new TypeError('Expected a string to decode its HTML escape characters, but got ' + appendType(html) + '.');
	}

	return he.decode(html.replace(new RegExp(TMP_REPLACE_SOURCE, 'gi'), TMP_REPLACEMENT), heOption)
	.replace(new RegExp(REPLACE_SOURCE, 'gi'), REPLACEMENT);
};
