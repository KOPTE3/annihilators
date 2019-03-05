import Polynomial from '../core/polynomial';

const SIZE = 12;

const multiplierVector: number[] = (new Array(SIZE + 1)).fill(0);
multiplierVector[1] = 1;
multiplierVector[2] = 1;
const multiplier = Polynomial.symmetric(SIZE, multiplierVector);

console.time('theorem-6-hypothesis-III');

let counter = 0;

for (let symmetricVector of Polynomial.SymmetricVectors(SIZE)) {
	const vector = Polynomial.symmetric(SIZE, symmetricVector);
	const result = vector.multiply(multiplier);

	if (result.isZero()) {
		console.log(symmetricVector);
		counter++;
	}
}

console.log({counter});

console.timeEnd('theorem-6-hypothesis-III');
