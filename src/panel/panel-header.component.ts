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
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DragStart } from '../drag/dragstart.directive';
import NodeInterface = require('../node/treenode.interface');

@Component({
	selector: 'ee-panel-header',
	styles: [`
		.ee-panel-header, .ee-panel-header-space, .ee-icon {
			display: flex;
		}

		.ee-panel-header-heading {
			font-size: 18px;
			font-weight: 500;
			padding: 8px;
			margin-left: 5px;
		}

		.ee-panel-header-space {
			margin-left: auto;
		}

		.ee-panel-header {
			width: 100%;
			background: #f5f5f5;
			border-bottom: 1px solid transparent;
			border-color: #ddd;
			margin-bottom: 10px;
		}
	`],
	template: `
		<div class="ee-panel-header" [drop]="closeEmitter" [node]="node" dragStart="'panel'">
			<div class="ee-panel-header-heading">{{node?.data}}</div>
			<div class="ee-panel-header-space"></div>
			<!--<div class="ee-icon flex"><span (click)="minimize()">_</span></div>-->
			<div class="ee-icon"><span (click)="close()">x</span></div>
		</div>
	`
})

export class PanelHeaderComponent {
	@Input() node: NodeInterface.TreeNode;
	@Output("close") closeEmitter: EventEmitter<void> = new EventEmitter<void>();

	constructor() { }

	close(): void {
		this.closeEmitter.emit();
	}
}
