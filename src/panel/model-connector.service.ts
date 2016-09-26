import { Injectable } from '@angular/core';

import { NodeInterface } from '../node/treenode.interface';
import { Map } from '../tree/windowmapper.function';
import { ModelPtr } from '../modelptr.model';

export namespace ModelConnector {
	@Injectable()
	export class Service {
		private subscribers: Subscriber[] = [];
		private binder: ModelPtr;

		constructor() { }

		subscribe(sub: Subscriber) {
			this.subscribers.push(sub);

			return () => {
				let index = this.subscribers.indexOf(sub);
				if (index >= 0) {
					this.subscribers.splice(index, 1);
				}
			}
		}

		startPinning(pin: boolean, model: ModelPtr, window: string, map: Map.WindowMapper) {
			let inputs: string[] = map.viewToInputElement(window);

			if (pin) {
				this.subscribers.forEach((d) => {
					if (intersect(inputs, d.outputs).length > 0) {
						d.setPinStatus(true);
						this.binder = model;
					}
				});
			} else {
				this.clearPinStatus();
			}
		}

		pinToModel(model: ModelPtr) {
			this.binder.setInput(model);
			this.clearPinStatus();
		}

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

	export function intersect(inputs1: string[], inputs2: string[]): string[] {
		let ar1 = inputs1.slice(0).sort();
		let ar2 = inputs2.slice(0).sort();

		let ret: string[] = [];

		let ptr = 0;
		for (let i = 0; i < ar1.length; i++) {
			if (ar1[i] == ar2[ptr]) {
				ret.push(ar1[i]);
				ptr++;
			} else if (ar1[i] > ar2[ptr]) {
				i--;
				ptr++;
			}
		}

		return ret;
	}
}
