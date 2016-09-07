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

import { DropInfo } from './dropinfo.model';
import { CardinalDirection } from './cardinaldirection.enum';
import { DragService } from './drag.service';

@Directive({
	selector: '[dropZone]'
})

export class DropZone {
	@Input("dropZone") type: string;
	@Input() dropInfo: DropInfo;
	@Output() rearrange: EventEmitter<any> = new EventEmitter<any>();

	el: any;

	constructor(er: ElementRef, private dragService: DragService) {
		this.el = er.nativeElement;
		this.dragService = dragService;
	}

	getCardinalDirection(x,y): CardinalDirection {

		let goldenRatio = 1.618;
		let width = this.el.clientWidth;
		let height = this.el.clientHeight;

		let firstX = width / (1 + goldenRatio + 1);
		let secondX = width / (1 + goldenRatio + 1) * (goldenRatio + 1);

		let firstY = height / (1 + goldenRatio + 1);
		let secondY = height / (1 + goldenRatio + 1) * (goldenRatio + 1);

		if (firstX <= x && x <= secondX) {
			if (firstY <= y && y <= secondY) {
				return CardinalDirection.Center;
			}
		}

		if (y < firstY) {
			if (firstX <= x && x <= secondX) {
				return CardinalDirection.North;
			}
		}

		if (secondY < y) {
			if (firstX <= x && x <= secondX) {
				return CardinalDirection.South;
			}
		}

		if (x < firstX) {
			if (firstY <= y && y <= secondY) {
				return CardinalDirection.West;
			}
		}

		if (secondX < x) {
			if (firstY <= y && y <= secondY) {
				return CardinalDirection.East;
			}
		}

		if (x < firstX && y < firstY) {
			if (y / x < firstY / firstX) {
				return CardinalDirection.Northwestnorth;
			} else {
				return CardinalDirection.Westnorthwest;
			}
		}

		if (secondX < x && y < firstY) {
			if (y / (width - x) < firstY / (width - secondX)) {
				return CardinalDirection.Northeastnorth;
			} else {
				return CardinalDirection.Eastnortheast;
			}
		}

		if (secondX < x && secondY < y) {
			if ((height - y) / (width - x) < (height - secondY) / (width - secondX)) {
				return CardinalDirection.Southeastsouth;
			} else {
				return CardinalDirection.Eastsoutheast;
			}
		}

		if (x < firstX && secondY < y) {
			if ((height - y) / x < (height - secondY) / firstX) {
				return CardinalDirection.Southwestsouth;
			} else {
				return CardinalDirection.Westsouthwest;
			}
		}

		throw "up";
	}

	@HostListener('dragover', ['$event']) onDragOver(e: MouseEvent) {
		if (this.dragService.hasDragObject(this.type)) {
			this.dropInfo.direction = this.getCardinalDirection(e.layerX,e.layerY);
			this.dropInfo.display = true;
			e.preventDefault();
		}
	}

	@HostListener('dragleave', ['$event']) onDragLeave(e) {
		this.dropInfo.display = false;
	}

	@HostListener('drop', ['$event']) onDrop(e) {
		this.dropInfo.display = false;
		this.rearrange.emit(this.dragService.getNode());

		//TODO: Only close, when promise is received
		this.dragService.emitDrop();
		this.dragService.clear();
	}
}
