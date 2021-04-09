/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 */

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

/*
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { OSD_FIELD_TYPES } from '../../../../../../plugins/data/public';
import { METRIC_TYPES } from '../../../../../../plugins/vis_type_timeseries/common/metric_types';

export function getSupportedFieldsByMetricType(type) {
  switch (type) {
    case METRIC_TYPES.CARDINALITY:
      return Object.values(OSD_FIELD_TYPES).filter((t) => t !== OSD_FIELD_TYPES.HISTOGRAM);
    case METRIC_TYPES.VALUE_COUNT:
      return Object.values(OSD_FIELD_TYPES);
    case METRIC_TYPES.AVERAGE:
    case METRIC_TYPES.SUM:
      return [OSD_FIELD_TYPES.NUMBER, OSD_FIELD_TYPES.HISTOGRAM];
    default:
      return [OSD_FIELD_TYPES.NUMBER];
  }
}
