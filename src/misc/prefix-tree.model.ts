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
class Node {
	private children: Node[] = [];
	private prefix: string;

	constructor(prefix: string) {
		this.prefix = prefix || "";
	}

	insert(n: string): void {
		let index: number = this.getChild(n);

		if (index != -1) {
			let cross: Node = this.children[index];

			if (cross.prefix.length > 0 && n.toLowerCase() === cross.prefix.toLowerCase()) {
				if (cross.isLeaf()) {
					cross.children.push(new Node(""));
				}

				cross.children.push(new Node(""));
				return;
			}

			let commonPrefix: string = this.getCommonPrefix(n, cross.prefix);
			let leftSuffix = cross.prefix.substring(commonPrefix.length);
			let rightSuffix = n.substring(commonPrefix.length);

			if (cross.isLeaf()) {
				cross.prefix = commonPrefix;
				cross.children = [new Node(leftSuffix), new Node(rightSuffix)];
				return;
			}

			if (!cross.isLeaf()) {
				if (commonPrefix.length === cross.prefix.length) {
					cross.insert(n.substring(commonPrefix.length));
				} else {
					let leftNode: Node = new Node(leftSuffix);
					leftNode.children = cross.children;

					cross.prefix = commonPrefix;
					cross.children = [leftNode, new Node(rightSuffix)];
				}
			}
		} else {
			this.children.push(new Node(n));
		}
	}

	getChild(n: string): number {
		let index = -1;

		this.children.forEach((d, i) => {
			if (this.isBranch(d.prefix, n)) {
				index = i;
			}
		});

		return index;
	}

	isBranch(p: string, n: string): boolean {
		return p.charAt(0).toLowerCase() === n.charAt(0).toLowerCase();
	}

	isLeaf(): boolean {
		return this.children.length === 0;
	}

	getCommonPrefix(n1: string, n2: string): string {
		if (!n1 || !n2 || n1.length == 0 || n2.length == 0) {
			return "";
		}

		let i = 0
		for (; i < n1.length && n1.charAt(i).toLowerCase() === n2.charAt(i).toLowerCase(); i++);

		return n1.substr(0, i);
	}

	getSubTree(needle: string, pref: string, result: string[]) {
		if (this.prefix === "" && this.children.length != 0) {
			this.children.forEach((child) => {
				child.getSubTree(needle, pref, result);
			});

			return;
		}

		if (this.isBranch(this.prefix, needle) || (!this.isLeaf() && needle === "")) {
			this.children.forEach((child) => {
				let newNeedle = needle.substring(this.prefix.length);
				let newPrefix = pref + this.prefix;
				child.getSubTree(newNeedle, newPrefix, result);
			});
		}

		if (this.isLeaf() && needle === "") {
			result.push(pref + this.prefix);
		}
	}
}

export class PrefixTree {
	private root: Node = new Node("");

	insert(n: string): void {
		this.root.insert(n);
	}

	getSubTree(n: string): string[] {
		let result: string[] = [];
		this.root.getSubTree(n, "", result);
		return result;
	}
}
