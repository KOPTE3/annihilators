import Polynomial from '../core/polynomial';

type Vector = number[];

const size = 6;


let degCount = [0, 0, 0, 0];

console.log('multiply-polynomials');
console.dir({size});


const generator1 = Polynomial.DegVectors(size, 1, true);
const generator2 = Polynomial.DegVectors(size, 2, true);

const deg1: Polynomial[] = [];
let deg2: Polynomial[] = [];
let zeros = 0;
let all = 0;
let deg1length = 0;
let deg2length = 0;


console.time('multiply-polynomials-gen-1');
for (let vector of generator1) {
	const p = Polynomial.from(vector, size);
	deg1.push(p);
	deg1length++;
}
console.timeEnd('multiply-polynomials-gen-1');

console.time('multiply-polynomials-check');
for (let vector of generator2) {
	const p = Polynomial.from(vector, size);
	deg2.push(p);
	deg2length++;

	if (deg2.length === 10000) {
		for (let polynomial1 of deg1) {
			for (let polynomial2 of deg2) {
				const p = polynomial1.multiply(polynomial2);
				const deg = p.deg;
				degCount[deg]++;

				all++;
				if (p.isZero()) {
					zeros++;
				}
			}
		}

		console.log(all);


		// console.dir({
		// 	all,
		// 	zeros,
		// 	degCount,
		// 	deg1length,
		// 	deg2length,
		// });

		deg2 = [];
	}
}

for (let polynomial1 of deg1) {
	for (let polynomial2 of deg2) {
		const p = polynomial1.multiply(polynomial2);
		const deg = p.deg;
		degCount[deg]++;

		all++;
		if (p.isZero()) {
			zeros++;
		}
	}
}

console.dir({
	all,
	zeros,
	degCount,
	degParts: degCount.map(count => count / all),
	deg1length,
	deg2length,
});


console.timeEnd('multiply-polynomials-check');
