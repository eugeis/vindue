/*
 * Copyright (c) 2016 the original authors
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * @authors Suguru Inatomi, Jonas Möller, Dan Gilleland
 */
import {
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	Compiler,
	Directive,
	Inject,
	Input,
	NgModule,
	Type,
	ViewContainerRef,
	ReflectiveInjector,
	OnDestroy,
	ComponentFactory
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Directive({
	selector: '[componentOutlet]',
})
export class ComponentOutlet implements OnDestroy {
	@Input('componentOutlet') private template: string;
	@Input('componentOutletSelector') private selector: string;
	@Input('componentOutletContext') private context: any = {};
	@Input('componentOutletImports') private imports: any[] = [];

	component: ComponentRef<any>;
	moduleType: any;
	cmpType: any;

	constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

	private _createDynamicComponent(): Type<any> {
		let ctx = this.context;

		const metadata = new Component({
			selector: this.selector,
			template: this.template,
		});

		let cmpClass = class _ implements OnDestroy {
			context = ctx;

			ngOnDestroy() {
				ctx = null;
			}
		};

		return Component(metadata)(cmpClass);
	}

	private _createDynamicModule(component) {
		const moduleMeta: NgModule = {
			imports: [BrowserModule, FormsModule].concat(this.imports),
			declarations: [component],
			exports: [component],
			providers: []
		};
		return NgModule(moduleMeta)(class _ { });
	}

	ngOnChanges() {
		if (!this.template) return;
		this.cmpType = this._createDynamicComponent();
		this.moduleType = this._createDynamicModule(this.cmpType);
		const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
		this.compiler.compileModuleAndAllComponentsAsync<any>(this.moduleType)
		.then(factory => {
			let cmpFactory: ComponentFactory<any>;
			for (let i = factory.componentFactories.length - 1; i >= 0; i--) {
				if (factory.componentFactories[i].selector === this.selector) {
					cmpFactory = factory.componentFactories[i];
					break;
				}
			}
			return cmpFactory;
		})
		.then(cmpFactory => {
			if (cmpFactory) {
				this.vcRef.clear();
				this.component = this.vcRef.createComponent(cmpFactory, 0, injector);
				this.component.changeDetectorRef.detectChanges();
			}
		});
	}

	ngOnDestroy() {
		this.component.destroy();
		this.compiler.clearCacheFor(this.cmpType);
		this.compiler.clearCacheFor(this.moduleType);
	}
}
