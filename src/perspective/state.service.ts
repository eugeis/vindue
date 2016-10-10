import { Injectable } from '@angular/core';

import { decycle, retrocycle } from './circle.functions';
import { TreeInterface } from '../tree/tree.interface';
import { NodeInterface } from '../node/treenode.interface';

class Perspective {
	constructor(private name: string, private tree: TreeInterface.Tree) {
		this.tree = decycle(TreeInterface.copyTree(tree), undefined);
	}

	getTree(): TreeInterface.Tree {
		retrocycle(this.tree);
		let returnTree: TreeInterface.Tree = TreeInterface.copyTree(this.tree);
		this.tree = decycle(this.tree, undefined);
		return returnTree;
	}
}

@Injectable()
export class StateService {
	persp: Perspective;

	constructor() {  }

	savePerspective(name: string, tree: TreeInterface.Tree) {
		this.persp = new Perspective(name, tree);
	}

	restorePerspective(name: string) {
		if (this.persp) {
			return this.persp.getTree();
		}
	}
}
