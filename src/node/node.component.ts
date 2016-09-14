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
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { DropInfo } from '../drag/dropinfo.model';
import { NodeOrientation, inv, getClass } from './nodeorientation.enum';
import { SeparatorComponent } from './separator.component';
import { CardinalDirection } from '../drag/cardinaldirection.enum';
import { PanelComponent } from '../panel/panel.component';
import { PanelHeaderComponent } from '../panel/panel-header.component';
import { Wrapper } from '../wrapper.model';

import { NodeInterface } from './treenode.interface';
import { Map } from '../tree/windowmapper.function';

@Component({
	selector: 'ee-node',
	styles: [`
		.ee-panel-container {
			display: flex;
			flex: 1;
			flex-direction: inherit;
			flex-direction: column !important;
			position: relative;
			background: white;
			border-radius: 10px;
			overflow: hidden;
			margin: 1px;
		}

		.ee-node, .ee-node-direction, .ee-node-resizer {
			display: flex;
			flex: 1;
			flex-direction: inherit;
			position: relative;
		}
		.ee-node-direction.hor, .ee-separator.hor {
			flex-direction: column;
		}

		.ee-node-direction.vert, .ee-separator.vert {
			flex-direction: row;
		}

		.ee-node > div > div:last-child > ee-separator {
			display: none;
		}

		ee-node, ee-panel {
			display: flex;
			flex: 1;
		}
	`],
	template: `
		<div *ngIf="node && orientation" class="ee-node">
			<div *ngIf="node.branches && node.branches.length > 0" [ngClass]="nodeClass(orientation)" class="ee-node-direction">
				<div *ngFor="let branch of node.branches; let i = index" class="ee-node-resizer" [style.flex-grow]="branch.size">
					<ee-node
						[node]="branch"
						[orientation]="nodeInv(orientation)"
						[map]="map"
						[modules]="modules"
						[sharedData]="sharedData"
						(addPanel)="addPanel($event)"
						(promotePanel)="promotePanel($event)"
						(closePanel)="deletePanel($event)"
						(on)="onPanelAction($event)">
					</ee-node>
					<ee-separator *ngIf="node.branches[i+1]" [left]="branch" [right]="node.branches[i+1]" [orientation]="orientation"></ee-separator>
				</div>
			</div>
			<div *ngIf="!node.branches || node.branches.length == 0" class="ee-panel-container">
				<ee-panel-header [node]="node" (close)="closePanel()"></ee-panel-header>
				<ee-panel
					[window]="node.window"
					[model]="node.model"
					[map]="map"
					[modules]="modules"
					[sharedData]="sharedData"
					(add)="add($event)"
					(on)="onPanelAction($event)"></ee-panel>
			</div>
		</div>
	`
})

export class NodeComponent implements OnInit {
	@Input() node: NodeInterface.TreeNode;
	@Input() orientation: NodeOrientation;
	@Input() map: Map.WindowMapper;

	@Input() sharedData;
	@Input() modules: any[];

	@Output("addPanel") addEmitter: EventEmitter<DropInfo> = new EventEmitter<DropInfo>();
	@Output("promotePanel") promoteEmitter: EventEmitter<NodeInterface.TreeNode> = new EventEmitter<NodeInterface.TreeNode>();
	@Output("closePanel") closeEmitter: EventEmitter<NodeInterface.TreeNode> = new EventEmitter<NodeInterface.TreeNode>();
	@Output("on") onEmitter: EventEmitter<any> = new EventEmitter<any>();

	ngOnInit() {
		this.node.branches.forEach(function(d) {
			d.size = d.size || 1;
		});

		if (!this.node.branches || this.node.branches.length == 0) {
			if (!this.node.model) {
				this.node.model = new Wrapper<any>({});
			}
		}

		if (this.node.window && !this.node.name) {
			this.node.name = this.node.window;
		}
	}

	nodeClass(orientation: NodeOrientation): string {
		return getClass(orientation);
	}

	nodeInv(orientation: NodeOrientation): NodeOrientation {
		return inv(orientation);
	}

	add(dropInfo: DropInfo): void {
		dropInfo.target = this.node;
		if (dropInfo.target !== dropInfo.source) {
			dropInfo.source = NodeInterface.cloneNodeShallow(dropInfo.source);

			this.addEmitter.emit(dropInfo);
		}
	}

	addPanel(d: DropInfo): void {
		let i = this.node.branches.indexOf(d.target);
		let dir: CardinalDirection = d.direction;
		let orientation: NodeOrientation = this.orientation;
		let branches: NodeInterface.TreeNode[] = this.node.branches;

		if (dir === CardinalDirection.North && orientation === NodeOrientation.Horizontal
		 || dir === CardinalDirection.West && orientation === NodeOrientation.Vertical) {
			branches.splice(i, 0, d.source);
		} else if (dir === CardinalDirection.South && orientation === NodeOrientation.Horizontal
		 || dir === CardinalDirection.East && orientation === NodeOrientation.Vertical) {
			branches.splice(i+1, 0, d.source);
		} else {
			let n: NodeInterface.TreeNode = {
				branches: []
			};

			let removed: NodeInterface.TreeNode = branches.splice(i, 1, n)[0];

			if (dir === CardinalDirection.North || dir === CardinalDirection.West) {
				n.branches = [d.source, removed];
			} else {
				n.branches = [removed, d.source];
			}
		}
	}

	closePanel(): void {
		this.closeEmitter.emit(this.node);
	}

	deletePanel(childNode: NodeInterface.TreeNode): void {
		let i = this.node.branches.indexOf(childNode);
		if (0 <= i && i < this.node.branches.length) {
			this.node.branches.splice(i, 1);
		}

		if (this.node.branches.length == 1) {
			this.promoteEmitter.emit(this.node);
		}
	}

	promotePanel(childNode: NodeInterface.TreeNode): void {
		let i = this.node.branches.indexOf(childNode);
		if (0 <= i && i < this.node.branches.length && childNode.branches.length == 1) {
			if (childNode.branches[0].branches.length <= 1) {
				childNode.branches[0].size = this.node.branches[i].size;
				this.node.branches[i] = childNode.branches[0];
			} else {
				let removed: NodeInterface.TreeNode = this.node.branches.splice(i, 1)[0];
				childNode.branches[0].branches.forEach(function(d) {
					d.size = removed.size / childNode.branches[0].branches.length;
				});
				this.node.branches.splice.apply(this.node.branches, [<any>i, 0].concat(childNode.branches[0].branches));
			}
		}
	}

	onPanelAction(e) {
		this.onEmitter.emit(e);
	}
}
