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
/**
 * This class is used to enable call-by-reference
 * for primitives.
 */
export interface Model {
	input?: ModelPtr;
}

export class ModelPtr {
	model: Model;

	constructor() {
		this.model = {};
	}
}

export function get(modelPtr: ModelPtr, key: string) {
	return modelPtr.model[key];
}

export function set(modelPtr: ModelPtr, key: string, data: any) {
	modelPtr.model[key] = data;
}

export function setInput(modelPtr: ModelPtr, input: ModelPtr) {
	modelPtr.model.input = input;
}

export function getFromInput(modelPtr: ModelPtr, key: string) {
	if (modelPtr.model.input) {
 		return get(modelPtr.model.input, key);
	}
}
