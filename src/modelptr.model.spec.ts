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
import * as Model from './modelptr.model';

describe("ModelPtr", () => {
	it("should set attributes in the model", () => {
		let model = new Model.ModelPtr();

		const one = 1;
		const two = "2";
		const three = {c: 3};
		const four = [1,2,3,4];

		Model.set(model, "attribute1", one);
		Model.set(model, "attribute2", two);
		Model.set(model, "attribute3", three);
		Model.set(model, "attribute4", four);

		expect(Model.get(model, "attribute1")).toBe(one);
		expect(Model.get(model, "attribute2")).toBe(two);
		expect(Model.get(model, "attribute3")).toBe(three);
		expect(Model.get(model, "attribute3").c).toBe(three.c);
		expect(Model.get(model, "attribute4")).toBe(four);
		expect(Model.get(model, "attribute4")[0]).toBe(four[0]);
		expect(Model.get(model, "attribute4")[1]).toBe(four[1]);
		expect(Model.get(model, "attribute4")[2]).toBe(four[2]);
		expect(Model.get(model, "attribute4")[3]).toBe(four[3]);
	});

	it("should copy the model", () => {
		let model = new Model.ModelPtr();

		const one = 1;
		const two = "2";
		const three = {c: 3};
		const four = [1,2,3,4];

		Model.set(model, "attribute1", one);
		Model.set(model, "attribute2", two);
		Model.set(model, "attribute3", three);
		Model.set(model, "attribute4", four);

		let model2 = Model.copy(model);

		expect(model).not.toBe(model2);

		expect(Model.get(model, "attribute1")).toBe(one);
		expect(Model.get(model, "attribute2")).toBe(two);
		expect(Model.get(model, "attribute3")).toBe(three);
		expect(Model.get(model, "attribute3").c).toBe(three.c);
		expect(Model.get(model, "attribute4")).toBe(four);
		expect(Model.get(model, "attribute4")[0]).toBe(four[0]);
		expect(Model.get(model, "attribute4")[1]).toBe(four[1]);
		expect(Model.get(model, "attribute4")[2]).toBe(four[2]);
		expect(Model.get(model, "attribute4")[3]).toBe(four[3]);

		expect(Model.get(model, "attribute1")).toBe(Model.get(model2, "attribute1"));
		expect(Model.get(model, "attribute2")).toBe(Model.get(model2, "attribute2"));
		expect(Model.get(model, "attribute3")).toBe(Model.get(model2, "attribute3"));
		expect(Model.get(model, "attribute3").c).toBe(Model.get(model2, "attribute3").c);
		expect(Model.get(model, "attribute4")).toBe(Model.get(model2, "attribute4"));
		expect(Model.get(model, "attribute4")[0]).toBe(Model.get(model2, "attribute4")[0]);
		expect(Model.get(model, "attribute4")[1]).toBe(Model.get(model2, "attribute4")[1]);
		expect(Model.get(model, "attribute4")[2]).toBe(Model.get(model2, "attribute4")[2]);
		expect(Model.get(model, "attribute4")[3]).toBe(Model.get(model2, "attribute4")[3]);
	});
});
