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

/*
 * This file has been removed from tests, because it has to many dependencies
 * and mixes DOM with behaviour tests.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentOutlet, provideComponentOutletModule } from 'angular2-component-outlet';

/* Drag-Elements */
import { DragModule } from '../drag/drag.module';

/* Node-Elements */
import { NodeComponent } from '../node/node.component';
import { SeparatorComponent } from '../node/separator.component';

/* Panel-Elements */
import { PanelHeaderComponent } from '../panel/panel-header.component';
import { PanelComponent } from '../panel/panel.component';
import { PinIndicator } from '../panel/pin-indicator.component';

import { ModelConnector } from '../panel/model-connector.service';

/* Perspective */
import { StateService } from '../perspective/state.service';

import { ViewService, provideViews } from '../provider';

/* Pipes */
import { StringFilterPipe } from '../pipes/stringfilter.pipe';
import { LimitPipe } from '../pipes/limit.pipe';

/* TreeElements */
import { TreeInterface } from './tree.interface';
import { TreeComponent } from './tree.component';
import { TreeHeaderComponent } from './tree-header.component';
import { DashboardComponent } from './dashboard.component';
import { NodeOrientation } from '../node/nodeorientation.enum';

describe("TreeComponent", () => {
	let comp: TreeComponent;
	let fixture: ComponentFixture<TreeComponent>;

	beforeEach( async(() => {
		TestBed.configureTestingModule({
			imports: [CommonModule, FormsModule, DragModule],
			declarations: [TreeComponent, TreeHeaderComponent, PanelHeaderComponent,
				PanelComponent, NodeComponent, SeparatorComponent,
				StringFilterPipe, LimitPipe, ComponentOutlet, DashboardComponent,
				PinIndicator],
			providers: [provideComponentOutletModule({
				imports: [CommonModule]
			}), ModelConnector.Service, StateService, ViewService]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TreeComponent);
		comp = fixture.componentInstance;
	});


	it('should display the dashboardCurtain', () => {
		let tree: TreeInterface.Tree = {
			orientation: NodeOrientation.Horizontal,
			branches: []
		}
		comp.tree = tree;
		fixture.detectChanges()

		let children: DebugElement[] = fixture.debugElement.children;
		expect(children.length).toBe(1);
		expect(children[0].attributes["class"]).toBe("dashboard-curtain");
	});

	it('should display the tree (one node)', () => {
		let tree: TreeInterface.Tree = {
			orientation: NodeOrientation.Horizontal,
			branches: [{
				branches: [],
				name: "Test"
			}]
		}
		comp.tree = tree;
		fixture.detectChanges()

		let children: DebugElement[] = fixture.debugElement.children;
		expect(children.length).toBe(1);
		expect(children[0].attributes["class"]).toBe("ee-tree");
	});

	it('should display the tree (three nodes)', () => {
		let tree: TreeInterface.Tree = {
			orientation: NodeOrientation.Horizontal,
			branches: [{
				branches: []
			},{
				branches: []
			},{
				branches: []
			}]
		}
		comp.tree = tree;
		fixture.detectChanges()

		let children: DebugElement[] = fixture.debugElement.children;
		expect(children.length).toBe(1);
		expect(children[0].attributes["class"]).toBe("ee-tree");
	});

	it('should add a node', () => {
		let tree: TreeInterface.Tree = {
			orientation: NodeOrientation.Horizontal,
			branches: []
		}
		comp.tree = tree;
		fixture.detectChanges();

		{
			let children: DebugElement[] = fixture.debugElement.children;
			expect(children.length).toBe(1);
			expect(children[0].attributes["class"]).toBe("dashboard-curtain");
		}

		comp.add("example");
		fixture.detectChanges();

		{
			let children: DebugElement[] = fixture.debugElement.children;
			expect(children.length).toBe(1);
			expect(children[0].attributes["class"]).toBe("ee-tree");
		}
	});

	it('should add a node, show the dashboard and hide it again', () => {
		let tree: TreeInterface.Tree = {
			orientation: NodeOrientation.Horizontal,
			branches: []
		}
		comp.tree = tree;
		fixture.detectChanges();

		{
			let children: DebugElement[] = fixture.debugElement.children;
			expect(children.length).toBe(1);
			expect(children[0].attributes["class"]).toBe("dashboard-curtain");
		}

		comp.add("example");
		fixture.detectChanges();

		{
			let children: DebugElement[] = fixture.debugElement.children;
			expect(children.length).toBe(1);
			expect(children[0].attributes["class"]).toBe("ee-tree");
		}

		comp.showDashboard(undefined);
		fixture.detectChanges();

		{
			let children: DebugElement[] = fixture.debugElement.children;
			expect(children.length).toBe(2);
			expect(children[0].attributes["class"]).toBe("ee-tree");
			expect(children[1].attributes["class"]).toBe("dashboard-curtain");
		}

		comp.hideDashboard();
		fixture.detectChanges();

		{
			let children: DebugElement[] = fixture.debugElement.children;
			expect(children.length).toBe(1);
			expect(children[0].attributes["class"]).toBe("ee-tree");
		}
	});

});
