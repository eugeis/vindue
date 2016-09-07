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
 	ComponentMetadata,
 	ComponentFactoryResolver,
 	ComponentRef,
 	Compiler,
 	Directive,
 	Inject,
 	Input,
 	NgModule,
 	NgModuleMetadataType,
 	Type,
 	ViewContainerRef,
 	ReflectiveInjector
 } from '@angular/core';
 import { BrowserModule } from '@angular/platform-browser';
 import { FormsModule } from '@angular/forms';

 /**
  * ComponentOutlet is a directive to create dynamic component.
  *
  * Example:
  *
  * ```ts
  * @Component({
  *   selector: 'my-app',
  *   template: `
  *     <div *componentOutlet="template; context: self; selector:'my-component'"></div>
  *   `,
  *   directives: [ComponentOutlet]
  * })
  * export class AppComponent {
  *   self = this;
  *
  *   template = `
  *   <div>
  *     <p>Dynamic Component</p>
  *   </div>`;
  * }
  * ```
  *
  * Result:
  *
  * ```html
  * <my-component>
  *    <div>
  *      <p>Dynamic Component</p>
  *    </div>
  * </my-component>
  * ```
  *
  */

 @Directive({
 	selector: '[componentOutlet]',
 })
 export class ComponentOutlet {
 	@Input('componentOutlet') private template: string;
 	@Input('componentOutletSelector') private selector: string;
 	@Input('componentOutletContext') private context: Object;
 	@Input('componentOutletImports') private imports: any[] = [];

 	component: any;

 	constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

 	private _createDynamicComponent(): Type<any> {
 		this.context = this.context || {};

 		const metadata = new ComponentMetadata({
 			selector: this.selector,
 			template: this.template,
 		});

 		const cmpClass = class _ { };
 		cmpClass.prototype = this.context;
 		return Component(metadata)(cmpClass);
 	}

 	private _createDynamicModule(component) {
 		const moduleMeta: NgModuleMetadataType = {
 			imports: [BrowserModule, FormsModule].concat(this.imports),
 			declarations: [component],
 			exports: [component],
 			providers: []
 		};
 		return NgModule(moduleMeta)(class _ { });
 	}

 	ngOnChanges() {
 		if (!this.template) return;
 		const cmpType = this._createDynamicComponent();
 		const moduleType = this._createDynamicModule(cmpType);
 		const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
 		this.compiler.compileModuleAndAllComponentsAsync<any>(moduleType)
 		.then(factory => {
 			let cmpFactory: any;
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
 }
