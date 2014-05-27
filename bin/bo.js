#!/usr/bin/env node
'use strict';

/**
 * Dependencies
 */
var commander = require('commander');
var Bo = require('../lib/bo');
var NOOP = function () {};

/**
 * Expose commander
 */
module.exports = commander;

/**
 * Help
 */
commander
  .command('help')
  .description('output usage information')
  .usage('bo help')
  .action(commander.help)
  .unknownOption = NOOP;

/**
 * Version
 */
commander
  .version(require('../package.json').version, '-v, --version')
  .usage('<command> <arguments>');
commander
  .command('version')
  .description('output version number')
  .usage('bo version')
  .action(commander.versionInformation)
  .unknownOption = NOOP;

commander.unknownOption = NOOP;

if (process.env.NODE_ENV !== 'test') {
  commander.parse(process.argv);

  var bo = new Bo(commander.args);
}
