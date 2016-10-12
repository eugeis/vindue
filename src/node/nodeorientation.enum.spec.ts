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
import { NodeOrientation, inv, getClass } from './nodeorientation.enum';

describe('Inverting NodeOrientation', () => {
	it('should invert horizontal to vertical', () => {
		expect(inv(NodeOrientation.Horizontal)).toBe(NodeOrientation.Vertical);
		expect(inv(NodeOrientation.Horizontal)).not.toBe(NodeOrientation.Horizontal);
	});

	it('should invert vertical to horizontal', () => {
		expect(inv(NodeOrientation.Vertical)).toBe(NodeOrientation.Horizontal);
		expect(inv(NodeOrientation.Vertical)).not.toBe(NodeOrientation.Vertical);
	});

	it('should get css-class of vert', () => {
		expect(getClass(NodeOrientation.Vertical)).toBe("vert");
	});

	it('should get css-class of hor', () => {
		expect(getClass(NodeOrientation.Horizontal)).toBe("hor");
	});
});
