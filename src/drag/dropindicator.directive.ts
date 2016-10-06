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
import { Directive, Input, ElementRef, Renderer } from '@angular/core';

import { CardinalDirection } from  './cardinaldirection.enum';
import { HoverInfo } from './hoverinfo.model';
import { convertCardinalDirection } from './drag.functions';

@Directive({ selector: '[dropIndicator]' })
export class DropIndicator {
	@Input() hoverInfo: HoverInfo;
	oldHoverInfo: HoverInfo;

	el: any;

	constructor (er: ElementRef, private renderer: Renderer) {
		this.el = er.nativeElement;
		this.oldHoverInfo = new HoverInfo();
	}

	ngDoCheck() {
		if (this.hoverInfo) {
			let direction = convertCardinalDirection(this.hoverInfo.direction);
			if (direction !== this.oldHoverInfo.direction) {

				this.renderer.setElementClass(this.el, 'center', false);
				this.renderer.setElementClass(this.el, 'north', false);
				this.renderer.setElementClass(this.el, 'south', false);
				this.renderer.setElementClass(this.el, 'west', false);
				this.renderer.setElementClass(this.el, 'east', false);

				switch(direction) {
					case CardinalDirection.Center:
					this.renderer.setElementClass(this.el, 'center', true);
					break;

					case CardinalDirection.North:
					this.renderer.setElementClass(this.el, 'north', true);
					break;

					case CardinalDirection.South:
					this.renderer.setElementClass(this.el, 'south', true);
					break;

					case CardinalDirection.West:
					this.renderer.setElementClass(this.el, 'west', true);
					break;

					case CardinalDirection.East:
					this.renderer.setElementClass(this.el, 'east', true);
					break;

					default: break;
				}

				this.oldHoverInfo.direction = direction;
			}
		}
	}
}
