import { DragInfo } from '../drag/draginfo.model';
import { NodeOrientation } from './nodeorientation.enum';
import { CardinalDirection } from '../drag/cardinaldirection.enum';

import * as NodeFunctions from './node.functions';

import { NodeInterface } from './treenode.interface';

describe('test dropping into vertical panels', () => {
	it('when dropping west', () => {
		const leftWindow: NodeInterface.TreeNode = { branches: [], name: "leftWindow" };
		const rightWindow: NodeInterface.TreeNode = { branches: [], name: "rightWindow" };

		let branches: NodeInterface.TreeNode[] = [ leftWindow, rightWindow ];

		let dragInfo: DragInfo = {
			source: rightWindow,
			target: leftWindow,
			type: "",
			direction: CardinalDirection.West,
			closeOrigin: undefined
		};
		let orientation: NodeOrientation = NodeOrientation.Vertical;

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

	it('when dropping east', () => {
		const leftWindow: NodeInterface.TreeNode = { branches: [], name: "leftWindow" };
		const rightWindow: NodeInterface.TreeNode = { branches: [], name: "rightWindow" };

		let branches: NodeInterface.TreeNode[] = [ leftWindow, rightWindow ];

		let dragInfo: DragInfo = {
			source: leftWindow,
			target: rightWindow,
			type: "",
			direction: CardinalDirection.East,
			closeOrigin: undefined
		};
		let orientation: NodeOrientation = NodeOrientation.Vertical;

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

	it('when dropping north', () => {
		const leftWindow: NodeInterface.TreeNode = { branches: [], name: "leftWindow" };
		const rightWindow: NodeInterface.TreeNode = { branches: [], name: "rightWindow" };

		let branches: NodeInterface.TreeNode[] = [ leftWindow, rightWindow ];

		let dragInfo: DragInfo = {
			source: leftWindow,
			target: rightWindow,
			type: "",
			direction: CardinalDirection.North,
			closeOrigin: undefined
		};
		let orientation: NodeOrientation = NodeOrientation.Vertical;

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

	it('when dropping south', () => {
		const leftWindow: NodeInterface.TreeNode = { branches: [], name: "leftWindow" };
		const rightWindow: NodeInterface.TreeNode = { branches: [], name: "rightWindow" };

		let branches: NodeInterface.TreeNode[] = [ leftWindow, rightWindow ];

		let dragInfo: DragInfo = {
			source: leftWindow,
			target: rightWindow,
			type: "",
			direction: CardinalDirection.South,
			closeOrigin: undefined
		};
		let orientation: NodeOrientation = NodeOrientation.Vertical;

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
