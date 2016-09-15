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
import { EventEmitter } from '@angular/core';
import { CardinalDirection } from './cardinaldirection.enum';

export interface DragInfo {
	source: any,
	target: any,
	type: string,
	direction: CardinalDirection,
	dropEmitter: EventEmitter<void>
}

export function shallowCopyDragInfo(n: DragInfo) {
	return {
		source: n.source,
		target: n.target,
		type: n.type,
		dropEmitter: n.dropEmitter,
		direction: n.direction
	}
}
