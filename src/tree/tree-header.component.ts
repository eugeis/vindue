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
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'ee-tree-header',
	styles: [`
		.navbar {
			border-radius: 0px !important;
		}
	`],
	template: `
		<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">DSL</a>
				</div>
				<ul class="nav navbar-nav">
					<li class="active"><a href="#">TaskEditor</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li (click)="add($event)"><a href="#"><span class="glyphicon glyphicon-plus"></span> Add</a></li>
					<li (click)="load()"><a href="#"><span class="glyphicon glyphicon-folder-open"></span> Load</a></li>
					<li (click)="save()"><a href="#"><span class="glyphicon glyphicon-floppy-disk"></span> Save</a></li>
					<li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
					<li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
				</ul>
			</div>
		</nav>
	`
})

export class TreeHeaderComponent {
	@Output("add") addEmitter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
	@Output("save") saveEmitter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
	@Output("load") loadEmitter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

	constructor() { }

	add(e: MouseEvent): void {
		this.addEmitter.emit(e);
	}

	save(): void {
		this.saveEmitter.emit();
	}

	load(): void {
		this.loadEmitter.emit();
	}
}
