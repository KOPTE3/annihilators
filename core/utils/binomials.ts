import * as math from 'mathjs';


export function binomials(from: number): number[] {
	const result: number[] = [];
	for (let by = 0; by <= from; by++) {
		result.push(math.combinations(from, by) as number)
	}

	return result;
}
