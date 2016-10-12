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
