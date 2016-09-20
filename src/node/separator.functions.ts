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
