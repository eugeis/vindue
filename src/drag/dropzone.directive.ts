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
import { Directive, ElementRef, Input, Output, HostListener, EventEmitter } from '@angular/core';

import { HoverInfo } from './hoverinfo.model';
import { DragService } from './drag.service';
import { DragInfo } from './draginfo.model';
import * as DragFunctions from './drag.functions';

@Directive({
	selector: '[dropZone]'
})

export class DropZone {
	@Input("dropZone") type: string;
	@Input() hoverInfo: HoverInfo;
	@Output("dropping") dropEmitter: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();

	el: any;

	constructor(er: ElementRef, private dragService: DragService) {
		this.el = er.nativeElement;
		this.dragService = dragService;
	}

	@HostListener('dragover', ['$event']) onDragOver(e: MouseEvent) {
		if (this.dragService.isDragging(this.type)) {
			this.hoverInfo.direction = DragFunctions.getCardinalDirection(
				e.layerX,
				e.layerY,
				this.el.clientWidth,
				this.el.clientHeight
			);
			this.hoverInfo.display = true;
			e.preventDefault();
		}
	}

	@HostListener('dragleave', ['$event']) onDragLeave(e) {
		this.hoverInfo.display = false;
	}

	@HostListener('drop', ['$event']) onDrop(e) {
		this.hoverInfo.display = false;
		this.dragService.setDirection(this.hoverInfo.direction);
		this.dropEmitter.emit(this.dragService.getInfo());

		//TODO: Only close, when promise is received
		this.dragService.emitDrop();
		this.dragService.clear();
	}
}
