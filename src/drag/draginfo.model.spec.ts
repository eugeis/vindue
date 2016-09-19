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
import { DragInfo, shallowCopyDragInfo } from './draginfo.model';
import { CardinalDirection } from './cardinaldirection.enum';

describe("DragInfo", () => {
	it("should do a deep copy (north)", () => {
		let origin: DragInfo = {
			source: "Source1",
			target: "Target1",
			type: "The type1",
			direction: CardinalDirection.North,
			closeOrigin: function() { }
		}

		let copy: DragInfo = shallowCopyDragInfo(origin);

		expect(copy).not.toBe(origin);
		expect(copy.source).toBe(origin.source);
		expect(copy.target).toBe(origin.target);
		expect(copy.type).toBe(origin.type);
		expect(copy.direction).toBe(origin.direction);
		expect(copy.closeOrigin).toBe(origin.closeOrigin);
	});

	it("should do a deep copy (south)", () => {
		let origin: DragInfo = {
			source: "Source2",
			target: "Target2",
			type: "The type2",
			direction: CardinalDirection.South,
			closeOrigin: function() { }
		}

		let copy: DragInfo = shallowCopyDragInfo(origin);

		expect(copy).not.toBe(origin);
		expect(copy.source).toBe(origin.source);
		expect(copy.target).toBe(origin.target);
		expect(copy.type).toBe(origin.type);
		expect(copy.direction).toBe(origin.direction);
		expect(copy.closeOrigin).toBe(origin.closeOrigin);
	});

	it("should do a deep copy (west)", () => {
		let origin: DragInfo = {
			source: "Source3",
			target: "Target3",
			type: "The type3",
			direction: CardinalDirection.West,
			closeOrigin: function() { }
		}

		let copy: DragInfo = shallowCopyDragInfo(origin);

		expect(copy).not.toBe(origin);
		expect(copy.source).toBe(origin.source);
		expect(copy.target).toBe(origin.target);
		expect(copy.type).toBe(origin.type);
		expect(copy.direction).toBe(origin.direction);
		expect(copy.closeOrigin).toBe(origin.closeOrigin);
	});

	it("should do a deep copy (east)", () => {
		let origin: DragInfo = {
			source: "Source4",
			target: "Target4",
			type: "The type4",
			direction: CardinalDirection.East,
			closeOrigin: function() { }
		}

		let copy: DragInfo = shallowCopyDragInfo(origin);

		expect(copy).not.toBe(origin);
		expect(copy.source).toBe(origin.source);
		expect(copy.target).toBe(origin.target);
		expect(copy.type).toBe(origin.type);
		expect(copy.direction).toBe(origin.direction);
		expect(copy.closeOrigin).toBe(origin.closeOrigin);
	});
})
