import { DragInfo } from '../drag/draginfo.model';
import { NodeOrientation } from './nodeorientation.enum';
import { CardinalDirection } from '../drag/cardinaldirection.enum';

import * as NodeFunctions from './node.functions';

import { NodeInterface } from './treenode.interface';

describe('Dropping into vertical panels', () => {
	const leftWindow: NodeInterface.TreeNode = { branches: [], name: "leftWindow" };
	const rightWindow: NodeInterface.TreeNode = { branches: [], name: "rightWindow" };

	let branches: NodeInterface.TreeNode[];
	let orientation: NodeOrientation;

	let dragInfo: DragInfo = {
		source: undefined,
		target: undefined,
		type: undefined,
		direction: undefined,
		closeOrigin: undefined
	};

	beforeEach(() => {
		branches = [ leftWindow, rightWindow ];
		orientation = NodeOrientation.Vertical;
	});

	it('inserts the panel left (west-insertion)', () => {
		dragInfo.source = rightWindow;
		dragInfo.target = leftWindow;
		dragInfo.direction = CardinalDirection.West;

		NodeFunctions.insertPanel(dragInfo, orientation, branches);

		expect(branches[0]).not.toBe(rightWindow);
		expect(branches[0].name).toBe(rightWindow.name);
		expect(branches[1]).toBe(leftWindow);
		expect(branches[2]).toBe(rightWindow);
		expect(branches.length).toBe(3);

		NodeFunctions.deletePanel(rightWindow, branches);

		expect(branches[0]).not.toBe(rightWindow);
		expect(branches[0].name).toBe(rightWindow.name);
		expect(branches[1]).toBe(leftWindow);
		expect(branches.length).toBe(2);
	});

	it('inserts the panel right (east-insertion)', () => {
		dragInfo.source = leftWindow;
		dragInfo.target = rightWindow;
		dragInfo.direction = CardinalDirection.East;

		NodeFunctions.insertPanel(dragInfo, orientation, branches);

		expect(branches[0]).toBe(leftWindow);
		expect(branches[1]).toBe(rightWindow);
		expect(branches[2]).not.toBe(leftWindow);
		expect(branches[2].name).toBe(leftWindow.name);
		expect(branches.length).toBe(3);

		NodeFunctions.deletePanel(leftWindow, branches);

		expect(branches[0]).toBe(rightWindow);
		expect(branches[1]).not.toBe(leftWindow);
		expect(branches[1].name).toBe(leftWindow.name);
		expect(branches.length).toBe(2);
	});

	it('inserts the panel above (north-insertion)', () => {
		dragInfo.source = leftWindow;
		dragInfo.target = rightWindow;
		dragInfo.direction = CardinalDirection.North;

		NodeFunctions.insertPanel(dragInfo, orientation, branches);

		expect(branches[0]).toBe(leftWindow);
		expect(branches[1].branches[0]).not.toBe(leftWindow);
		expect(branches[1].branches[0].name).toBe(leftWindow.name);
		expect(branches[1].branches[1]).toBe(rightWindow);
		expect(branches.length).toBe(2);

		NodeFunctions.deletePanel(leftWindow, branches);

		expect(branches[0].branches[0]).not.toBe(leftWindow);
		expect(branches[0].branches[0].name).toBe(leftWindow.name);
		expect(branches[0].branches[1]).toBe(rightWindow);
		expect(branches.length).toBe(1);
	});

	it('inserts the panel below (south-insertion)', () => {
		dragInfo.source = leftWindow;
		dragInfo.target = rightWindow;
		dragInfo.direction = CardinalDirection.South;

		NodeFunctions.insertPanel(dragInfo, orientation, branches);

		expect(branches[0]).toBe(leftWindow);
		expect(branches[1].branches[0]).toBe(rightWindow);
		expect(branches[1].branches[1]).not.toBe(leftWindow);
		expect(branches[1].branches[1].name).toBe(leftWindow.name);
		expect(branches.length).toBe(2);

		NodeFunctions.deletePanel(leftWindow, branches);

		expect(branches[0].branches[0]).toBe(rightWindow);
		expect(branches[0].branches[1]).not.toBe(leftWindow);
		expect(branches[0].branches[1].name).toBe(leftWindow.name);
		expect(branches.length).toBe(1);
	});
});
