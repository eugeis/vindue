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
import { SeparatorInterface }  from './separator.functions';

describe("Separator Resizing", () => {
	it("should return the correct flex-size", () => {
		{
			let result: [number, number] = SeparatorInterface.calc(100, 50, 100, 100, {
				prevEl: 1,
				nextEl: 1
			});

			expect(result[0]).toBe(0.5);
			expect(result[1]).toBe(1.5);
		}

		{
			let result: [number, number] = SeparatorInterface.calc(200, 100, 200, 100, {
				prevEl: 2,
				nextEl: 1
			});

			expect(result[0]).toBe(1);
			expect(result[1]).toBe(2);
		}
	});

	it("should return the max. flex-sizes when cursorEnd is outside the element", () => {
		{
			let result: [number, number] = SeparatorInterface.calc(100, -50, 100, 100, {
				prevEl: 1,
				nextEl: 1
			});

			expect(result[0]).toBe(0);
			expect(result[1]).toBe(2);
		}

		{
			let result: [number, number] = SeparatorInterface.calc(100, 250, 100, 100, {
				prevEl: 2,
				nextEl: 1
			});

			expect(result[0]).toBe(3);
			expect(result[1]).toBe(0);
		}
	});

});
