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

import { TreeInterface } from './tree.interface';
import { Map } from './windowmapper.function';

import { StateService } from '../perspective/state.service';

@Component({
	selector: 'ee-tree',
	styles: [`
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
		<div class="ee-tree" *ngIf="tree.branches.length > 0" (click)="hideDashboard()">
			<ee-tree-header (add)="showDashboard($event)"></ee-tree-header>
			<ee-node
				[node]="tree"
				[orientation]="tree.orientation"
				[map]="map"
				[sharedData]="sharedData"
				(on)="onPanelAction($event)">
			</ee-node>
		</div>
		<div class="dashboard-curtain" *ngIf="tree.branches.length == 0 || dashboard">
			<ee-dashboard
				[windows]="windows"
				(add)="add($event)"
				(hide)="hideDashboard()">
			</ee-dashboard>
		</div>
	`
})

export class TreeComponent {
	/**
	 * Name-Indentifiers of the windows
	 **/
	@Input() windows: string[] = [];

	/**
	 * Functions to map a window-name to their
	 * inputs, outputs and html-selector
	 */
	@Input() map: Map.WindowMapper = {
		viewToHtml: (d:string) => { return "" },
		viewToInputElement: (d:string) => { return [] },
		viewToOutputElement: (d:string) => { return [] }
	}

	/**
	 * Data which is shared between all views
	 */
	@Input() sharedData = {};

	@Input() tree: TreeInterface.Tree = {
		orientation: NodeOrientation.Vertical,
		branches: []
	};

	@Output("on") onEmitter: EventEmitter<any> = new EventEmitter<any>();

	/**
	 * Shared state of the dashboard
	 * true, if the dashboard should be displayed
	 */
	dashboard: boolean = false;

	constructor(private stateService: StateService) {

	}

	showDashboard(e: MouseEvent) {
		this.dashboard = true;

		if (e) {
			e.stopPropagation();
		}
	}

	hideDashboard() {
		this.dashboard = false;
	}

	add(view: string) {
		this.tree.branches.push({
			branches: [],
			name: view,
			window: view
		});
		this.hideDashboard();
	}

	onPanelAction(e) {
		this.onEmitter.emit(e);
	}
}
