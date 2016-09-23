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
import { Component, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';

import { ModelConnector } from './model-connector.service';
import { Map } from '../tree/windowmapper.function';
import { Wrapper } from '../wrapper.model';

@Component({
	selector: 'ee-pin-indicator',
	template: `<div class="pinindicator" *ngIf="pinning" (click)="pinToModel()"></div>`,
	styles: [`
		.pinindicator {
			position: absolute;
			width: 100%;
			height: 100%;
			background: rgba(255,0,0,0.6);
			z-index: 1000;
			pointer-events: all;
		}
	`]
})

export class PinIndicator implements ModelConnector.Subscriber, OnInit, OnDestroy {
	@Input() model: Wrapper<any>;
	@Input() inputs: string[];
	@Input() outputs: string[];

	pinning: boolean;
	unsubscribe: any;

	constructor (private modelconnector: ModelConnector.Service) { }

	ngOnInit() {
		this.unsubscribe = this.modelconnector.subscribe(this);
	}

	setPinStatus(pin: boolean) {
		if (this.pinning && !pin) {
			this.model.value.inputs = {};
		}

		this.pinning = pin;
	}

	pinToModel() {
		this.modelconnector.pinToModel(this.model);
	}

	ngOnDestroy() {
		this.unsubscribe();
	}
}
