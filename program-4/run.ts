import Polynomial from '../core/polynomial';

const SIZE = 7;

const multiplierVector: number[] = (new Array(SIZE + 1)).fill(0);
const lambda = [ 1, 1, 1, 1 ];
multiplierVector[0] = lambda[0];
multiplierVector[1] = lambda[1];
multiplierVector[2] = lambda[2];
multiplierVector[3] = lambda[3];

const multiplier = Polynomial.symmetric(SIZE, multiplierVector);

console.time('program-4');

console.log(`λ = [ ${lambda.join(' ')} ]`);
console.log(multiplier.toString());

let counter = 0;
let lineBreak = 0;

for (let symmetricVector of Polynomial.SymmetricVectors(SIZE, 0)) {
	const vector = Polynomial.symmetric(SIZE, symmetricVector);
	const result = vector.multiply(multiplier);

	if (result.isZero()) {
		console.log(`[ ${symmetricVector.join(' ')} ]`);
		counter++;
		lineBreak++;
		if (lineBreak === 8) {
			console.log();
			lineBreak = 0;
		}
	}
}

console.log(`Найдено ${counter} полиномов`);

console.timeEnd('program-4');
