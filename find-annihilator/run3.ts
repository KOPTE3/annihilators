import Polynomial from '../core/polynomial';
import Monomial from '../core/monomial';
import * as BigInt from 'big-integer';

const lambdaVector = [ 0, 1, 0, 0, 1, 0, 0, 0, 0 ];
const size = lambdaVector.length - 1;

const checkPolynomial1 = Polynomial.symmetric(size, lambdaVector);
const checkPolynomial2 = checkPolynomial1.add((new Polynomial(size)).append(Monomial.from(0, size)));

console.log('N =', size);
console.log('f(x) =', checkPolynomial1.toString());
console.log('f(x) + 1 =', checkPolynomial2.toString());

console.log('f(x) =', checkPolynomial1.toBoolean());
console.log('f(x) + 1 =', checkPolynomial2.toBoolean());

function func(x1, x2, x3, x4, x5, x6, x7, x8): Bit {
	const r = (x1)+(x2)+(x3)+(x4)+(x1*x2*x3*x4)+(x5)+(x1*x2*x3*x5)+(x1*x2*x4*x5)+(x1*x3*x4*x5)+(x2*x3*x4*x5)+(x6)+(x1*x2*x3*x6)+(x1*x2*x4*x6)+(x1*x3*x4*x6)+(x2*x3*x4*x6)+(x1*x2*x5*x6)+(x1*x3*x5*x6)+(x2*x3*x5*x6)+(x1*x4*x5*x6)+(x2*x4*x5*x6)+(x3*x4*x5*x6)+(x7)+(x1*x2*x3*x7)+(x1*x2*x4*x7)+(x1*x3*x4*x7)+(x2*x3*x4*x7)+(x1*x2*x5*x7)+(x1*x3*x5*x7)+(x2*x3*x5*x7)+(x1*x4*x5*x7)+(x2*x4*x5*x7)+(x3*x4*x5*x7)+(x1*x2*x6*x7)+(x1*x3*x6*x7)+(x2*x3*x6*x7)+(x1*x4*x6*x7)+(x2*x4*x6*x7)+(x3*x4*x6*x7)+(x1*x5*x6*x7)+(x2*x5*x6*x7)+(x3*x5*x6*x7)+(x4*x5*x6*x7)+(x8)+(x1*x2*x3*x8)+(x1*x2*x4*x8)+(x1*x3*x4*x8)+(x2*x3*x4*x8)+(x1*x2*x5*x8)+(x1*x3*x5*x8)+(x2*x3*x5*x8)+(x1*x4*x5*x8)+(x2*x4*x5*x8)+(x3*x4*x5*x8)+(x1*x2*x6*x8)+(x1*x3*x6*x8)+(x2*x3*x6*x8)+(x1*x4*x6*x8)+(x2*x4*x6*x8)+(x3*x4*x6*x8)+(x1*x5*x6*x8)+(x2*x5*x6*x8)+(x3*x5*x6*x8)+(x4*x5*x6*x8)+(x1*x2*x7*x8)+(x1*x3*x7*x8)+(x2*x3*x7*x8)+(x1*x4*x7*x8)+(x2*x4*x7*x8)+(x3*x4*x7*x8)+(x1*x5*x7*x8)+(x2*x5*x7*x8)+(x3*x5*x7*x8)+(x4*x5*x7*x8)+(x1*x6*x7*x8)+(x2*x6*x7*x8)+(x3*x6*x7*x8)+(x4*x6*x7*x8)+(x5*x6*x7*x8)
	return (r % 2) as Bit;
}

type Bit = 0 | 1;

interface Entry {
	x1: Bit;
	x2: Bit;
	x3: Bit;
	x4: Bit;
	x5: Bit;
	x6: Bit;
	x7: Bit;
	x8: Bit;
	f: Bit;
}

const booleanVector: Entry[] = [];

for (let X = 0; X < Math.pow(2, size); X++) {
	const x1: Bit = (X & 0b00000001) ? 1 : 0;
	const x2: Bit = (X & 0b00000010) ? 1 : 0;
	const x3: Bit = (X & 0b00000100) ? 1 : 0;
	const x4: Bit = (X & 0b00001000) ? 1 : 0;
	const x5: Bit = (X & 0b00010000) ? 1 : 0;
	const x6: Bit = (X & 0b00100000) ? 1 : 0;
	const x7: Bit = (X & 0b01000000) ? 1 : 0;
	const x8: Bit = (X & 0b10000000) ? 1 : 0;
	const f = func(x1, x2, x3, x4, x5, x6, x7, x8);

	booleanVector.push({x1, x2, x3, x4, x5, x6, x7, x8, f});
}

console.table(booleanVector);
const weight = booleanVector.reduce((w, {f}) => w + f, 0);
console.dir({weight, zeros: 2 ** 8 - weight});

const count = BigInt(2).pow(2 ** 8 - weight);
console.log(count);


1844674407370 min
