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

import { NodeInterface } from '../node/treenode.interface';

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
	`],
	template: `
		<div class="ee-panel-header" [closeEmitter]="closeEmitter" [node]="node" dragStart="'panel'">
			<div class="ee-panel-header-heading">
				<span [hidden]="changeName" (click)="toggleName()">{{node?.name}}</span>
				<form [hidden]="!changeName" (ngSubmit)="toggleName()">
					<input type="text" [(ngModel)]="node.name" [ngModelOptions]="{standalone: true}">
					<input type="submit" value="Ok">
				</form>
			</div>
			<div class="ee-panel-header-space"></div>
			<!--<div class="ee-icon flex"><span (click)="minimize()">_</span></div>-->
			<div class="ee-icon"><span (click)="close()">x</span></div>
		</div>
	`
})

export class PanelHeaderComponent {
	@Input() node: NodeInterface.TreeNode;
	@Output("close") closeEmitter: EventEmitter<void> = new EventEmitter<void>();

	changeName: boolean = false;

	constructor() { }

	close(): void {
		this.closeEmitter.emit();
	}

	toggleName() {
		this.changeName = !this.changeName;
	}
}
