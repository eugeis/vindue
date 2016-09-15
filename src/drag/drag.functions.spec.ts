import { CardinalDirection } from '../drag/cardinaldirection.enum';

import * as DragFunctions from './drag.functions';

describe('Getting CardinalDirection', () => {
	let goldenRatio: number = 1.618;
	let factor: number = 10;
	let width: number = (1 + goldenRatio + 1) * factor;
	let height: number = (1 + goldenRatio + 1) * factor;

	let testSet = {
		north: [
			[11,1],[18,1],[26,1],
			[11,5],[18,5],[26,5],
			[11,9],[18,9],[26,9]
		],
		south: [
			[11,27],[18,27],[26,27],
			[11,32],[18,32],[26,32],
			[11,36],[18,36],[26,36]
		],
		west: [
			[1,11],[5,11],[9,11],
			[1,18],[5,18],[9,18],
			[1,26],[5,26],[9,26]
		],
		east: [
			[27,11],[31,11],[35,11],
			[27,18],[31,18],[35,18],
			[27,26],[31,26],[35,26]
		],
		northwestnorth: [
			[1.1,1],[5,1],[9,1],
			      [5.1,5],[9,5],
			            [9.1,9],
		],
		westnorthwest: [
			[1,1.1]            ,
			[1,5],[5,5.1]      ,
			[1,9],[5,9],[9,9.1]
		],
		westsouthwest: [
			[1,27],[5,27],[8,26.5],
			[1,32],[5,30.5]       ,
			[1,34.5]
		],
		southwestsouth: [
			              [9.5,27],
			      ,[5.5,32],[9,32],
			[1.5,36],[5,36],[9,36]
		],
		northeastnorth: [
			[27,1],[31,1],[34,0.5],
			[27,6],[31,4.5]       ,
			[27,8.5]
		],
		eastnortheast: [
			              [35.5,1],
			      ,[31.5,6],[36,6],
			[27.5,9],[31,9],[36,9]
		],
		eastsoutheast: [
			[27,27],[31,27],[34,26.5],
			[27,32],[31,30.5]       ,
			[27,34.5]
		],
		southeastsouth: [
			                [35.5,27],
			       ,[31.5,32],[36,32],
			[27.5,36],[31,36],[36,36]
		]
	}

	it('should recognize north-hovering', () => {
		testSet.north.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.North);
		})
	});

	it('should recognize south-hovering', () => {
		testSet.south.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.South);
		})
	});

	it('should recognize west-hovering', () => {
		testSet.west.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.West);
		})
	});

	it('should recognize east-hovering', () => {
		testSet.east.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.East);
		})
	});

	it('should recognize northwestnorth-hovering', () => {
		testSet.northwestnorth.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.Northwestnorth);
		})
	});

	it('should recognize westnorthwest-hovering', () => {
		testSet.westnorthwest.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.Westnorthwest);
		})
	});

	it('should recognize westsouthwest-hovering', () => {
		testSet.westsouthwest.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.Westsouthwest);
		})
	});

	it('should recognize southwestsouth-hovering', () => {
		testSet.southwestsouth.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.Southwestsouth);
		})
	});

	it('should recognize northeastnorth-hovering', () => {
		testSet.northeastnorth.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.Northeastnorth);
		})
	});

	it('should recognize eastnortheast-hovering', () => {
		testSet.eastnortheast.forEach((d) => {
			expect(DragFunctions.getCardinalDirection(d[0], d[1], width, height)).toBe(CardinalDirection.Eastnortheast);
		})
	});
});
