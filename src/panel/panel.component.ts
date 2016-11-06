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
import { ModelPtr } from '../modelptr.model';
import { DragService } from '../drag/drag.service';
import { ViewService } from '../provider';

import { NodeInterface } from '../node/treenode.interface';

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
		ee-pin-indicator {
			position: absolute;
			width: 100%;
			height: 100%;
			flex: 0;
			pointer-events: none;
		}
		.ee-panel-hover.center {
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
		.ee-panel-hover.north {
			width: 100%;
			height: 50%;
			top: 0;
			left: 0;
		}
		.ee-panel-hover.south {
			width: 100%;
			height: 50%;
			top: 50%;
			left: 0;
		}
		.ee-panel-hover.west {
			width: 50%;
			height: 100%;
			top: 0;
			left: 0;
		}
		.ee-panel-hover.east {
			width: 50%;
			height: 100%;
			top: 0;
			left: 50%;
		}
	`],
	template: `
		<div class="ee-panel" [hoverInfo]="hoverInfo" (dropping)="rearrange($event)" dropZone="'panel'">
			<div class="ee-panel-hover" [hoverInfo]="hoverInfo" *ngIf="hoverInfo.display" dropIndicator></div>
			<div class="ee-panel-data" *componentOutlet="html; context:self; selector:'ee-panel-data'">{{name}}</div>
		</div>
		<ee-pin-indicator
			[model]="model"
			[inputs]="inputs"
			[outputs]="outputs">
		</ee-pin-indicator>
	`
})

export class PanelComponent implements OnInit, OnDestroy {
	@Input() sharedData: any;
	@Input() model: ModelPtr;
	@Input() window: string;

	@Output("insert") insertEmitter: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();
	@Output("on") onEmitter: EventEmitter<any> = new EventEmitter<any>();

	html: string;
	self: PanelComponent = this;

	/**
	 * HoverInfo is the shared state between the panels dropZone and its dropIndicator
	 */
	hoverInfo: HoverInfo;

	inputs: string[];
	outputs: string[];

	constructor(private dragService: DragService, private viewService: ViewService) {
		this.hoverInfo = new HoverInfo();
	}

	ngOnInit() {
		this.inputs = this.viewService.viewToInputElement(this.window);
		this.outputs = this.viewService.viewToOutputElement(this.window);

		if (this.window) {
			try {
				this.html = this.viewService.viewToHtml(this.window);
			} catch(e) {
				console.warn("Exception for: " + this.window);
				console.warn(e);
				this.html = "";
			}
		}
	}

	callbacks = {
		onPanelAction: (e) => {
			this.onEmitter.emit(e);
		}
	}

	rearrange(dragInfo: DragInfo) {
		this.insertEmitter.emit(dragInfo);
	}

	ngOnDestroy() {
		this.self = null;
	}
}
