import Polynomial from '../core/polynomial';
import * as assert from 'assert';


const SIZE = 10;

const multiplierVector: number[] = (new Array(SIZE + 1)).fill(0);
multiplierVector[0] = 1;
multiplierVector[1] = 1;
const multiplier = Polynomial.symmetric(SIZE, multiplierVector);

function checkVector(vector: number[]): boolean {
	assert.strictEqual(vector.length, SIZE + 1);

	for (let i = 0; i < vector.length; i++) {
		if (vector[i] && i % 2 === 0) {
			return false;
		}
	}

	return true;
}

let checked = 0;
let passed = 0;

console.time('theorem5'); // theorem5: 13434.586ms

for (let symmetricVector of Polynomial.SymmetricVectors(SIZE)) {
	const check = checkVector(symmetricVector);
	const result = Polynomial.symmetric(SIZE, symmetricVector).multiply(multiplier);
	const isZero = result.isZero();
	checked++;

	if (check === isZero) {
		passed++
	} else {
		console.log(symmetricVector, {check, isZero});
	}
}

console.timeEnd('theorem5');

console.dir({checked, passed});
