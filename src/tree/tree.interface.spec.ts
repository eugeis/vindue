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
import { TreeInterface } from './tree.interface';
import { NodeInterface } from '../node/treenode.interface';
import { NodeOrientation } from '../node/nodeorientation.enum';
import * as Model from '../modelptr.model';

/**
 * Tree
 * ├── A
 * ├── B
 * │   ├── B0 --> A
 * │   ├── B1 --> B0
 * │   └── B2 --> B0
 * └── C
 *     ├── C0
 *     ├── C1 --> B1
 *     └── C2
 *         ├── C20 --> C0
 *         └── C21 --> C0
 *
 */

describe("Tree-specific functions", () => {
	it("should copy a tree", () => {
		let modelC21: Model.ModelPtr = new Model.ModelPtr();
		let nodeC21: NodeInterface.TreeNode = {
			branches: [],
			model: modelC21,
			name: "C21"
		};

		let modelC20: Model.ModelPtr = new Model.ModelPtr();
		let nodeC20: NodeInterface.TreeNode = {
			branches: [],
			model: modelC20,
			name: "C20"
		};

		let nodeC2: NodeInterface.TreeNode = {
			branches: [nodeC20, nodeC21]
		};

		let modelC1: Model.ModelPtr = new Model.ModelPtr();
		let nodeC1: NodeInterface.TreeNode = {
			branches: [],
			model: modelC1,
			name: "C1"
		};

		let modelC0: Model.ModelPtr = new Model.ModelPtr();
		let nodeC0: NodeInterface.TreeNode = {
			branches: [],
			model: modelC0,
			name: "C0"
		};

		let nodeC: NodeInterface.TreeNode = {
			branches: [nodeC0, nodeC1, nodeC2]
		};

		let modelB2: Model.ModelPtr = new Model.ModelPtr();
		let nodeB2: NodeInterface.TreeNode = {
			branches: [],
			model: modelB2,
			name: "B2"
		};

		let modelB1: Model.ModelPtr = new Model.ModelPtr();
		let nodeB1: NodeInterface.TreeNode = {
			branches: [],
			model: modelB1,
			name: "B1"
		};

		let modelB0: Model.ModelPtr = new Model.ModelPtr();
		let nodeB0: NodeInterface.TreeNode = {
			branches: [],
			model: modelB0,
			name: "B0"
		};

		let nodeB: NodeInterface.TreeNode = {
			branches: [nodeB0, nodeB1, nodeB2]
		};

		let modelA: Model.ModelPtr = new Model.ModelPtr();
		let nodeA: NodeInterface.TreeNode = {
			branches: [],
			model: modelA
		};

		Model.setInput(modelB0, modelA);
		Model.setInput(modelB1, modelB0);
		Model.setInput(modelB2, modelB0);
		Model.setInput(modelC1, modelB1);
		Model.setInput(modelC20, modelC0);
		Model.setInput(modelC21, modelC0);

		let tree: TreeInterface.Tree = {
			orientation: NodeOrientation.Horizontal,
			branches: [nodeA, nodeB, nodeC]
		};

		let copy: TreeInterface.Tree = TreeInterface.copyTree(tree);

		expect(copy).not.toBe(tree);
		expect(copy.branches.length).toBe(3);
		expect(copy.branches.length).toBe(tree.branches.length);

		/* A B C */
		{
			let A: NodeInterface.TreeNode = copy.branches[0];
			expect(A).not.toBe(nodeA);
			expect(A.name).toBe(nodeA.name);
			expect(A.name).toBe(tree.branches[0].name);
			expect(A.branches.length).toBe(0);
			expect(A.branches.length).toBe(tree.branches[0].branches.length);

			let B: NodeInterface.TreeNode = copy.branches[1];
			expect(B).not.toBe(nodeB);
			expect(B.name).toBe(nodeB.name);
			expect(B.name).toBe(tree.branches[1].name);
			expect(B.branches.length).toBe(3);
			expect(B.branches.length).toBe(tree.branches[1].branches.length);

			/* B0 B1 B2 */
			{
				let B0: NodeInterface.TreeNode = B.branches[0];
				expect(B0).not.toBe(nodeB0);
				expect(B0.name).toBe(nodeB0.name);
				expect(B0.name).toBe(nodeB.branches[0].name);
				expect(B0.name).toBe("B0");
				expect(B0.branches.length).toBe(0);
				expect(B0.branches.length).toBe(nodeB.branches[0].branches.length);

				expect(Model.getInputIdentifier(B0.model)).toBe(A.model.identifier);

				let B1: NodeInterface.TreeNode = B.branches[1];
				expect(B1).not.toBe(nodeB1);
				expect(B1.name).toBe(nodeB1.name);
				expect(B1.name).toBe(nodeB.branches[1].name);
				expect(B1.name).toBe("B1");
				expect(B1.branches.length).toBe(0);
				expect(B1.branches.length).toBe(nodeB.branches[1].branches.length);

				expect(Model.getInputIdentifier(B1.model)).toBe(B0.model.identifier);

				let B2: NodeInterface.TreeNode = B.branches[2];
				expect(B2).not.toBe(nodeB2);
				expect(B2.name).toBe(nodeB2.name);
				expect(B2.name).toBe(nodeB.branches[2].name);
				expect(B2.name).toBe("B2");
				expect(B2.branches.length).toBe(0);
				expect(B2.branches.length).toBe(nodeB.branches[2].branches.length);

				expect(Model.getInputIdentifier(B2.model)).toBe(B0.model.identifier);
			}

			let C: NodeInterface.TreeNode = copy.branches[2];
			expect(C).not.toBe(nodeC);
			expect(C.name).toBe(nodeC.name);
			expect(C.name).toBe(tree.branches[2].name);
			expect(C.branches.length).toBe(3);
			expect(C.branches.length).toBe(tree.branches[2].branches.length);

			/* C0 C1 C2 */
			{
				let C0: NodeInterface.TreeNode = C.branches[0];
				expect(C0).not.toBe(nodeC0);
				expect(C0.name).toBe(nodeC0.name);
				expect(C0.name).toBe(nodeC.branches[0].name);
				expect(C0.name).toBe("C0");
				expect(C0.branches.length).toBe(0);
				expect(C0.branches.length).toBe(nodeC.branches[0].branches.length);

				let C1: NodeInterface.TreeNode = C.branches[1];
				expect(C1).not.toBe(nodeC1);
				expect(C1.name).toBe(nodeC1.name);
				expect(C1.name).toBe(nodeC.branches[1].name);
				expect(C1.name).toBe("C1");
				expect(C1.branches.length).toBe(0);
				expect(C1.branches.length).toBe(nodeC.branches[1].branches.length);

				expect(Model.getInputIdentifier(C1.model)).toBe(B.branches[1].model.identifier);

				let C2: NodeInterface.TreeNode = C.branches[2];
				expect(C2).not.toBe(nodeC2);
				expect(C2.name).toBe(nodeC2.name);
				expect(C2.name).toBe(nodeC.branches[2].name);
				expect(C2.branches.length).toBe(2);
				expect(C2.branches.length).toBe(nodeC.branches[2].branches.length);

				/* C20 C21 */
				{
					let C20: NodeInterface.TreeNode = C2.branches[0];
					expect(C20).not.toBe(nodeC20);
					expect(C20.name).toBe(nodeC20.name);
					expect(C20.name).toBe(nodeC2.branches[0].name);
					expect(C20.name).toBe("C20");
					expect(C20.branches.length).toBe(0);
					expect(C20.branches.length).toBe(nodeC2.branches[0].branches.length);

					expect(Model.getInputIdentifier(C20.model)).toBe(C0.model.identifier);

					let C21: NodeInterface.TreeNode = C2.branches[1];
					expect(C21).not.toBe(nodeC21);
					expect(C21.name).toBe(nodeC21.name);
					expect(C21.name).toBe(nodeC2.branches[1].name);
					expect(C21.name).toBe("C21");
					expect(C21.branches.length).toBe(0);
					expect(C21.branches.length).toBe(nodeC2.branches[1].branches.length);

					expect(Model.getInputIdentifier(C21.model)).toBe(C0.model.identifier);
				}
			}
		}
	});
});
