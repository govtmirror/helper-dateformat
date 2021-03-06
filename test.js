/* globals describe, it */

/*!
 * helper-dateformat <https://github.com/jonschlinkert/helper-dateformat>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

require('should');

var _ = require('lodash');
var date = require('dateformat');
var handlebars = require('handlebars');
var helper = require('./');

function dateformat (format, dt) {
  dt = dt || 'now';
  format = format || 'mmmm dd, yyyy';

  if (typeof dt === 'string' && dt !== 'now') {
    dt = new Date(dt);
  } else {
    dt = new Date();
  }

  return date(dt, format);
}

describe('dateformat', function () {
  it('should return a formatted moment date', function () {
    helper().should.eql(dateformat('mmmm dd, yyyy'));
  });

  it('should return a formatted dateformat date', function () {
    helper('mmmm dd, yyyy').should.eql(dateformat('mmmm dd, yyyy'));
  });

  it('should return a formatted dateformat date, given a date string:', function () {
    helper('mmmm dd, yyyy', '2015-02-17T01:30:10+0000').should.eql(dateformat('mmmm dd, yyyy', '2015-02-17T01:30:10+0000'));
  });

  it('should return a formatted dateformat date, given a Unix Epoch integer:', function () {
    var unix = new Date().getTime();

    helper('mmmm dd, yyyy', unix).should.eql(dateformat('mmmm dd, yyyy', unix));
  });

  it('should work as a lodash helper', function () {
    _.template('<%= date("mmmm dd, yyyy") %>', {}, {imports: {date: helper}}).should.eql(dateformat('mmmm dd, yyyy'));
    _.template('<%= date("mmmm") %>', {}, {imports: {date: helper}}).should.eql(dateformat('mmmm'));
    _.template('<%= date("mmmm dd, yyyy") %>', {}, {imports: {date: helper}}).should.not.eql(dateformat('mmmm'));
  });

  it('should work as a handlebars helper', function () {
    handlebars.registerHelper('date', helper);

    handlebars.compile('{{date "mmmm dd, yyyy"}}')().should.eql(dateformat('mmmm dd, yyyy'));
    handlebars.compile('{{date "mmmm"}}')().should.eql(dateformat('mmmm'));
    handlebars.compile('{{date "mmmm"}}')().should.not.eql(dateformat('mmmm dd, yyyy'));
  });
});
