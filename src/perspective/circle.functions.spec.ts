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
import * as Circle from './circle.functions';

describe("Circle functions by douglas crockford", () => {
	it("should process basic types without circles", () => {
		//numbers
		{
			expect(Circle.decycle(0)).toBe(0);
			expect(Circle.decycle(1)).toBe(1);
			expect(Circle.decycle(5)).toBe(5);
			expect(Circle.decycle(10)).toBe(10);
			expect(Circle.decycle(-1)).toBe(-1);
			expect(Circle.decycle(-5)).toBe(-5);
			expect(Circle.decycle(-10)).toBe(-10);
		}

		//strings
		{
			expect(Circle.decycle("0")).toBe("0");
			expect(Circle.decycle("1")).toBe("1");
			expect(Circle.decycle("5")).toBe("5");
			expect(Circle.decycle("10")).toBe("10");
			expect(Circle.decycle("-1")).toBe("-1");
			expect(Circle.decycle("-5")).toBe("-5");
			expect(Circle.decycle("-10")).toBe("-10");
		}

		//booleans
		{
			expect(Circle.decycle(true)).toBe(true);
			expect(Circle.decycle(false)).toBe(false);
		}

		//arrays
		{
			let empty = [];
			expect(Circle.decycle([]).length).toBe(0);

			//numbers
			{
				let filled = [1,2,3];
				expect(Circle.decycle(filled)).not.toBe(filled);
				expect(Circle.decycle(filled).length).toBe(filled.length);
				expect(Circle.decycle(filled)[0]).toBe(filled[0]);
				expect(Circle.decycle(filled)[1]).toBe(filled[1]);
				expect(Circle.decycle(filled)[2]).toBe(filled[2]);
			}

			//strings
			{
				let filled = ["1","2","3"];
				expect(Circle.decycle(filled)).not.toBe(filled);
				expect(Circle.decycle(filled).length).toBe(filled.length);
				expect(Circle.decycle(filled)[0]).toBe(filled[0]);
				expect(Circle.decycle(filled)[1]).toBe(filled[1]);
				expect(Circle.decycle(filled)[2]).toBe(filled[2]);
			}

			//booleans
			{
				let filled = [true, false, true];
				expect(Circle.decycle(filled)).not.toBe(filled);
				expect(Circle.decycle(filled).length).toBe(filled.length);
				expect(Circle.decycle(filled)[0]).toBe(filled[0]);
				expect(Circle.decycle(filled)[1]).toBe(filled[1]);
				expect(Circle.decycle(filled)[2]).toBe(filled[2]);
			}
		}

		//objects
		{
			expect(Circle.decycle({a: 1}).a).toBe(1);
			expect(Circle.decycle({b: 2}).b).toBe(2);
			expect(Circle.decycle({c: 3}).c).toBe(3);

			{
				let obj = {a: 3, b: 2, c: 1};
				expect(Circle.decycle(obj)).not.toBe(obj);
				expect(Circle.decycle(obj).a).toBe(3);
				expect(Circle.decycle(obj).b).toBe(2);
				expect(Circle.decycle(obj).c).toBe(1);
			}
		}
	});

	it("should decycle circular references", () => {
		const aId = 1;
		const bId = 2;

		let a: any = { id: aId };
		let b: any = { id: bId };
		a.b = b;
		b.a = a;

		expect(a.b).toBe(b);
		expect(b.a).toBe(a);

		let decycleA = Circle.decycle(a);
		let decycleB = Circle.decycle(b);

		expect(decycleA).not.toBe(a);
		expect(decycleB).not.toBe(b);

		expect(decycleA.b).not.toBe(b);
		expect(decycleB.a).not.toBe(a);

		expect(decycleA.id).toBe(aId);
		expect(decycleB.id).toBe(bId);
	});

	it("should retrocycle circular references", () => {
		const aId = 15;
		const bId = 12;

		let a: any = { id: aId };
		let b: any = { id: bId };
		a.b = b;
		b.a = a;

		expect(a.b).toBe(b);
		expect(b.a).toBe(a);

		{
			let decycleA = Circle.decycle(a);
			Circle.retrocycle(decycleA);
			expect(decycleA.b.id).toBe(bId);
			expect(decycleA.b.a).toBe(decycleA);
			expect(decycleA.b.a.id).toBe(aId);
			expect(decycleA.b.a.b).toBe(decycleA.b);
		}

		{
			let decycleB = Circle.decycle(b);
			Circle.retrocycle(decycleB);
			expect(decycleB.a.id).toBe(aId);
			expect(decycleB.a.b).toBe(decycleB);
			expect(decycleB.a.b.id).toBe(bId);
			expect(decycleB.a.b.a).toBe(decycleB.a);
		}
	});

	it("should retrocycle self references", () => {
		let a: any = {};
		a.a = a;

		let decycle = Circle.decycle(a);
		expect(decycle.a).not.toBe(a);
		expect(decycle.a).not.toBe(decycle);

		Circle.retrocycle(decycle);

		expect(decycle.a).toBe(decycle);
		expect(decycle.a.a).toBe(decycle);
		expect(decycle.a.a).toBe(decycle.a);
	});

	it("should retrocycle circular array references", () => {
		let a: any = {};

		let b: any = {};
		let c: any = {};
		let d: any = {};

		a.branches = [a,b,c,d];

		a.root = a;
		b.root = a;
		c.root = a;
		d.root = a;

		{
			let decycleA = Circle.decycle(a);

			expect(decycleA.root).not.toBe(a);
			expect(decycleA.root).not.toBe(decycleA);

			expect(decycleA.branches[0]).not.toBe(a);
			expect(decycleA.branches[0]).not.toBe(decycleA);
			expect(decycleA.branches[1].root).not.toBe(a);
			expect(decycleA.branches[1].root).not.toBe(decycleA);
			expect(decycleA.branches[2]).not.toBe(a);
			expect(decycleA.branches[2]).not.toBe(decycleA);
			expect(decycleA.branches[3].root).not.toBe(a);
			expect(decycleA.branches[3].root).not.toBe(decycleA);

			Circle.retrocycle(decycleA);

			expect(decycleA.root).toBe(decycleA);
			expect(decycleA.branches[0]).toBe(decycleA);
			expect(decycleA.branches[1].root).toBe(decycleA);
			expect(decycleA.branches[2].root).toBe(decycleA);
			expect(decycleA.branches[3].root).toBe(decycleA);
		}

	});
});
