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
import { CardinalDirection } from './cardinaldirection.enum';

interface VoidFunction {
	(): void;
}

export interface DragInfo {
	source: any,
	target: any,
	type: string,
	direction: CardinalDirection,
	closeOrigin: VoidFunction
}

export function shallowCopyDragInfo(n: DragInfo) {
	return {
		source: n.source,
		target: n.target,
		type: n.type,
		direction: n.direction,
		closeOrigin: n.closeOrigin
	}
}
