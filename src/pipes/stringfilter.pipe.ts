/*
 * Copyright Siemens AG, 2016
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *
 * @author Jonas Möller
 */
import { Pipe } from '@angular/core';

@Pipe({
	name: 'StringFilterPipe'
})
export class StringFilterPipe {

	transform(haystack: string[], needle: string) {
		if (!haystack) {
			throw "haystack must not be undefined";
		}
		haystack = haystack.slice(0);

		if (!needle) {
			return haystack;
		}

		needle = needle.toLowerCase();
		return haystack.filter(h => {
			return h.toLowerCase().includes(needle);
		});
	}
}
