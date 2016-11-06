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
import { NgModule, Injectable } from '@angular/core';

import { ViewMetaData } from './viewmetadata.interface';
import { View } from './view.component';

let views: ViewMetaData[] = [];

@Injectable()
export class ViewService {
	viewNames: string[] = [];

	constructor() {
		views.forEach((d) => {
			this.viewNames.push(d.name);
		});
	}

	getWindows(): string[] {
		return this.viewNames;
	}

	viewToInputElement(view: string): string[] {
		for (let i = 0; i < views.length; i++) {
			if (views[i].name === view) {
				return views[i].inputs;
			}
		}
	}

	viewToOutputElement(view: string): string[] {
		for (let i = 0; i < views.length; i++) {
			if (views[i].name === view) {
				return views[i].outputs;
			}
		}
		throw "No such view - '" + views + "'";
	}

	/**
	 * This function returns raw html, that is inserted into the DOM.
	 * Be careful: Never let the user determine the selector-attribute
	 * of a view. This can and will (!) lead to an XSS-vector.
	 *
	 * Only trust your own input!
	 */
	viewToHtml(view: string): string {
		for (let i = 0; i < views.length; i++) {
			if (views[i].name === view) {
				return getElementFromSelector(views[i].selector);
			}
		}
		throw "No such view - '" + views + "'";
	}
}

export function provideViews(v: ViewMetaData[]): void {
	//set global array
	views = v.slice(0);
}

/**
 * NEVER EVER let the user input the 'selector'-argument directly (XSS-vector)
 *
 * Instead, let the user choose predetermined values, which should match
 * one of the angular2-selectors in your components.
 */
function getElementFromSelector(selector: string): string {
	return `<` + selector + ` [model]="model" (on)="callbacks.onPanelAction($event)"></` + selector + `>`;
}
