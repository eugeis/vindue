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
import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';

import { NodeOrientation, getClass } from './nodeorientation.enum';

@Component({
	selector: 'ee-separator',
	styles: [`
		.ee-separator {
			background: transparent;
			width: 100%;
			height: 100%;
		}

		.ee-separator.hor {
			padding-top:1px;
			padding-bottom:1px;
			cursor: ns-resize;
		}

		.ee-separator.vert {
			padding-left:1px;
			padding-right:1px;
			cursor: ew-resize;
		}
	`],
	template: `
		<div class="ee-separator" [ngClass]="sepClass(orientation)"></div>
	`
})

export class SeparatorComponent implements OnInit {
	@Input() orientation: NodeOrientation;
	@Input() left: any;
	@Input() right: any;

	prevEl: any;
	nextEl: any;

	pos: number[];

	@HostListener('dragstart', ['$event']) onDragStart(e: MouseEvent) {
		this.pos = [e.clientX, e.clientY];
	}

	@HostListener('drag', ['$event']) onDrag(e: MouseEvent) {
		if (e.clientX != 0 && e.clientY != 0) {
			let ratio = 0.5;

			switch (this.orientation) {
				case NodeOrientation.Horizontal:
					ratio = this.calcHor(e);
					break;
				case NodeOrientation. Vertical:
					ratio = this.calcVert(e);
					break;
				default:
				throw "up";
			}

			let sum = this.left.size + this.right.size;

			if (0 <= ratio && ratio <= 1) {
				this.left.size = sum * (1 - ratio);
				this.right.size = sum * ratio;
			}
		}
	}

	calcVert(e: MouseEvent): number {
		let y = this.pos[1]
		let c = y - e.clientY;

		let leftSize: number;
		let rightSize: number;

		if (c >= 0) {
			leftSize = this.prevEl.offsetHeight + c;
			rightSize = this.nextEl.offsetHeight - c;
		} else {
			leftSize = this.prevEl.offsetHeight + c;
			rightSize = this.nextEl.offsetHeight - c;
		}

		return leftSize / (leftSize + rightSize);
	}

	calcHor(e: MouseEvent): number {
		let x = this.pos[0]
		let c = x - e.clientX;

		let leftSize: number;
		let rightSize: number;

		if (c >= 0) {
			leftSize = this.prevEl.offsetWidth + c;
			rightSize = this.nextEl.offsetWidth - c;
		} else {
			leftSize = this.prevEl.offsetWidth + c;
			rightSize = this.nextEl.offsetWidth - c;
		}

		return leftSize / (leftSize + rightSize);
	}

	@HostListener('dragend') onDragEnd() {
	}

	ngOnInit() {
		this.prevEl = this.er.nativeElement.parentElement;
		this.nextEl = this.prevEl.nextElementSibling;
	}

	sepClass(orientation: NodeOrientation) {
		return getClass(orientation);
	}

	constructor(private er: ElementRef) {
		er.nativeElement.draggable = true;
	}
}
