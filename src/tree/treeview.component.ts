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
import { Component, Input, OnInit } from '@angular/core';

import { NodeInterface } from '../node/treenode.interface';

@Component({
	selector: 'ee-tree-view',
	template: `
	<section *ngIf="node && depth >= 0">
		<section *ngIf="node.branches && node.branches.length > 0 ">
			<section *ngFor="let branch of node.branches">
				<ee-tree-view [tree]="branch" [depth]="depth+1"></ee-tree-view>
			</section>
		</section>
		<section *ngIf="!node.branches || node.branches.length == 0">
			<span *ngFor="let i of arr">-</span>{{node.data}}
		</section>
	</section>
	`
})

export class TreeView implements OnInit {
	@Input("tree") node: NodeInterface.TreeNode;
	@Input() depth: number = 0;

	arr: number[] = [];

	ngOnInit() {
		this.arr = new Array(this.depth);
	}
}
