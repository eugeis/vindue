import { CardinalDirection } from './cardinaldirection.enum';

export function getCardinalDirection(x: number, y: number, w: number, h: number): CardinalDirection {
	const goldenRatio = 1.618;
	const width = w;
	const height = h;

	// Split width / height into three parts:
	// [leftRatio] | [middleRatio] | [rightRatio]
	const leftRatio = 1;
	const middleRatio = goldenRatio;
	const rightRatio = 1;

	const ratioSum = leftRatio + middleRatio + rightRatio;

	const firstX = width / ratioSum * leftRatio;
	const secondX = width / ratioSum * (leftRatio + middleRatio);

	const firstY = height / ratioSum * leftRatio;
	const secondY = height / ratioSum * (leftRatio + middleRatio);;

	if (firstX <= x && x <= secondX) {
		if (firstY <= y && y <= secondY) {
			return CardinalDirection.Center;
		}
	}

	if (y < firstY) {
		if (firstX <= x && x <= secondX) {
			return CardinalDirection.North;
		}
	}

	if (secondY < y) {
		if (firstX <= x && x <= secondX) {
			return CardinalDirection.South;
		}
	}

	if (x < firstX) {
		if (firstY <= y && y <= secondY) {
			return CardinalDirection.West;
		}
	}

	if (secondX < x) {
		if (firstY <= y && y <= secondY) {
			return CardinalDirection.East;
		}
	}

	if (x < firstX && y < firstY) {
		if (y / x < firstY / firstX) {
			return CardinalDirection.Northwestnorth;
		} else {
			return CardinalDirection.Westnorthwest;
		}
	}

	if (secondX < x && y < firstY) {
		if (y / (width - x) < firstY / (width - secondX)) {
			return CardinalDirection.Northeastnorth;
		} else {
			return CardinalDirection.Eastnortheast;
		}
	}

	if (secondX < x && secondY < y) {
		if ((height - y) / (width - x) < (height - secondY) / (width - secondX)) {
			return CardinalDirection.Southeastsouth;
		} else {
			return CardinalDirection.Eastsoutheast;
		}
	}

	if (x < firstX && secondY < y) {
		if ((height - y) / x < (height - secondY) / firstX) {
			return CardinalDirection.Southwestsouth;
		} else {
			return CardinalDirection.Westsouthwest;
		}
	}

	throw "Undefined cardinal direction";
}

export function convertCardinalDirection(direction: CardinalDirection) {
	switch(direction) {
		case CardinalDirection.Center:
		return CardinalDirection.Center;

		case CardinalDirection.North:
		case CardinalDirection.Northwestnorth:
		case CardinalDirection.Northeastnorth:
		return CardinalDirection.North;

		case CardinalDirection.South:
		case CardinalDirection.Southwestsouth:
		case CardinalDirection.Southeastsouth:
		return CardinalDirection.South;

		case CardinalDirection.West:
		case CardinalDirection.Westnorthwest:
		case CardinalDirection.Westsouthwest:
		return CardinalDirection.West;

		case CardinalDirection.East:
		case CardinalDirection.Eastnortheast:
		case CardinalDirection.Eastsoutheast:
		return CardinalDirection.East;

		default: throw "Unknown direction";
	}
}
