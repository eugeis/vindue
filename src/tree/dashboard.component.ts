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

@Component({
	selector: 'ee-dashboard',
	styles: [`
		.dashboard {
			height: 100%;
			width: 100%;
			background: rgba(0,0,0,0.5);
			position: absolute;
			top: 0px;
			left: 0px;
			pointer-events: none;
			z-index: 500;
		}

		.dashboard .closer span {
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

		.dashboard-wrapper {
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

		.dashboard-wrapper input {
			width: 450px;
			height: 45px;
			font-size: 16pt;
			text-align: center;
			border-radius: 20px;
			outline: 0px !important;
		}

		.dashboard-gallery {
			margin: 40px
		}

		.dashboard-gallery li {
			display: inline-flex;
			margin: 20px;
			margin-bottom: 0px;
		}

		.dashboard-gallery li a {
			display: inline-flex;
			/* background: white; */
			/* padding: 15px 20px 15px 20px; */
			border-radius: 10px;
			cursor: pointer;
			text-decoration: none;
			color: black;
		}
	`],
	template: `
		<div class="dashboard">
			<div class="dashboard-wrapper">
				<div *ngIf="dashboard" class="closer ee-icon" (click)="hideDashboard()"><span>x</span></div>
				<input type="text" [(ngModel)]="needle" placeholder="Type in the view you want to open..." tabindex="1" autofocus>
				<div class="dashboard-gallery">
					<ul>
						<li *ngFor="let v of windows | StringFilterPipe:needle | LimitPipe:limit; let i = index" (click)="add(v)">
							<a class="btn btn-default" [attr.tabindex]="i+1" (keydown)="keyDown($event, v)">{{v}}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	`
})

export class DashboardComponent {
	@Input() windows: string[] = [];

	@Output("add") addEmitter: EventEmitter<string> = new EventEmitter<string>();
	@Output("hide") hideEmitter: EventEmitter<void> = new EventEmitter<void>();

	limit: number = 20;
	needle: string = "";

	add(view: string) {
		this.addEmitter.emit(view);
	}

	keyDown(e: KeyboardEvent, view: string) {
		if (e.key === "Enter") {
			this.addEmitter.emit(view);
		}

		if (e.key === "Escape") {
			this.hideEmitter.emit();
		}
	}
}
