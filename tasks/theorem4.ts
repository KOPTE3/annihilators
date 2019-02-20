import Polynomial from '../core/polynomial';
import * as assert from 'assert';


const SIZE = 5;

const multiplierVector: number[] = (new Array(SIZE + 1)).fill(0);
multiplierVector[1] = 1;
const multiplier = Polynomial.symmetric(SIZE, multiplierVector);

function checkVector(vector: number[]): boolean {
	assert.strictEqual(vector.length, SIZE + 1);

	for (let i = 0; i < vector.length; i++) {
		if (vector[i]) {
			if (i % 2 === 0) {
				if (i + 1 < vector.length) {
					if (vector[i + 1] !== 1) {
						return false;
					}
				}
			} else {
				if (i - 1 >= 0) {
					if (vector[i - 1] !== 1) {
						return false;
					}
				}
			}
		}
	}

	return true;
}

let checked = 0;
let passed = 0;

console.time('theorem4'); // theorem4: 13174.727ms

for (let symmetricVector of Polynomial.SymmetricVectors(SIZE)) {
	const check = checkVector(symmetricVector);
	const result = Polynomial.symmetric(SIZE, symmetricVector).multiply(multiplier);
	const isZero = result.isZero();
	checked++;

	if (isZero && check && symmetricVector[0] === 1) {
		console.log(symmetricVector, {check, isZero});
	}

	if (check === isZero) {
		passed++
	} else {
		// console.log(symmetricVector, {check, isZero});
	}
}

console.timeEnd('theorem4');

console.dir({checked, passed});
