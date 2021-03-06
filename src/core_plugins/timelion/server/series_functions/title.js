'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

exports.default = new _chainable2.default('title', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'title',
    types: ['string', 'null'],
    help: 'Title for the plot.'
  }],
  help: 'Adds a title to the top of the plot. If called on more than 1 seriesList the last call will be used.',
  fn: function hideFn(args) {
    return (0, _alter2.default)(args, function (eachSeries, title) {
      eachSeries._title = title;
      return eachSeries;
    });
  }
});
module.exports = exports['default'];