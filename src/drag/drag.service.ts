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

import { DragInfo } from './draginfo.model';

@Injectable()
export class DragService {
	private info: DragInfo;

	setDragInfo(i: DragInfo): void {
		this.info = i;
	}

	clear() {
		this.info = undefined;
	}

	getNode() {
		if (!this.info) {
			throw "Tried 'getNode' while draginfo is not set.";
		}

		return this.info.node;
	}

	emitDrop(): void {
		if (!this.info) {
			throw "Tried 'close' while draginfo is not set.";
		}

		if (!this.info.dropEmitter) {
			return;
		}

		this.info.dropEmitter.emit();
	}

	hasDragObject(type: string): boolean {
		if (!this.info) {
			return false;
		}

		return this.info.type === type;
	}

	constructor() { }
}
