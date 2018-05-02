'use strict';

const decodeNonSyntaxEntities = require('.');
const {encode} = require('he');
const test = require('tape');

const str = 'あ\'"&><';

test('decodeNonSyntaxEntities()', async t => {
	t.equal(
		decodeNonSyntaxEntities(encode(str)),
		'あ&#x27;&#x22;&#x26;&#x3E;&#x3C;',
		'should decode entities except for HTML syntax characters.'
	);

	t.equal(
		decodeNonSyntaxEntities(encode(str, {useNamedReferences: true})),
		'あ&apos;&quot;&amp;&gt;&lt;',
		'should support named references.'
	);

	t.equal(
		decodeNonSyntaxEntities(encode(str, {decimal: true})),
		'あ&#39;&#34;&#38;&#62;&#60;',
		'should support decimal excapes.'
	);

	t.throws(
		() => decodeNonSyntaxEntities(true),
		/^TypeError.*Expected a string to decode its HTML escape characters, but got true \(boolean\)\./,
		'should invalidate non-string argument.'
	);

	t.end();
});
