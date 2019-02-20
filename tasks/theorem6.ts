import Polynomial from '../core/polynomial';
import * as assert from 'assert';


const SIZE = 5;

const multiplierVector: number[] = (new Array(SIZE + 1)).fill(0);
multiplierVector[2] = 1;
const multiplier = Polynomial.symmetric(SIZE, multiplierVector);

function checkVector(vector: number[], p: Polynomial): boolean {
	assert.strictEqual(vector.length, SIZE + 1);
	assert.strictEqual(p.size, SIZE);

	for (let i = 0; i < vector.length; i++) {
		if (vector[i] && i % 2 !== 0) {
			return false;
		}
	}

	const minDeg = p.minDeg;
	return minDeg % 4 === 0;
}

let checked = 0;
let passed = 0;

console.time('theorem6'); // theorem6:

for (let symmetricVector of Polynomial.SymmetricVectors(SIZE)) {
	const p = Polynomial.symmetric(SIZE, symmetricVector);
	const check = checkVector(symmetricVector, p);
	const result = p.multiply(multiplier);
	const isZero = result.isZero();
	checked++;

	if (check === isZero) {
		passed++
	}
	if (isZero) {
		console.log(symmetricVector, {check, isZero});
	}
}

console.timeEnd('theorem6');

console.dir({checked, passed});

/**
 /Users/anatolijostapenko/.nvm/versions/node/v10.14.2/bin/node /Users/anatolijostapenko/bmstu/annihilators/index.js
 [ 1, 0, 0, 0, 0, 0, 0, 0, 0 ] { check: true, isZero: false }
 [ 0, 0, 1, 0, 0, 0, 0, 0, 0 ] { check: true, isZero: false }
 [ 0, 1, 0, 1, 0, 0, 0, 0, 0 ] { check: false, isZero: true }
 [ 1, 1, 1, 1, 0, 0, 0, 0, 0 ] { check: false, isZero: true }
 [ 0, 0, 0, 0, 1, 0, 0, 0, 0 ] { check: true, isZero: false }
 [ 1, 0, 0, 0, 1, 0, 0, 0, 0 ] { check: true, isZero: false }
 [ 0, 0, 1, 0, 1, 0, 0, 0, 0 ] { check: true, isZero: false }
 [ 1, 0, 1, 0, 1, 0, 0, 0, 0 ] { check: true, isZero: false }
 [ 0, 0, 0, 0, 0, 0, 1, 0, 0 ] { check: true, isZero: false }
 [ 1, 0, 0, 0, 0, 0, 1, 0, 0 ] { check: true, isZero: false }
 [ 0, 0, 1, 0, 0, 0, 1, 0, 0 ] { check: true, isZero: false }
 [ 1, 0, 1, 0, 0, 0, 1, 0, 0 ] { check: true, isZero: false }
 [ 1, 0, 0, 0, 1, 0, 1, 0, 0 ] { check: true, isZero: false }
 [ 0, 0, 1, 0, 1, 0, 1, 0, 0 ] { check: true, isZero: false }
 [ 0, 1, 0, 1, 1, 0, 1, 0, 0 ] { check: false, isZero: true }
 [ 1, 1, 1, 1, 1, 0, 1, 0, 0 ] { check: false, isZero: true }
 [ 0, 0, 0, 0, 0, 1, 0, 1, 0 ] { check: false, isZero: true }
 [ 1, 0, 1, 0, 0, 1, 0, 1, 0 ] { check: false, isZero: true }
 [ 0, 1, 0, 1, 0, 1, 0, 1, 0 ] { check: false, isZero: true }
 [ 1, 1, 1, 1, 0, 1, 0, 1, 0 ] { check: false, isZero: true }
 [ 0, 0, 0, 0, 1, 1, 1, 1, 0 ] { check: false, isZero: true }
 [ 1, 0, 1, 0, 1, 1, 1, 1, 0 ] { check: false, isZero: true }
 [ 0, 1, 0, 1, 1, 1, 1, 1, 0 ] { check: false, isZero: true }
 [ 1, 1, 1, 1, 1, 1, 1, 1, 0 ] { check: false, isZero: true }
 [ 1, 0, 0, 0, 0, 0, 0, 0, 1 ] { check: true, isZero: false }
 [ 0, 0, 1, 0, 0, 0, 0, 0, 1 ] { check: true, isZero: false }
 [ 0, 1, 0, 1, 0, 0, 0, 0, 1 ] { check: false, isZero: true }
 [ 1, 1, 1, 1, 0, 0, 0, 0, 1 ] { check: false, isZero: true }
 [ 0, 0, 0, 0, 1, 0, 0, 0, 1 ] { check: true, isZero: false }
 [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ] { check: true, isZero: false }
 [ 0, 0, 1, 0, 1, 0, 0, 0, 1 ] { check: true, isZero: false }
 [ 1, 0, 1, 0, 1, 0, 0, 0, 1 ] { check: true, isZero: false }
 [ 0, 0, 0, 0, 0, 0, 1, 0, 1 ] { check: true, isZero: false }
 [ 1, 0, 0, 0, 0, 0, 1, 0, 1 ] { check: true, isZero: false }
 [ 0, 0, 1, 0, 0, 0, 1, 0, 1 ] { check: true, isZero: false }
 [ 1, 0, 1, 0, 0, 0, 1, 0, 1 ] { check: true, isZero: false }
 [ 1, 0, 0, 0, 1, 0, 1, 0, 1 ] { check: true, isZero: false }
 [ 0, 0, 1, 0, 1, 0, 1, 0, 1 ] { check: true, isZero: false }
 [ 0, 1, 0, 1, 1, 0, 1, 0, 1 ] { check: false, isZero: true }
 [ 1, 1, 1, 1, 1, 0, 1, 0, 1 ] { check: false, isZero: true }
 [ 0, 0, 0, 0, 0, 1, 0, 1, 1 ] { check: false, isZero: true }
 [ 1, 0, 1, 0, 0, 1, 0, 1, 1 ] { check: false, isZero: true }
 [ 0, 1, 0, 1, 0, 1, 0, 1, 1 ] { check: false, isZero: true }
 [ 1, 1, 1, 1, 0, 1, 0, 1, 1 ] { check: false, isZero: true }
 [ 0, 0, 0, 0, 1, 1, 1, 1, 1 ] { check: false, isZero: true }
 [ 1, 0, 1, 0, 1, 1, 1, 1, 1 ] { check: false, isZero: true }
 [ 0, 1, 0, 1, 1, 1, 1, 1, 1 ] { check: false, isZero: true }
 [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ] { check: false, isZero: true }
 theorem6: 1435.592ms
 { checked: 512, passed: 464 }

 Process finished with exit code 0
 */
