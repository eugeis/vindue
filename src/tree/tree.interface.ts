import { NodeInterface } from '../node/treenode.interface';
import { NodeOrientation } from '../node/nodeorientation.enum';
import { ModelPtr, copy, hasInput, setInput, getInputIdentifier } from '../modelptr.model';

export namespace TreeInterface {
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

	function resolveIdentifiers(todo: ModelPtr[], modelList: ModelPtr[], modelTranslation) {
		todo.forEach((d) => {
			console.log(d.identifier + " -> " + modelTranslation[getInputIdentifier(d)])
			setInput(d, modelList[modelTranslation[getInputIdentifier(d)]]);
		});
	}

	function copyLeaf(n: NodeInterface.TreeNode, todo: ModelPtr[], modelList: ModelPtr[], modelTranslation) {
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

	export interface Tree extends NodeInterface.TreeNode {
		orientation: NodeOrientation
	}
}
