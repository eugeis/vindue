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
import { NodeInterface } from '../node/treenode.interface';
import { NodeOrientation } from '../node/nodeorientation.enum';
import { ModelPtr, copy, hasInput, setInput, getInputIdentifier } from '../modelptr.model';

export namespace TreeInterface {
	export interface Tree extends NodeInterface.TreeNode {
		orientation: NodeOrientation
	}

	export function copyTree(tree: Tree): Tree {
		let newTree: Tree = {
			orientation: tree.orientation,
			branches: tree.branches,
			name: tree.name,
			window: tree.window,
			size: tree.size,
			model: tree.model
		}

		let todo: ModelPtr[] = [];
		let modelList: ModelPtr[] = [];
		let modelTranslation: number[] = [];

		copyLeaf(newTree, todo, modelList, modelTranslation);
		resolveIdentifiers(todo, modelList, modelTranslation);

		return newTree;
	}

	function resolveIdentifiers(todo: ModelPtr[], modelList: ModelPtr[], modelTranslation: number[]) {
		todo.forEach((d) => {
			setInput(d, modelList[modelTranslation[getInputIdentifier(d)]]);
		});
	}

	function copyLeaf(n: NodeInterface.TreeNode, todo: ModelPtr[], modelList: ModelPtr[], modelTranslation: number[]) {
		n.branches = n.branches.map((d) => {
			let n: NodeInterface.TreeNode = NodeInterface.cloneNodeShallow(d);

			if (n.model) {
				let newModel = copy(n.model);
				modelTranslation[n.model.identifier] = newModel.identifier;
				n.model = newModel;

				if (hasInput(n.model)) {
					todo.push(n.model);
				}

				modelList[n.model.identifier] = n.model;
			}
			return n;
		});

		n.branches.forEach((d) => {
			copyLeaf(d, todo, modelList, modelTranslation);
		});
	}
}
