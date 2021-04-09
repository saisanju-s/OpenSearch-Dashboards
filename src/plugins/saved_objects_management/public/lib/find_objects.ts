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

import { HttpStart, SavedObjectsFindOptions } from 'src/core/public';
import { keysToCamelCaseShallow } from './case_conversion';
import { SavedObjectWithMetadata } from '../types';

interface SavedObjectsFindResponse {
  total: number;
  page: number;
  perPage: number;
  savedObjects: SavedObjectWithMetadata[];
}

export async function findObjects(
  http: HttpStart,
  findOptions: SavedObjectsFindOptions
): Promise<SavedObjectsFindResponse> {
  const response = await http.get<Record<string, any>>(
    '/api/opensearch-dashboards/management/saved_objects/_find',
    {
      query: findOptions as Record<string, any>,
    }
  );

  return keysToCamelCaseShallow(response) as SavedObjectsFindResponse;
}

export async function findObject(
  http: HttpStart,
  type: string,
  id: string
): Promise<SavedObjectWithMetadata> {
  return await http.get<SavedObjectWithMetadata>(
    `/api/opensearch-dashboards/management/saved_objects/${encodeURIComponent(
      type
    )}/${encodeURIComponent(id)}`
  );
}
