export function intersect(inputs1: string[], inputs2: string[]): string[] {
	let ar1 = inputs1.slice(0).sort();
	let ar2 = inputs2.slice(0).sort();

	let ret: string[] = [];

	let ptr = 0;
	for (let i = 0; i < ar1.length; i++) {
		if (ar1[i] == ar2[ptr]) {
			ret.push(ar1[i]);
			ptr++;
		} else if (ar1[i] > ar2[ptr]) {
			i--;
			ptr++;
		}
	}

	return ret;
}
