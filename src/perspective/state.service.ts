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
