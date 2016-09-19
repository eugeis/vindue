import { Pipe, PipeTransform } from '@angular/core';

import { LimitPipe } from './limit.pipe';

describe('TitleCasePipe', () => {
	let pipe = new LimitPipe();

	it('should throw at undefined parameters', () => {
		let input: string[];
		let limit: number;

		expect(() => {pipe.transform(input, limit)}).toThrow();
	});

	it('should return input at undefined limit', () => {
		let input: string[] = ["Hello", "World"];
		let limit: number;

		let result = pipe.transform(input, limit);
		expect(result.length).toBe(2);
		expect(result[0]).toBe("Hello");
		expect(result[1]).toBe("World");
		expect(input).not.toBe(result);
	});

	it('should return input at out-of-range limit', () => {
		var input: string[] = ["Hello", "World"];
		{
			let limit: number = -1;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(2);
			expect(result[0]).toBe("Hello");
			expect(result[1]).toBe("World");
			expect(input).not.toBe(result);
			expect(input.length).toBe(2);
			expect(input.length).toBe(2);
		}

		{
			let limit: number = -4;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(2);
			expect(result[0]).toBe("Hello");
			expect(result[1]).toBe("World");
			expect(input).not.toBe(result);
			expect(input.length).toBe(2);
		}

		{
			let limit: number = 2;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(2);
			expect(result[0]).toBe("Hello");
			expect(result[1]).toBe("World");
			expect(input).not.toBe(result);
			expect(input.length).toBe(2);
		}

		{
			let limit: number = 100;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(2);
			expect(result[0]).toBe("Hello");
			expect(result[1]).toBe("World");
			expect(input).not.toBe(result);
			expect(input.length).toBe(2);
		}
	});

	it('should return input at out-of-range limit', () => {
		let input: string[] = ["Bond", "Club", "Club", "Club", "Club",
		"Club", "Dave", "Fight", "Fight", "Fight", "Fight", "Fight",
		"Gentleman", "Hello", "I", "I", "I", "I'm", "I'm", "I'm",
		"James Bond", "My", "No", "The", "The", "Tis", "Use", "Welcome",
		"World", "a", "a", "about", "about", "afraid", "am", "but", "can't",
		"dead", "do", "do", "do", "father", "first", "force", "is", "is",
		"is", "luke", "man", "methos", "name", "not", "not", "not", "of",
		"of", "people", "rule", "rule", "scratch", "second", "see", "smart",
		"sorry", "talk", "talk", "that", "the", "to", "you", "you", "your"];

		{
			let limit: number = 0;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(0);
			expect(input).not.toBe(result);
			expect(input.length).toBe(72);
		}

		{
			let limit: number = 1;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(1);
			expect(result[0]).toBe("Bond");
			expect(input).not.toBe(result);
			expect(input.length).toBe(72);
		}

		{
			let limit: number = 2;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(2);
			expect(result[0]).toBe("Bond");
			expect(result[1]).toBe("Club");
			expect(input).not.toBe(result);
			expect(input.length).toBe(72);
		}

		{
			let limit: number = 3;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(3);
			expect(result[0]).toBe("Bond");
			expect(result[1]).toBe("Club");
			expect(result[2]).toBe("Club");
			expect(input).not.toBe(result);
			expect(input.length).toBe(72);
		}

		{
			let limit: number = 20;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(20);
			expect(input).not.toBe(result);
			expect(input.length).toBe(72);
		}

		{
			let limit: number = 60;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(60);
			expect(input).not.toBe(result);
			expect(input.length).toBe(72);
		}

		{
			let limit: number = 80;

			let result = pipe.transform(input, limit);
			expect(result.length).toBe(72);
			expect(input).not.toBe(result);
			expect(input.length).toBe(72);
		}
	});
});
