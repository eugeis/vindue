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
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { DragInfo } from '../drag/draginfo.model';
import { DropZone } from '../drag/dropzone.directive';
import { DropIndicator } from '../drag/dropindicator.directive';
import { HoverInfo } from '../drag/hoverinfo.model';
import { CardinalDirection } from '../drag/cardinaldirection.enum';
import { Wrapper } from '../wrapper.model';
import { DragService } from '../drag/drag.service';

import { NodeInterface } from '../node/treenode.interface';
import { Map } from '../tree/windowmapper.function';

interface OnPanelAction {
	onPanelAction(e): void;
}

@Component({
	selector: 'ee-panel',
	styles: [`
		.ee-panel {
			display: flex;
			flex: 1;
			flex-direction: inherit;
			position: relative;
			overflow: auto;
		}
		.ee-panel-hover {
			position: absolute;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.3;
			z-index: 100;
			pointer-events: none;
		}
	`],
	template: `
		<div class="ee-panel" [hoverInfo]="hoverInfo" (dropping)="rearrange($event)" dropZone="'panel'">
			<div class="ee-panel-hover" [hoverInfo]="hoverInfo" *ngIf="hoverInfo.display" dropIndicator></div>
			<div class="ee-panel-data" *componentOutlet="html; context:self; selector:'ee-panel-data'">{{name}}</div>
		</div>
	`
})

export class PanelComponent implements OnInit, OnPanelAction, OnDestroy {
	@Input() sharedData: any;
	@Input() model: Wrapper<any>;
	@Input() window: string;

	@Input() map: Map.WindowMapper;

	@Output("insert") insertEmitter: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();
	@Output("on") onEmitter: EventEmitter<any> = new EventEmitter<any>();

	html: string;
	self: PanelComponent = this;

	hoverInfo: HoverInfo;

	constructor(dragService: DragService) {
		this.hoverInfo = new HoverInfo();
	}

	ngOnInit() {
		if (this.window && this.map) {
			this.html = this.map.callback(this.window);
		}
	}

	onPanelAction(e) {
		this.onEmitter.emit(e);
	}

	rearrange(dragInfo: DragInfo) {
		this.insertEmitter.emit(dragInfo);
	}

	ngOnDestroy() {
		this.self = null;
	}
}
