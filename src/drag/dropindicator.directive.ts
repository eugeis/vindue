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
import { Directive, Input, ElementRef } from '@angular/core';

import { CardinalDirection } from  './cardinaldirection.enum';
import { DropInfo } from './dropinfo.model';

@Directive({ selector: '[dropIndicator]' })
export class DropIndicator {
	@Input() dropInfo: DropInfo;
	oldDropInfo: DropInfo;

	el: any;

	constructor (er: ElementRef) {
		this.el = er.nativeElement;
		this.oldDropInfo = new DropInfo();
	}

	ngDoCheck() {
		if (this.dropInfo) {
			if (this.dropInfo.direction !== this.oldDropInfo.direction) {
				switch(this.dropInfo.direction) {
					case CardinalDirection.Center:
					this.el.style.width = "100%";
					this.el.style.height = "100%";
					this.el.style.top = "0";
					this.el.style.left = "0";
					break;

					case CardinalDirection.North:
					case CardinalDirection.Northwestnorth:
					case CardinalDirection.Northeastnorth:
					this.el.style.width = "100%";
					this.el.style.height = "50%";
					this.el.style.top = "0";
					this.el.style.left = "0";
					break;

					case CardinalDirection.South:
					case CardinalDirection.Southwestsouth:
					case CardinalDirection.Southeastsouth:
					this.el.style.width = "100%";
					this.el.style.height = "50%";
					this.el.style.top = "50%";
					this.el.style.left = "0";
					break;

					case CardinalDirection.West:
					case CardinalDirection.Westnorthwest:
					case CardinalDirection.Westsouthwest:
					this.el.style.width = "50%";
					this.el.style.height = "100%";
					this.el.style.top = "0";
					this.el.style.left = "0";
					break;

					case CardinalDirection.East:
					case CardinalDirection.Eastnortheast:
					case CardinalDirection.Eastsoutheast:
					this.el.style.width = "50%";
					this.el.style.height = "100%";
					this.el.style.top = "0";
					this.el.style.left = "50%";
					break;

					default: break;
				}

				this.oldDropInfo.direction = this.dropInfo.direction;
			}
		}
	}
}
