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
import { NgModule, Component, ComponentFactory, ComponentMetadata, NgModuleMetadataType,
	Directive, Input, ViewContainerRef, Compiler, ReflectiveInjector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
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
	@Input('componentOutletImports') private imports: any[];

	constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

	private _createDynamicComponent() {
		const metadata = new ComponentMetadata({
			selector: this.selector,
			template: this.template,
		});

		// have the new component class effectively inherit from this component
		let ctx = this.context;
		let cmpClass = class _ {
			prototype:any = ctx;
		};
		let component = Component(metadata)(cmpClass);

		// make a module that does not inherit from anything except Object
		let mdClass = class _ {
			prototype: any= {}
		};

		return NgModule({
			imports: [CommonModule, BrowserModule, FormsModule].concat(this.imports),
			declarations: [component],
			exports: [component],
			providers: []
		})(mdClass);
	}

	ngOnChanges() {
		let self = this;

		if (!self.template) return;
		let selfDyn = self._createDynamicComponent();
		self.compiler.compileModuleAndAllComponentsAsync(selfDyn)
		.then(factory => {
			// to remove any previously loaded template, if this template is re-created dynamically from the parent
			self.vcRef.clear();

			const injector = ReflectiveInjector.fromResolvedProviders([], self.vcRef.parentInjector);

			let component:any;
			for (let i = factory.componentFactories.length-1; i >= 0; i--) {
				if (factory.componentFactories[i].selector === self.selector) {
					component = factory.componentFactories[i];
					break;
				}
			}

			this.vcRef.createComponent(component, 0, injector);
		});
	}
}
