import { NodeInterface } from '../node/treenode.interface';
import { NodeOrientation } from '../node/nodeorientation.enum';

export namespace TreeInterface {
	export function copyTree(tree: Tree): Tree {
		let newTree: Tree = {
			orientation: tree.orientation,
			branches: [],
			name: tree.name,
			window: tree.window,
			size: tree.size,
			model: tree.model
		}

		newTree.branches = tree.branches.map((d) => {
			return NodeInterface.cloneNodeShallow(d);
		});

		newTree.branches.forEach((d) => {
			copyLeaf(d);
		});

		return newTree;
	}

	function copyLeaf(n: NodeInterface.TreeNode) {
		n.branches = n.branches.map((d) => {
			return NodeInterface.cloneNodeShallow(d);
		});

		n.branches.forEach((d) => {
			copyLeaf(d);
		});
	}

	export interface Tree extends NodeInterface.TreeNode {
		orientation: NodeOrientation
	}
}
