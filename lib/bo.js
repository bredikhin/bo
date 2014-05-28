'use strict';

/**
 * Dependencies
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var async = require('async');
var modules = require('npm');
var console = require('colsole')();

module.exports = Bo;

function Bo(args) {
  if (!(this instanceof Bo))
    return new Bo(args);
  
  var that = this;

  EventEmitter.call(this);

  modules.load({'global': true, 'json': true, 'depth': 0}, function (err, npm) {
    if (err)
      that.emit('error', err);

    npm.commands.ls([], true, function(err, data) {
      if (err)
        that.emit('error', err);

      var commandsAvailable = {};
      var allModules = Object.keys(data.dependencies);

      async.each(allModules, function(module, cb) {
        if (module.indexOf('bo-') === 0)
          commandsAvailable = _.merge(commandsAvailable, require(data.dependencies[module].path).commands);

        cb();
      }, function(err) {
        if (err)
          that.emit('error', err);

        if (args.length) {
          var command = args.shift();
          if (_.indexOf(Object.keys(commandsAvailable), command) === -1)
            console.error("I don't know how to %s yet!", command);
          else
            commandsAvailable[command](args, function(err, data) {
              if (err)
                that.emit('error', err);
              
              if (data)
                console.log(data);
            });
        }
        else {
          if (!Object.keys(commandsAvailable).length)
            console.info('I know nothing yet!');
          else {
            console.info('I know how to:');
            for (var i = 0; i < Object.keys(commandsAvailable).length; i++) {
              console.log('- %s', Object.keys(commandsAvailable)[i]);
            }
          }
        }
      });
    });
  });
}

util.inherits(Bo, EventEmitter);
