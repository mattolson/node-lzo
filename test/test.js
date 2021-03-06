'use strict';

const chai = require('chai');
const crypto = require('crypto');
const lzo = require('..');

const expect = chai.expect;
const sampleSize = parseInt(process.env.TEST_SAMPLE_SIZE, 10) || 250;

const run = plain => lzo.decompress(lzo.compress(plain), plain.length).compare(plain);
const sum = (a, b) => a + b;
const arr = len => Array(len).fill(0).map((_, i) => i);
const randChar = () => String.fromCharCode(Math.random() * 1000);
const toBuf = a => Buffer.from(a);

describe('Compression/Decompression', () => {
  it('lzo.compress should throw if nothing is passed', () => 
    expect(() => lzo.decompress()).to.throw() );

  it('lzo.decompress throw if nothing is passed', () => 
    expect(() => lzo.decompress()).to.throw() );

  it('Decompressed date should be the same as the initial input', () => {
    let random = arr(sampleSize).map(n => crypto.randomBytes(n)),
        repetetive = arr(sampleSize).map(n => randChar().repeat(n * 500)),
        result = random.concat(repetetive).map(toBuf).map(run).reduce(sum, 0);

    expect(result).to.equal(0);
  });
});

describe('Properties', () => {
  it('Should have property \'version\'', () => 
    expect(lzo).to.have.ownProperty('version') );

  it('Should have property \'versionDate\'', () => 
    expect(lzo).to.have.ownProperty('versionDate') );

  it('Should have property \'errors\' (lzo error codes)', () =>
    expect(lzo).to.have.ownProperty('errors') );
});