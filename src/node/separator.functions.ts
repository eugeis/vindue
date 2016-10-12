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
import { NodeOrientation } from './nodeorientation.enum';

export namespace SeparatorInterface {
	export class ElementDimension {
		prevEl: [number, number];
		nextEl: [number, number];
	}

	export class ElementSize {
		prevEl: number;
		nextEl: number;
	}

	export class CursorPosition {
		start: [number, number];
		end: [number, number];
	}


	export function calcEndposition(orientation: NodeOrientation, cursorPos: CursorPosition,
		dimensions: ElementDimension, size: ElementSize): [number, number] {

		if (orientation === NodeOrientation.Vertical) {
			return calc(cursorPos.start[0], cursorPos.end[0], dimensions.prevEl[0], dimensions.nextEl[0], size);
		} else { // if (orientation === NodeOrientation.Horizontal) {
			return calc(cursorPos.start[1], cursorPos.end[1], dimensions.prevEl[1], dimensions.nextEl[1], size);
		}
	}

	export function calc(cursorStart: number, cursorEnd: number, prevDimension: number,
		nextDimension: number, size: ElementSize): [number, number] {

		const diff: number = cursorStart - cursorEnd;
		const sum: number = size.prevEl + size.nextEl;
		const ratio: number = sum / (prevDimension + nextDimension);

		let prevSize: number = (prevDimension - diff) * ratio;
		let nextSize: number = (nextDimension + diff) * ratio;

		if (prevSize < 0 || nextSize > sum) {
			prevSize = 0;
			nextSize = sum;
		} else if (nextSize < 0 || prevSize > sum){
			prevSize = sum;
			nextSize = 0;
		}

		return [prevSize, nextSize];
	}
}
