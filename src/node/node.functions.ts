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

import { DragInfo } from '../drag/draginfo.model';
import { CardinalDirection } from '../drag/cardinaldirection.enum';
import { NodeOrientation } from './nodeorientation.enum';

import { NodeInterface } from './treenode.interface';

export function insertPanel(d: DragInfo, orientation: NodeOrientation, branches: NodeInterface.TreeNode[]): void {
	let i: number = branches.indexOf(d.target);
	let dir: CardinalDirection = d.direction;
	let source: NodeInterface.TreeNode = NodeInterface.cloneNodeShallow(d.source);

	if (i < 0) {
		throw "Target was not found in branches";
	}

	if (dir != CardinalDirection.North && dir != CardinalDirection.West
	&& dir != CardinalDirection.East && dir != CardinalDirection.South) {
		throw "Unknown cardinal direction (must be n,w,s,e)"
	}

	if (dir === CardinalDirection.North && orientation === NodeOrientation.Horizontal
	 || dir === CardinalDirection.West && orientation === NodeOrientation.Vertical) {
		branches.splice(i, 0, source);
	} else if (dir === CardinalDirection.South && orientation === NodeOrientation.Horizontal
	 || dir === CardinalDirection.East && orientation === NodeOrientation.Vertical) {
		branches.splice(i+1, 0, source);
	} else {
		let n: NodeInterface.TreeNode = {
			branches: []
		};

		let removed: NodeInterface.TreeNode = branches.splice(i, 1, n)[0];

		if (dir === CardinalDirection.North || dir === CardinalDirection.West) {
			n.branches = [source, removed];
		} else {
			n.branches = [removed, source];
		}
	}
}

export function deletePanel(childNode: NodeInterface.TreeNode, branches: NodeInterface.TreeNode[]): void {
	let i = branches.indexOf(childNode);
	if (0 <= i && i < branches.length) {
		branches.splice(i, 1);
	}
}

export function promotePanel(childNode: NodeInterface.TreeNode, branches: NodeInterface.TreeNode[]): void {
	let i = branches.indexOf(childNode);
	if (0 <= i && i < branches.length && childNode.branches.length == 1) {
		if (childNode.branches[0].branches.length <= 1) {
			childNode.branches[0].size = branches[i].size;
			branches[i] = childNode.branches[0];
		} else {
			let removed: NodeInterface.TreeNode = branches.splice(i, 1)[0];
			childNode.branches[0].branches.forEach(function(d) {
				d.size = removed.size / childNode.branches[0].branches.length;
			});
			branches.splice.apply(branches, [<any>i, 0].concat(childNode.branches[0].branches));
		}
	}
}
