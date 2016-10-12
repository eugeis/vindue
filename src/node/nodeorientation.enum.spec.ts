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
