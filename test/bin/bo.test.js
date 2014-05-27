'use strict';

/**
 * Dependencies
 */
var should = require('should');
var _ = require('lodash');
var commander = require('../../bin/bo');

describe('Program', function() {
  it('has a command to display the version number', function(done) {
    _.map(commander.commands, function(command) {
      return command._name;
    }).should.containEql('version');

    _.map(commander.options, function(option) {
      return option.short;
    }).should.containEql('-v');

    _.map(commander.options, function(option) {
      return option.long;
    }).should.containEql('--version');
    done();
  });

  it('has a command to display the usage', function(done) {
    _.map(commander.commands, function(command) {
      return command._name;
    }).should.containEql('help');
    done();
  });
});
