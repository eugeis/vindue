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
import { Injectable } from '@angular/core';

import { ViewService } from '../provider';
import { NodeInterface } from '../node/treenode.interface';
import { ModelPtr, setInput } from '../modelptr.model';
import { intersect } from './intersect.functions';

export namespace ModelConnector {
	@Injectable()
	export class Service {
		private subscribers: Subscriber[] = [];
		private binder: ModelPtr;

		constructor(private viewService: ViewService) { }

		/**
		 * Add a subscriber to the subscribers list
		 * Returns a function for unsubscribing
		 */
		subscribe(sub: Subscriber) {
			this.subscribers.push(sub);

			return () => {
				let index = this.subscribers.indexOf(sub);
				if (index >= 0) {
					this.subscribers.splice(index, 1);
				}
			}
		}

		/**
		 * Start the pinning process:
		 * - save the panel, which is to pin (i.e. which gets its input set)
		 * - notify all subscribers (i.e. panels) to display the pinIndicators
		 *
		 * (Pinning ends with pinToModel)
		 */
		startPinning(model: ModelPtr, window: string) {
			let inputs: string[] = this.viewService.viewToInputElement(window);

			this.binder = model;
			this.subscribers.forEach((d) => {
				if (intersect(inputs, d.outputs).length > 0) {
					d.setPinStatus(true);
				}
			});
		}

		/**
		 * Ends the pinning process:
		 * - the saved panel has its input set to the selected model
		 * - the pinIndicators are no longer displayed
		 *
		 * (Pinning starts with startPinning)
		 */
		pinToModel(model: ModelPtr) {
			setInput(this.binder, model);
			this.clearPinStatus();
		}

		/**
		 * Sets all subscribers' pin-status to false and clears the service's binder
		 */
		clearPinStatus() {
			this.subscribers.forEach((d) => {
				d.setPinStatus(false);
			});
			this.binder = undefined;
		}
	}

	export interface Subscriber {
		setPinStatus(pin: boolean): void;
		inputs: string[];
		outputs: string[];
	}
}
