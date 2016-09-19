import { Pipe, PipeTransform } from '@angular/core';

import { StringFilterPipe } from './stringfilter.pipe';

describe('TitleCasePipe', () => {
	let pipe = new StringFilterPipe();

	it('should throw at undefined haystack', () => {
		let haystack: string[];
		let needle: string;

		expect(() => {pipe.transform(haystack, needle)}).toThrow();
	});

	it('should return input at undefined limit', () => {
			let haystack: string[] = ["Hello", "World"];
			let needle: string;

			let result: string[] = pipe.transform(haystack, needle);
			expect(haystack).not.toBe(result);
			expect(haystack.length).toBe(2);
			expect(result.length).toBe(2);
			expect(result[0]).toBe("Hello");
			expect(result[1]).toBe("World");
	});

	it('should return input at defined limit', () => {
			let haystack: string[] = ["Bond", "Club", "Club", "Club", "Club",
			"Club", "Dave", "Fight", "Fight", "Fight", "Fight", "Fight",
			"Gentleman", "Hello", "I", "I", "I", "I'm", "I'm", "I'm",
			"James Bond", "My", "No", "The", "The", "Tis", "Use", "Welcome",
			"World", "a", "a", "about", "about", "afraid", "am", "but", "can't",
			"dead", "do", "do", "do", "father", "first", "force", "is", "is",
			"is", "luke", "man", "methos", "name", "not", "not", "not", "of",
			"of", "people", "rule", "rule", "scratch", "second", "see", "smart",
			"sorry", "talk", "talk", "that", "the", "to", "you", "you", "your"];

			{
				let needle: string = "I";
				let result: string[] = pipe.transform(haystack, needle);

				expect(result.length).toBe(17);
			}

			{
				let needle: string = "me";
				let result: string[] = pipe.transform(haystack, needle);

				expect(result.length).toBe(4);
			}

			{
				let needle: string = "mE";
				let result: string[] = pipe.transform(haystack, needle);

				expect(result.length).toBe(4);
			}

			{
				let needle: string = "Or";
				let result: string[] = pipe.transform(haystack, needle);

				expect(result.length).toBe(3);
			}

			{
				let needle: string = "oR";
				let result: string[] = pipe.transform(haystack, needle);

				expect(result.length).toBe(3);
			}

			{
				let needle: string = "bOnD";
				let result: string[] = pipe.transform(haystack, needle);

				expect(result.length).toBe(2);
			}

			{
				let needle: string = "tH";
				let result: string[] = pipe.transform(haystack, needle);

				expect(result.length).toBe(6);
			}

			{
				let needle: string = "Fi";
				let result: string[] = pipe.transform(haystack, needle);

				expect(result.length).toBe(6);
			}
	});
});
