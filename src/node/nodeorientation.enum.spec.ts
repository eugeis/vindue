import { NodeOrientation, inv, getClass } from './nodeorientation.enum';

describe('Inverting NodeOrientation', () => {
	it('inv(Horizontal) = Vertical', () => {
		expect(inv(NodeOrientation.Horizontal)).toBe(NodeOrientation.Vertical);
		expect(inv(NodeOrientation.Horizontal)).not.toBe(NodeOrientation.Horizontal);
	});

	it('inv(Vertical) = Horizontal', () => {
		expect(inv(NodeOrientation.Vertical)).toBe(NodeOrientation.Horizontal);
		expect(inv(NodeOrientation.Vertical)).not.toBe(NodeOrientation.Vertical);
	});

	it('getClass(Vertical) = vert', () => {
		expect(getClass(NodeOrientation.Vertical)).toBe("vert");
	});

	it('getClass(Horizontal) = hor', () => {
		expect(getClass(NodeOrientation.Horizontal)).toBe("hor");
	});
});
