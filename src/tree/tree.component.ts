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
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TreeHeaderComponent } from './tree-header.component';
import { NodeComponent } from '../node/node.component';
import { NodeOrientation } from '../node/nodeorientation.enum';

import { NodeInterface } from '../node/treenode.interface';
import { Map } from './windowmapper.function';

export interface Tree extends NodeInterface.TreeNode {
	orientation: NodeOrientation
}

@Component({
	selector: 'ee-tree',
	styles: [`
		.add-window {
			height: 100%;
			width: 100%;
			background: rgba(0,0,0,0.5);
			position: absolute;
			top: 0px;
			left: 0px;
			pointer-events: none;
		}

		.add-window .closer span {
			position: absolute;
			top: 0px;
			right: 0px;
			line-height: 8px;
			border-top: 0px;
			border-right: 0px;
			border-top-left-radius: 0px;
			border-bottom-right-radius: 0px;
			padding: 16px 16px 16px 16px;
		}

		.add-window-wrapper {
			display: block;
			top: 15%;
			text-align: center;
			margin: 0px auto;
			position: relative;
			width: 650px;
			padding-top: 50px;
			padding-bottom: 20px;
			background: white;
			border-radius: 20px;
			pointer-events: all;
		}

		.add-window-wrapper input {
			width: 450px;
			height: 45px;
			font-size: 16pt;
			text-align: center;
			border-radius: 20px;
			outline: 0px !important;
		}

		.add-window-gallery {
			margin: 40px
		}

		.add-window-gallery li {
			display: inline-flex;
			margin: 20px;
			margin-bottom: 0px;
		}

		.add-window-gallery li a {
			display: inline-flex;
			/* background: white; */
			/* padding: 15px 20px 15px 20px; */
			border-radius: 10px;
			cursor: pointer;
			text-decoration: none;
			color: black;
		}

		/*
		.ee-tree > ee-tree-view {
			position: absolute;
			bottom: 0;
		}
		*/

		.ee-tree {
			flex-direction: column !important;
		}

		.ee-tree {
			display: flex;
			flex: 1;
			flex-direction: inherit;
			position: relative;
			height: 100%;
			background: linear-gradient(to bottom, rgb(236, 236, 236) 0%,rgb(181, 181, 181) 100%) !important;
		}

		.ee-panel {
			overflow: auto;
		}

		.ee-icon {
			flex: 0 !important;
			padding: 4px;
		}

		.ee-icon span {
			font-weight: bold;
			padding: 5px 12px 5px 12px;
			border-radius: 4px;
			cursor: pointer;
			border: 1px solid transparent;
		}

		.ee-icon span:hover {
			border: 1px solid #aaa;
		}

		ee-node {
			display: flex;
			flex: 1;
		}
	`],
	template: `
		<div class="ee-tree" *ngIf="tree.branches.length > 0" (click)="hideAddWindow()">
			<ee-tree-header (add)="showAddWindow($event)"></ee-tree-header>
			<ee-node
				[node]="tree"
				[orientation]="tree.orientation"
				[map]="map"
				[modules]="modules"
				[sharedData]="sharedData"
				(on)="onPanelAction($event)">
			</ee-node>
		</div>
		<div [hidden]="tree.branches.length > 0 && !addWindow">
			<div class="add-window">
				<div class="add-window-wrapper">
					<div *ngIf="addWindow" class="closer ee-icon" (click)="hideAddWindow()"><span>x</span></div>
					<input type="text" [(ngModel)]="needle" placeholder="Type in the view you want to open..." tabindex="1" autofocus>
					<div class="add-window-gallery">
						<ul>
							<li *ngFor="let v of windows | LimitPipe:20 | StringFilterPipe:needle; let i = index" (click)="add(v)">
								<a class="btn btn-default" [attr.tabindex]="i+1" (keydown)="keyDown($event, v)">{{v}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	`
})

export class TreeComponent {
	@Input() windows: string[] = [];
	@Input() map: Map.WindowMapper;

	@Input() modules: any[];
	@Input() sharedData;

	@Input() tree: Tree = {
		orientation: NodeOrientation.Vertical,
		branches: []
	};

	@Output("on") onEmitter: EventEmitter<any> = new EventEmitter<any>();

	addWindow: boolean = false;
	needle: string = "";

	showAddWindow(e: MouseEvent) {
		this.needle = "";
		this.addWindow = true;
		e.stopPropagation();
	}

	hideAddWindow() {
		this.addWindow = false;
	}

	add(view: string) {
		this.tree.branches.push({
			branches: [],
			name: view,
			window: view
		});
		this.hideAddWindow();
	}

	keyDown(e: KeyboardEvent, view: string) {
		if (e.key === "Enter") {
			this.add(view);
		}

		if (e.key === "Escape") {
			this.hideAddWindow();
		}
	}

	onPanelAction(e) {
		this.onEmitter.emit(e);
	}
}
