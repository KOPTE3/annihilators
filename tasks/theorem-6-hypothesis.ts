import Polynomial from '../core/polynomial';

const SIZE = 11;

const multiplierVector: number[] = (new Array(SIZE + 1)).fill(0);
multiplierVector[2] = 1;
const multiplier = Polynomial.symmetric(SIZE, multiplierVector);

console.time('theorem-6-hypothesis');

let counter = 0;

for (let symmetricVector of Polynomial.SymmetricVectors(SIZE)) {
	// const begin = symmetricVector[0] * 8 + symmetricVector[1] * 4 + symmetricVector[2] * 2 + symmetricVector[3] * 1;
	// if (![0, 15, 10, 5].includes(begin)) {
	// 	continue;
	// }

	const vector = Polynomial.symmetric(SIZE, symmetricVector);
	const result = vector.multiply(multiplier);

	if (result.isZero()) {
		console.log(symmetricVector);
		counter++;
	}
}

console.log({counter});

console.timeEnd('theorem-6-hypothesis');
