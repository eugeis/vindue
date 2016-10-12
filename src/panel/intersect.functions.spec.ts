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
import { intersect } from './intersect.functions';

describe("Intersect function", () => {
	it("should result in an empty set", () => {
		{
			let ret = intersect([], []);
			expect(ret.length).toBe(0);
		}
		{
			let ret = intersect(["1","2","3"], []);
			expect(ret.length).toBe(0);
		}
		{
			let ret = intersect([], ["1","2","3"]);
			expect(ret.length).toBe(0);
		}
		{
			let ret = intersect(["1","2","3"],["4","5","6"]);
			expect(ret.length).toBe(0);
		}
		{
			let ret = intersect(
				["1","2","3","4","5","6","7","8","9","10"],
				["11","12","13","14","15","16","17","18","19","20"]
			);
			expect(ret.length).toBe(0);
		}
	});


	it("should result in a non-empty set", () => {
		{
			let ret = intersect(["1","2","3"], ["1","2","3"]).sort();
			expect(ret.length).toBe(3);
			expect(ret[0]).toBe("1");
			expect(ret[1]).toBe("2");
			expect(ret[2]).toBe("3");
		}
		{
			let ret = intersect(["1","2"], ["1","2","3","4"]).sort();
			expect(ret.length).toBe(2);
			expect(ret[0]).toBe("1");
			expect(ret[1]).toBe("2");
		}
		{
			let ret = intersect(["1","2","3","4"],["4","5","6"]);
			expect(ret.length).toBe(1);
			expect(ret[0]).toBe("4");
		}
		{
			let ret = intersect(
				["1","2","13","4","15","6","7","18","9","10"],
				["11","12","13","14","15","16","17","18","19","20"]
			).sort();
			expect(ret.length).toBe(3);
			expect(ret[0]).toBe("13");
			expect(ret[1]).toBe("15");
			expect(ret[2]).toBe("18");
		}
		{
			let ret = intersect(["1","2","1","1"], ["1"]).sort();
			expect(ret.length).toBe(1);
			expect(ret[0]).toBe("1");
		}
		{
			let ret = intersect(["1","2","1","1"], ["1","2"]).sort();
			expect(ret.length).toBe(2);
			expect(ret[0]).toBe("1");
			expect(ret[1]).toBe("2");
		}
	});
});
