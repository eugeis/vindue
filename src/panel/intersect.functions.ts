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
export function intersect(inputs1: string[], inputs2: string[]): string[] {
	let ar1 = inputs1.slice(0).sort();
	let ar2 = inputs2.slice(0).sort();

	let ret: string[] = [];

	let ptr = 0;
	for (let i = 0; i < ar1.length; i++) {
		if (ar1[i] == ar2[ptr]) {
			ret.push(ar1[i]);
			ptr++;
		} else if (ar1[i] > ar2[ptr]) {
			i--;
			ptr++;
		}
	}

	return ret;
}
