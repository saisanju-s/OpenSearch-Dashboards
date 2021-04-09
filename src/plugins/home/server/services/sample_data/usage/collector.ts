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

import { PluginInitializerContext } from 'opensearch-dashboards/server';
import { first } from 'rxjs/operators';
import { fetchProvider, TelemetryResponse } from './collector_fetch';
import { UsageCollectionSetup } from '../../../../../usage_collection/server';

export async function makeSampleDataUsageCollector(
  usageCollection: UsageCollectionSetup,
  context: PluginInitializerContext
) {
  let index: string;
  try {
    const config = await context.config.legacy.globalConfig$.pipe(first()).toPromise();
    index = config.opensearchDashboards.index;
  } catch (err) {
    return; // OpenSearch Dashboards plugin is not enabled (test environment)
  }
  const collector = usageCollection.makeUsageCollector<TelemetryResponse>({
    type: 'sample-data',
    fetch: fetchProvider(index),
    isReady: () => true,
    schema: {
      installed: { type: 'array', items: { type: 'keyword' } },
      last_install_date: { type: 'date' },
      last_install_set: { type: 'keyword' },
      last_uninstall_date: { type: 'date' },
      last_uninstall_set: { type: 'keyword' },
      uninstalled: { type: 'array', items: { type: 'keyword' } },
    },
  });

  usageCollection.registerCollector(collector);
}
