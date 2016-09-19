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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';

/* Pipes */
import { StringFilterPipe } from '../pipes/stringfilter.pipe';
import { LimitPipe } from '../pipes/limit.pipe';

let comp:    DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;

describe("DashboardComponent", () => {
	beforeEach( async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, CommonModule, BrowserModule],
			declarations: [DashboardComponent, StringFilterPipe, LimitPipe]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DashboardComponent);
		comp = fixture.componentInstance;
		fixture.detectChanges()
	});


	it('should display one element', () => {
		let dashboardGallery = fixture.debugElement.query(By.css('.dashboard-gallery'));
		comp.windows = ["Window 1"];
		fixture.detectChanges();

		let elements: DebugElement[] = dashboardGallery.queryAll(By.css('ul > li'));
		expect(elements.length).toBe(1);
		expect(elements[0].query(By.css('li > a')).nativeElement.textContent).toBe("Window 1");
	});

	it('should display two elements', () => {
		let dashboardGallery = fixture.debugElement.query(By.css('.dashboard-gallery'));
		comp.windows = ["Window 1", "Window 2"];
		fixture.detectChanges();

		let elements: DebugElement[] = dashboardGallery.queryAll(By.css('ul > li'));
		expect(elements.length).toBe(2);
		expect(elements[0].query(By.css('li > a')).nativeElement.textContent).toBe("Window 1");
		expect(elements[1].query(By.css('li > a')).nativeElement.textContent).toBe("Window 2");
	});

	it('should display three elements', () => {
		let dashboardGallery = fixture.debugElement.query(By.css('.dashboard-gallery'));
		comp.windows = ["Window 1", "Window 2", "Window 3"];
		fixture.detectChanges();

		let elements: DebugElement[] = dashboardGallery.queryAll(By.css('ul > li'));
		expect(elements.length).toBe(3);
		expect(elements[0].query(By.css('li > a')).nativeElement.textContent).toBe("Window 1");
		expect(elements[1].query(By.css('li > a')).nativeElement.textContent).toBe("Window 2");
		expect(elements[2].query(By.css('li > a')).nativeElement.textContent).toBe("Window 3");
	});

	it('should display five elements', () => {
		let dashboardGallery = fixture.debugElement.query(By.css('.dashboard-gallery'));
		comp.windows = ["Window 1", "Window 2", "Window 3", "Window 4", "Window 5"];
		fixture.detectChanges();

		let elements: DebugElement[] = dashboardGallery.queryAll(By.css('ul > li'));
		expect(elements.length).toBe(5);
		expect(elements[0].query(By.css('li > a')).nativeElement.textContent).toBe("Window 1");
		expect(elements[1].query(By.css('li > a')).nativeElement.textContent).toBe("Window 2");
		expect(elements[2].query(By.css('li > a')).nativeElement.textContent).toBe("Window 3");
		expect(elements[3].query(By.css('li > a')).nativeElement.textContent).toBe("Window 4");
		expect(elements[4].query(By.css('li > a')).nativeElement.textContent).toBe("Window 5");
	});

});
