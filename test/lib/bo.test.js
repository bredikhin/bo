'use strict';

/**
 * Dependencies
 */
var path = require('path');
var should = require('should');
var EventEmitter = require('events').EventEmitter;
var Bo = require('../../lib/bo');

describe('Bo', function() {
  it('is an EventEmitter', function(done) {
    var bo = new Bo();
    bo.should.be.an.instanceOf(EventEmitter);

    done();
  });

  it('sends a list of available commands on request');
});
