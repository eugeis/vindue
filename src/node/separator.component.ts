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
import { NodeInterface } from './treenode.interface';
import { SeparatorInterface }  from './separator.functions';

@Component({
	selector: 'ee-separator',
	styles: [`
		.ee-separator {
			background: transparent;
			width: 100%;
			height: 100%;
		}

		.ee-separator.hor {
			padding-top:2px;
			padding-bottom:2px;
			cursor: ns-resize;
		}

		.ee-separator.vert {
			padding-left:2px;
			padding-right:2px;
			cursor: ew-resize;
		}
	`],
	template: `
		<div class="ee-separator" [ngClass]="getClass(orientation)"></div>
	`
})

export class SeparatorComponent implements OnInit {
	@Input() orientation: NodeOrientation;

	/**
	 * The element left of / above the separator
	 */
	@Input() left: NodeInterface.TreeNode;

	/**
	 * The element right of / beneath the separator
	 */
	@Input() right: NodeInterface.TreeNode;

	dimensions: SeparatorInterface.ElementDimension;
	cursorStart: [number, number];

	/**
	 * Start the dragging:
	 * - save dimensions of the elements beside the separator
	 * - save the cursor position / drag position
	 */
	@HostListener('dragstart', ['$event']) onDragStart(e: MouseEvent) {
		let prev = this.er.nativeElement.parentElement;
		let next = prev.nextElementSibling;

		this.dimensions.prevEl = [prev.clientWidth, prev.clientHeight];
		this.dimensions.nextEl = [next.clientWidth, next.clientHeight];

		this.cursorStart = [e.clientX, e.clientY];
		e.stopPropagation();
	}

	/**
	 * Calculate the new sizes of the elements beside the separator
	 */
	@HostListener('dragend', ['$event']) onDragEnd(e: MouseEvent) {
		let size: SeparatorInterface.ElementSize = {
			prevEl: this.left.size,
			nextEl: this.right.size
		};

		let sizes = SeparatorInterface.calcEndposition(this.orientation, {
			start: this.cursorStart,
			end: [e.clientX, e.clientY]
		}, this.dimensions, size);

		this.left.size = sizes[0];
		this.right.size = sizes[1];
	}

	/**
	 * Wraps an external function to be used in bare html
	 */
	getClass(orientation: NodeOrientation) {
		return getClass(orientation);
	}

	ngOnInit() {
		this.dimensions = new SeparatorInterface.ElementDimension();
	}

	constructor(private er: ElementRef) {
		er.nativeElement.draggable = true;
	}
}
