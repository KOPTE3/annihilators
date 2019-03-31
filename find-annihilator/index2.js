const path = require('path');

// enable logging via `debug` module
process.env.DEBUG = process.env.DEBUG || 'annihilators';

// settings for `ts-node` module
process.env.TS_NODE_PROJECT = path.resolve(__dirname, '..', 'tsconfig.json');
process.env.TS_NODE_FILES = true;

require('ts-node/register');
require('./run2');
