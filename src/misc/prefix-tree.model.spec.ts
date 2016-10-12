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
import { PrefixTree } from './prefix-tree.model';

describe("Prefix-Tree", () => {
	it("should add the same value twice", () => {
		let tree: PrefixTree = new PrefixTree();
		tree.insert("Rom");
		tree.insert("Rom");

		{
			let subtree: string[] = tree.getSubTree("Rom");
			expect(subtree.length).toBe(2);
			expect(subtree.includes("Rom")).toBeTruthy();
		}
	});

	it("should return the correct subtree", () => {
		let tree: PrefixTree = new PrefixTree();
		tree.insert("Rom");
		tree.insert("Romane");
		tree.insert("Romanus");
		tree.insert("Romulus");
		tree.insert("Rubens");
		tree.insert("Ruber");
		tree.insert("Rubicon");
		tree.insert("Rubicundus");

		{
			let subtree: string[] = tree.getSubTree("Rom");
			expect(subtree.length).toBe(4);
			expect(subtree.includes("Rom")).toBeTruthy();
			expect(subtree.includes("Romane")).toBeTruthy();
			expect(subtree.includes("Romanus")).toBeTruthy();
			expect(subtree.includes("Romulus")).toBeTruthy();
		}

		{
			let subtree: string[] = tree.getSubTree("Ru");
			expect(subtree.length).toBe(4);
			expect(subtree.includes("Rubens")).toBeTruthy();
			expect(subtree.includes("Ruber")).toBeTruthy();
			expect(subtree.includes("Rubicon")).toBeTruthy();
			expect(subtree.includes("Rubicundus")).toBeTruthy();
		}

		{
			let subtree: string[] = tree.getSubTree("R");
			expect(subtree.length).toBe(8);
			expect(subtree.includes("Rom")).toBeTruthy();
			expect(subtree.includes("Romane")).toBeTruthy();
			expect(subtree.includes("Romanus")).toBeTruthy();
			expect(subtree.includes("Romulus")).toBeTruthy();
			expect(subtree.includes("Rubens")).toBeTruthy();
			expect(subtree.includes("Ruber")).toBeTruthy();
			expect(subtree.includes("Rubicon")).toBeTruthy();
			expect(subtree.includes("Rubicundus")).toBeTruthy();
		}
	});

	it("should return the correct subtree", () => {
		let tree: PrefixTree = new PrefixTree();
		tree.insert("Father");
		tree.insert("father");
		tree.insert("FaThEr");
		tree.insert("fATHer");
		tree.insert("fan");
		tree.insert("Fight");
		tree.insert("Fight");
		tree.insert("fIGHt");
		tree.insert("Offense");
		tree.insert("offense");
		tree.insert("offensive");
		tree.insert("offsite");
		tree.insert("offside");
		tree.insert("offside-player");
		tree.insert("offside-pass");
		tree.insert("My");
		tree.insert("Mei");
		tree.insert("May");
		tree.insert("May");

		{
			let subtree: string[] = tree.getSubTree("father");
			expect(subtree.length).toBe(4);
		}

		{
			let subtree: string[] = tree.getSubTree("fa");
			expect(subtree.length).toBe(5);
		}
	});
});
