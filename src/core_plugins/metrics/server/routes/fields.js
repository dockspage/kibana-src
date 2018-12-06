'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_fields = require('../lib/get_fields');

var _get_index_pattern_service = require('../lib/get_index_pattern_service');

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

exports.default = server => {

  server.route({
    config: {
      pre: [_get_index_pattern_service.getIndexPatternService]
    },
    path: '/api/metrics/fields',
    method: 'GET',
    handler: (req, reply) => {
      (0, _get_fields.getFields)(req).then(reply).catch(err => {
        if (err.isBoom && err.status === 401) return reply(err);
        reply([]);
      });
    }
  });
};

module.exports = exports['default'];