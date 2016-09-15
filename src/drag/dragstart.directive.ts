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
import { Directive, Input, ElementRef, HostListener, EventEmitter } from '@angular/core';

import { DragService } from './drag.service';

@Directive({
	selector: '[dragStart]'
})
export class DragStart {
	@Input("node") node: any;
	@Input("dragStart") type: string;
	@Input("drop") dropEmitter: EventEmitter<void>;

	constructor(private er: ElementRef, private dragService: DragService) {
		er.nativeElement.draggable = true;
	}

	@HostListener('dragstart') onDragStart() {
		this.dragService.initDragging(this.dropEmitter, this.node, this.type);
	}

	@HostListener('dragend') onDragEnd() {
		this.dragService.clear();
	}
}
