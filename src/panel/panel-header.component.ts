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
			position: absolute;
			z-index: 50;
			top: 0;
			left 0;
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
			background: #f5f5f5;
			position: relative;
			z-index: 100;
		}

		.ee-icon>span {
			font-weight: bold;
			border-radius: 4px;
			cursor: pointer;
			border: 1px solid transparent;
			display: block;
			width: 34px;
			height: 32px;
			text-align: center;
			line-height: 28px;
		}

		.ee-icon>span:hover {
			border: 1px solid #aaa;
		}

		.ee-icon span.pinned .glyphicon {
			transform: rotate(45deg) scale(0.9);
		}
	`],
	template: `
		<div class="ee-panel-header" [closeEmitter]="closeEmitter" [node]="node" dragStart="'panel'">
			<div class="ee-panel-header-heading">
				<span [hidden]="changeName" (click)="toggleName()">{{node?.name}}</span>
				<form [hidden]="!changeName" (ngSubmit)="submit()">
					<input type="text" [(ngModel)]="node.name" [ngModelOptions]="{standalone: true}">
					<input type="submit" value="Ok">
				</form>
			</div>
			<div class="ee-panel-header-space"></div>
			<div class="ee-icon">
				<span class="glyphicon glyphicon-save" *ngIf="!saved" (click)="save()"></span>
			</div>
			<div class="ee-icon">
				<span [ngClass]="{'pinned': pinned}" (click)="pin()">
					<span class="glyphicon glyphicon-pushpin"></span>
				</span>
			</div>
			<div class="ee-icon"><span (click)="close()">x</span></div>
		</div>
	`
})

export class PanelHeaderComponent {
	@Input() node: NodeInterface.TreeNode;

	@Output("close") closeEmitter: EventEmitter<void> = new EventEmitter<void>();
	@Output("pin") pinEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

	changeName: boolean = false;
	pinned: boolean = false;
	saved: boolean = true;

	constructor() { }

	close(): void {
		this.closeEmitter.emit();
	}

	submit() {
		this.toggleName();
		this.saved = false;
	}

	toggleName() {
		this.changeName = !this.changeName;
	}

	save() {
		this.saved = true;
	}

	pin() {
		this.pinned = !this.pinned;
		this.pinEmitter.emit(this.pinned);
	}
}
