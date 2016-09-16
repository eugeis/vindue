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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentOutlet } from 'angular2-component-outlet';

/* Drag-Elements */
import { DragModule } from './drag/drag.module';

/* Node-Elements */
import { NodeComponent } from './node/node.component';
import { SeparatorComponent } from './node/separator.component';

/* Panel-Elements */
import { PanelHeaderComponent } from './panel/panel-header.component';
import { PanelComponent } from './panel/panel.component';

/* Pipes */
import { StringFilterPipe } from './pipes/stringfilter.pipe';
import { LimitPipe } from './pipes/limit.pipe';

/* TreeElements */
import { TreeComponent } from './tree/tree.component';
import { TreeHeaderComponent } from './tree/tree-header.component';
import { DashboardComponent } from './tree/dashboard.component';

@NgModule({
	imports: [CommonModule, FormsModule, DragModule],
	declarations: [TreeComponent, TreeHeaderComponent, PanelHeaderComponent,
		PanelComponent, NodeComponent, SeparatorComponent,
		StringFilterPipe, LimitPipe, ComponentOutlet, DashboardComponent],
	exports: [TreeComponent],
	providers: []
})

export class WindowManagerModule { }
