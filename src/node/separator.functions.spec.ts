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
